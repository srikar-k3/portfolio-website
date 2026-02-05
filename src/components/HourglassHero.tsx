'use client';

import { useEffect, useRef } from 'react';

// ---- type-only imports kept only for what we actually use ----
import type {
  Color,
  DirectionalLight,
  Euler,
  Group,
  HemisphereLight,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  Sphere,
  WebGLRenderer,
} from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default function HourglassHero(
  { onLoaded, onProgress, hideOverlays }: { onLoaded?: () => void; onProgress?: (pct: number) => void; hideOverlays?: boolean } = {}
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Make the canvas host invisible until we confirm a frame with the model
  const hostRef = useRef<HTMLDivElement | null>(null);
  // Root of the hero composition (hourglass + labels + categories + chevron)
  const heroRootRef = useRef<HTMLElement | null>(null);
  // Categories row container (bracketed text)
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  // Labels overlay (SRKR / PORTFOLIO)
  const overlayRef = useRef<HTMLDivElement | null>(null);
  // Chevron button
  const chevronRef = useRef<HTMLButtonElement | null>(null);
  // Stable callback refs so we can keep effect deps []
  const onLoadedRef = useRef(onLoaded);
  const onProgressRef = useRef(onProgress);
  onLoadedRef.current = onLoaded;
  onProgressRef.current = onProgress;
  // One-time init guard
  const didInitRef = useRef(false);

  useEffect(() => {

    let cleanup: (() => void) | null = null;
    let rafId: number | null = null;

    async function init() {
      if (didInitRef.current) return; // guard against accidental re-entry
      didInitRef.current = true;
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      const { TrackballControls } = await import('three/examples/jsm/controls/TrackballControls.js');

      const containerEl = containerRef.current;
      if (!containerEl) return;

      // -------------------- Tunables --------------------
      // HUD overlay removed in redesign

      const GLASS_SURFACE_COLOR = 0xa5b4fc;
      const GLASS_ATTEN_COLOR = 0xaec2ff;
      const GLASS_THICKNESS = 0.9;
      const GLASS_ATTEN_DIST = 1.6;
      const GLASS_ENV_INTENSITY = 1.0;
      const GLASS_ROUGHNESS = 0.08;

      const CAVITY_ATTEN_COLOR = 0xeef3ff;
      const CAVITY_ATTEN_DIST = 5.0;

      // -------------------- Renderer --------------------
      const renderer: WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        stencil: true,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      containerEl.appendChild(renderer.domElement);
      // Allow vertical scrolling gestures to pass through on touch devices
      try {
        (renderer.domElement as HTMLCanvasElement).style.touchAction = 'pan-y pinch-zoom';
        (renderer.domElement as HTMLCanvasElement).style.webkitUserSelect = 'none';
        (renderer.domElement as HTMLCanvasElement).style.userSelect = 'none';
      } catch {}
      // Context loss/resume guards
      let shuttingDown = false;
      let contextLost = false;
      const onContextLost = (e: Event) => {
        e.preventDefault();
        contextLost = true;
      };
      const onContextRestored = () => { contextLost = false; };
      renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
      renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

      // -------------------- Scene / Camera --------------------
      const scene: Scene = new THREE.Scene();
      scene.background = null;

      const camera: PerspectiveCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);

      // -------------------- Lights --------------------
      const hemi: HemisphereLight = new THREE.HemisphereLight(0xBFD4FF, 0x1b1f2f, 0.5);
      scene.add(hemi);

      const key: DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(2.5, 2.0, 2.5);
      scene.add(key);

      const fill: DirectionalLight = new THREE.DirectionalLight(0xe7ecff, 0.4);
      fill.position.set(-2, 1.2, -1.5);
      scene.add(fill);

      // -------------------- Resize / Fit --------------------
      let fitRadius = 0;

      function fitCameraForRadius(radius: number) {
        if (!radius) return;
        const vFOV = (camera.fov * Math.PI) / 180;
        const hFOV = 2 * Math.atan(Math.tan(vFOV / 2) * camera.aspect);
        const distV = radius / Math.sin(vFOV / 2);
        const distH = radius / Math.sin(hFOV / 2);
        const dist = Math.max(distV, distH) * 1.05;
        camera.position.set(0, 0, dist);
        camera.lookAt(0, 0, 0);
      }

      let resizeRaf: number | null = null;
      let ro: ResizeObserver | null = null;
      const resize = () => {
        const el = containerRef.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = Math.max(1e-6, w / Math.max(1, h));
        camera.updateProjectionMatrix();
        if (fitRadius) fitCameraForRadius(fitRadius);
      };

      // -------------------- Controls --------------------
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;
      // Tame drag responsiveness per feedback
      controls.rotateSpeed = 1.4;
      controls.dynamicDampingFactor = 0.12;

      // Mobile touch guard: only allow interaction within a central box; otherwise let page scroll.
      const canvas = renderer.domElement as HTMLCanvasElement;
      try {
        canvas.style.touchAction = 'pan-y pinch-zoom';
        canvas.style.WebkitUserSelect = 'none';
        canvas.style.userSelect = 'none';
      } catch {}
      const touchGuard = (ev: TouchEvent) => {
        if (ev.touches && ev.touches.length === 1) {
          const t = ev.touches[0];
          const rect = canvas.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rx = rect.width * 0.18; // central 36% width
          const ry = rect.height * 0.12; // central 24% height (narrower vertically)
          const inside = Math.abs(t.clientX - cx) <= rx && Math.abs(t.clientY - cy) <= ry;
          if (!inside) {
            // prevent TrackballControls from receiving this touch so that scroll can proceed
            ev.stopPropagation();
          }
        }
      };
      canvas.addEventListener('touchstart', touchGuard, { capture: true, passive: true });
      canvas.addEventListener('touchmove', touchGuard, { capture: true, passive: true });
      canvas.addEventListener('touchend', touchGuard, { capture: true, passive: true });

      // -------------------- Graph --------------------
      const hourglassGroup: Group = new THREE.Group();
      scene.add(hourglassGroup);

      const axisNode: Group = new THREE.Group();
      hourglassGroup.add(axisNode);

      const tiltNode: Group = new THREE.Group();
      axisNode.add(tiltNode);

      // HUD/text overlay removed; no scheduleLayoutHUD

      // -------------------- Load GLTF --------------------
      const loader = new GLTFLoader();
      const fallbackStart = performance.now();
      let lastFallbackPct = 0;
      let usingFallback = false;
      let fallbackRaf: number | null = null;
      let modelAdded = false; // becomes true once GLTF root added to scene
      let firstPaintedWithModel = false; // set after we render at least one frame including the model

      function startFallbackProgress() {
        if (!onProgressRef.current) return;
        usingFallback = true;
        const start = fallbackStart;
        const duration = 2500; // ms to reach ~85%
        const tick = () => {
          const t = Math.min(1, (performance.now() - start) / duration);
          // Ease-out curve toward 85%
          const eased = 1 - Math.pow(1 - t, 3);
          const pct = Math.min(85, Math.max(1, Math.round(eased * 85)));
          if (pct !== lastFallbackPct) {
            lastFallbackPct = pct;
            const cb = onProgressRef.current; if (cb) { try { cb(pct); } catch {} }
          }
          if (t < 1 && usingFallback) fallbackRaf = requestAnimationFrame(tick);
        };
        tick();
      }

      loader.load(
        '/hourglass_V4.5.glb',
        (gltf: GLTF) => {
        const root = gltf.scene as Group;
        root.scale.set(1.25, 1.25, 1.25);

        root.traverse((o: Object3D) => {
          if ((o as Mesh).isMesh) {
            const mesh = o as Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;
          }
        });

        // Environment
        const pmrem: PMREMGenerator = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        // Cavity
        const cavity =
          (root.getObjectByName('Cavity_Collider') as Object3D | null) ||
          (root.getObjectByName('Cavity') as Object3D | null);

        if (cavity) {
          const cavMat: MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.12,
            transmission: 1.0,
            ior: 1.15,
            thickness: 0.18,
            attenuationColor: new THREE.Color(CAVITY_ATTEN_COLOR) as Color,
            attenuationDistance: CAVITY_ATTEN_DIST,
            transparent: true,
            opacity: 1.0,
            side: THREE.BackSide,
            depthWrite: false,
            envMapIntensity: 1.0,
          });

          cavity.traverse((n: Object3D) => {
            if ((n as Mesh).isMesh) (n as Mesh).material = cavMat;
          });
          if ((cavity as Mesh).isMesh) (cavity as Mesh).material = cavMat;
          (cavity as Mesh).renderOrder = 3.2;
        }

        // Glass
        const glass =
          (root.getObjectByName('Glass') as Object3D | null) ||
          (root.getObjectByName('Hourglass_Glass') as Object3D | null) ||
          (root.getObjectByName('glass') as Object3D | null);

        if (glass) {
          const glassMat: MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial({
            color: GLASS_SURFACE_COLOR,
            metalness: 0.0,
            roughness: GLASS_ROUGHNESS,
            transparent: true,
            opacity: 1.0,
            transmission: 1.0,
            ior: 1.5,
            thickness: GLASS_THICKNESS,
            attenuationColor: new THREE.Color(GLASS_ATTEN_COLOR) as Color,
            attenuationDistance: GLASS_ATTEN_DIST,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            envMapIntensity: GLASS_ENV_INTENSITY,
            depthWrite: false,
          });

          glass.traverse((n: Object3D) => {
            if ((n as Mesh).isMesh) (n as Mesh).material = glassMat;
          });
          if ((glass as Mesh).isMesh) (glass as Mesh).material = glassMat;
          (glass as Mesh).renderOrder = 4.0;
        }

        tiltNode.add(root);
        modelAdded = true;

        // Text HUD removed — no stencil/planes created

        // Attach container ResizeObserver
        resize();
        ro = new ResizeObserver(() => {
          if (resizeRaf) cancelAnimationFrame(resizeRaf);
          resizeRaf = requestAnimationFrame(resize);
        });
        ro.observe(containerEl);

        // Fit camera to model
        const sphere: Sphere = new THREE.Sphere();
        new THREE.Box3().setFromObject(root).getBoundingSphere(sphere);
        fitRadius = sphere.radius || 0;
        fitCameraForRadius(fitRadius);

        // -------------------- On-load pose --------------------
        const smoother = (u: number) => u * u * u * (u * (6 * u - 15) + 10);
        const startQ: Quaternion = axisNode.quaternion.clone();
        // Opposite adjustment: a hair more X pitch, a hair less roll
        const targetEuler: Euler = new THREE.Euler(
          THREE.MathUtils.degToRad(-22),
          0,
          THREE.MathUtils.degToRad(12),
          'YXZ'
        );
        const targetQ: Quaternion = new THREE.Quaternion().setFromEuler(targetEuler);

        let startMs = 0;
        function animatePose(now: number) {
          // Intentionally delay pose animation start by ~2s after model load
          if (startMs === 0) startMs = now + 2000;
          const t = Math.max(0, Math.min(1, (now - startMs) / 1200));
          const u = smoother(t);
          const q = startQ.clone().slerp(targetQ, u);
          axisNode.quaternion.copy(q);
          if (t < 1) requestAnimationFrame(animatePose);
        }
        requestAnimationFrame(animatePose);
        // Stop fallback progression and jump to 100
        usingFallback = false;
        if (fallbackRaf) cancelAnimationFrame(fallbackRaf);
        const cbP = onProgressRef.current; if (cbP) { try { cbP(100); } catch { /* noop */ } }
        // Notify parent that the hourglass finished initial load
        const cbL = onLoadedRef.current; if (cbL) { try { cbL(); } catch { /* noop */ } }
      },
      (evt) => {
        if (!onProgressRef.current) return;
        const total = evt.total || 0;
        const loaded = evt.loaded || 0;
        if (total > 0) {
          // Real network progress
          const pct = Math.min(100, Math.max(1, Math.round((loaded / total) * 100)));
          usingFallback = false;
          const cbP = onProgressRef.current; if (cbP) { try { cbP(pct); } catch { /* noop */ } }
        } else {
          // Some servers don't send total; use a smooth fallback
          if (!usingFallback) startFallbackProgress();
        }
      });

      // -------------------- Loop --------------------
      function tick() {
        if (shuttingDown || contextLost) { rafId = requestAnimationFrame(tick); return; }
        controls.update();
        try { renderer.render(scene, camera); } catch {}

        // After we have the model in scene and we painted at least one frame,
        // reveal the host and fire onLoaded exactly once.
        if (modelAdded && !firstPaintedWithModel) {
          firstPaintedWithModel = true;
          const host = hostRef.current;
          if (host) host.style.opacity = '1';
          const cbP = onProgressRef.current; if (cbP) { try { cbP(100); } catch { /* noop */ } }
          const cbL = onLoadedRef.current; if (cbL) { try { cbL(); } catch { /* noop */ } }
        }
        rafId = requestAnimationFrame(tick);
      }
      tick();

      cleanup = () => {
        shuttingDown = true;
        if (rafId) cancelAnimationFrame(rafId);
        if (ro) ro.disconnect();
        renderer.domElement.removeEventListener('webglcontextlost', onContextLost, false);
        renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored, false);
        renderer.dispose();
        try {
          const c = renderer.domElement as HTMLCanvasElement;
          c.removeEventListener('touchstart', touchGuard as EventListener, true);
          c.removeEventListener('touchmove', touchGuard as EventListener, true);
          c.removeEventListener('touchend', touchGuard as EventListener, true);
        } catch {}
        if (renderer.domElement?.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
      };
    }

    init();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Parallax scroll effect - fade and scale hero elements as user scrolls
  useEffect(() => {
    const heroEl = heroRootRef.current;
    const hostEl = hostRef.current;
    if (!heroEl || !hostEl) return;

    // Compute base scale for shorter viewports
    let baseScale = 1;
    const updateBaseScale = () => {
      const vh = window.innerHeight;
      if (vh < 560) baseScale = 0.78;
      else if (vh < 960) baseScale = 0.8 + 0.2 * ((vh - 560) / 400);
      else baseScale = 1;
    };
    updateBaseScale();

    const onScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero');
      const heroTop = heroSection?.offsetTop || 0;

      // Progress: 0 at top, 1 after scrolling one viewport
      const p = Math.max(0, Math.min(1, (scrollY - heroTop) / vh));

      // Calculated values
      const scale = baseScale * (1 - 0.15 * p);
      const opacity = 1 - p;
      const blur = p * 6;
      const drift = p * 20;

      // Apply to 3D canvas host
      hostEl.style.transform = `scale(${scale.toFixed(3)})`;
      hostEl.style.opacity = opacity.toFixed(3);
      hostEl.style.filter = `blur(${blur.toFixed(1)}px)`;

      // Apply to labels overlay
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transform = `translateY(${drift.toFixed(1)}px) scale(${(1 - 0.15 * p).toFixed(3)})`;
        overlay.style.opacity = opacity.toFixed(3);
        overlay.style.filter = `blur(${blur.toFixed(1)}px)`;
      }

      // Apply to categories
      const cats = categoriesRef.current;
      if (cats) {
        cats.style.transform = `scale(${(1 - 0.15 * p).toFixed(3)})`;
        cats.style.opacity = opacity.toFixed(3);
        cats.style.filter = `blur(${blur.toFixed(1)}px)`;
      }

      // Apply to chevron
      const chev = chevronRef.current;
      if (chev) {
        chev.style.transform = `translateY(${drift.toFixed(1)}px) scale(${(1 - 0.15 * p).toFixed(3)})`;
        chev.style.opacity = opacity.toFixed(3);
        chev.style.filter = `blur(${blur.toFixed(1)}px)`;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { updateBaseScale(); onScroll(); });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={heroRootRef}
      className="relative z-0 h-full w-full overflow-hidden bg-transparent"
      aria-label="Hourglass hero"
    >
      {/* Left/Right labels - these are the targets for the loading animation */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center pointer-events-none select-none"
        style={{ opacity: hideOverlays ? 0 : 1, transition: 'opacity .4s ease' }}
      >
        <span
          id="hero-label-left"
          className="absolute left-[8%] sm:left-[10%] md:left-[12%] top-1/2 -translate-y-1/2 text-gray-900 tracking-[0.18em] uppercase text-xs sm:text-sm font-normal"
        >
          SRKR
        </span>
        <span
          id="hero-label-right"
          className="absolute right-[8%] sm:right-[10%] md:right-[12%] top-1/2 -translate-y-1/2 text-gray-900 tracking-[0.18em] uppercase text-xs sm:text-sm font-normal"
        >
          PORTFOLIO
        </span>
      </div>

      {/* 3D Canvas container */}
      <div
        ref={hostRef}
        className="relative w-full h-full will-change-transform transform-gpu"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      >
        <div ref={containerRef} className="absolute inset-0" />
      </div>

      {/* Category tags */}
      <div
        ref={categoriesRef}
        className="absolute left-1/2 -translate-x-1/2 z-10 text-gray-900 bottom-24 sm:bottom-20 md:bottom-16"
      >
        {/* Mobile: stacked layout */}
        <div className="sm:hidden flex flex-col items-center gap-1.5">
          <ul className="flex items-center justify-center gap-2 tracking-[0.06em] uppercase text-[2.4vw] font-normal">
            <li>[ mobile design ]</li>
            <li>[ web design ]</li>
            <li>[ creative design ]</li>
          </ul>
          <ul className="flex items-center justify-center gap-2 tracking-[0.06em] uppercase text-[2.4vw] font-normal">
            <li>[ branding ]</li>
            <li>[ motion graphics ]</li>
          </ul>
        </div>
        {/* Tablet/Desktop: single line */}
        <ul className="hidden sm:flex items-center justify-center gap-4 md:gap-6 tracking-[0.1em] uppercase text-[11px] md:text-xs font-normal">
          <li>[ mobile design ]</li>
          <li>[ web design ]</li>
          <li>[ creative design ]</li>
          <li>[ branding ]</li>
          <li>[ motion graphics ]</li>
        </ul>
      </div>

      {/* Scroll indicator */}
      <button
        ref={chevronRef}
        type="button"
        aria-label="Scroll to About"
        className="absolute bottom-6 sm:bottom-5 md:bottom-4 left-1/2 -translate-x-1/2 z-10 text-gray-900/80 hover:text-indigo-600 focus:text-indigo-600 transition-colors duration-200"
        onClick={() => {
          const aboutEl = document.getElementById('about');
          if (aboutEl) {
            const y = aboutEl.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      >
        <span className="inline-block animate-bounce" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </span>
      </button>
    </section>
  );
}
