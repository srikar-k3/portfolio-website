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
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  CanvasTexture,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  Sphere,
  WebGLRenderer,
} from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type HUDUserData = {
  _hudPlanes?: Mesh[];
  _placeHUD?: () => void;
};

type StencilMaterial = MeshBasicMaterial & {
  stencilWrite: boolean;
  stencilRef: number;
  stencilFunc: number;
  stencilZPass: number;
  stencilZFail: number;
  stencilFail: number;
};

export default function HourglassHero(
  { onLoaded, onProgress }: { onLoaded?: () => void; onProgress?: (pct: number) => void } = {}
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Make the canvas host invisible until we confirm a frame with the model
  const hostRef = useRef<HTMLDivElement | null>(null);
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
      const HUD_DISTANCE = 2.4;

      const PLANE_W = 3.6;
      const PLANE_H = 1.6;

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
      let layoutRaf: number | null = null;
      let ro: ResizeObserver | null = null;
      let srkrRO: ResizeObserver | null = null;
      const resize = () => {
        const el = containerRef.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = Math.max(1e-6, w / Math.max(1, h));
        camera.updateProjectionMatrix();
        if (fitRadius) fitCameraForRadius(fitRadius);
        // Recompute HUD plane sizing vs SRKR height (only when HUD ready)
        // Defer one extra frame to ensure SRKR's vw/vh-based size has settled
        if (readyHUD) {
          if (layoutRaf) cancelAnimationFrame(layoutRaf);
          // Double-RAF to let CSS vw/vh and font metrics settle after a big->small change
          layoutRaf = requestAnimationFrame(() => {
            requestAnimationFrame(() => scheduleLayoutHUD());
          });
        }
      };

      // -------------------- Controls --------------------
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;
      // Tame drag responsiveness per feedback
      controls.rotateSpeed = 1.4;
      controls.dynamicDampingFactor = 0.12;

      // -------------------- Graph --------------------
      const hourglassGroup: Group = new THREE.Group();
      scene.add(hourglassGroup);

      const axisNode: Group = new THREE.Group();
      hourglassGroup.add(axisNode);

      const tiltNode: Group = new THREE.Group();
      axisNode.add(tiltNode);

      // HUD planes (created later)
      let occPlane: Mesh | null = null;
      let maskedText: Mesh | null = null;
      let sumTex: CanvasTexture | null = null;
      let sumCanvas: HTMLCanvasElement | null = null;
      let sumCtx: CanvasRenderingContext2D | null = null;
      const PLANE_ASPECT = 3.6 / 1.6; // keep your design aspect
      let readyHUD = false;

      const scheduleLayoutHUD = () => {
        // Only proceed when everything required exists
        if (!readyHUD) return;
        const host = containerRef.current;
        if (!host || !occPlane || !maskedText) return;
        // Defensive: ensure there are not multiple HUD meshes lingering
        const toRemove: Object3D[] = [];
        scene.traverse((obj: Object3D) => {
          if ((obj as Mesh).isMesh && obj !== occPlane && obj !== maskedText && obj.userData?.hud) {
            toRemove.push(obj);
          }
        });
        for (const obj of toRemove) {
          if (obj.parent) obj.parent.remove(obj);
        }
        const srkrEl = document.getElementById('srkrRef') as HTMLElement | null;
        const srkrH = srkrEl?.getBoundingClientRect().height || host.clientHeight * 0.18;
        const viewH = Math.max(1, host.clientHeight);
        const d = HUD_DISTANCE;
        const vFOV = (camera.fov * Math.PI) / 180;
        const worldH = 2 * d * Math.tan(vFOV / 2) * (srkrH / viewH);
        const worldW = worldH * PLANE_ASPECT;
        // Resize planes relative to their base geometry size
        occPlane.scale.set(worldW / PLANE_W, worldH / PLANE_H, 1);
        maskedText.scale.copy(occPlane.scale);

        // Regenerate canvas at DPR to match pixel height
        const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
        const canvasH = Math.min(2048, Math.max(256, Math.round(srkrH * dpr)));
        const canvasW = Math.min(4096, Math.max(512, Math.round(canvasH * PLANE_ASPECT)));
        if (!sumCanvas) {
          sumCanvas = document.createElement('canvas');
          sumCtx = sumCanvas.getContext('2d');
        }
        if (!sumCanvas || !sumCtx) return;
        sumCanvas.width = canvasW;
        sumCanvas.height = canvasH;
        sumCtx.clearRect(0, 0, canvasW, canvasH);
        sumCtx.fillStyle = '#000000';
        sumCtx.textAlign = 'center';
        sumCtx.textBaseline = 'middle';
        // Slightly smaller letterforms inside the fixed block height
        const fontPx = Math.floor(canvasH * 0.28);
        sumCtx.font = `900 ${fontPx}px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`;
        // Increased separation + adjust for smaller glyphs: raise SUMMIT, lower VISIONS
        sumCtx.fillText('SUMMIT', canvasW / 2, canvasH * 0.36);
        sumCtx.fillText('VISIONS', canvasW / 2, canvasH * 0.62);
        if (!sumTex) {
          sumTex = new THREE.CanvasTexture(sumCanvas);
          sumTex.colorSpace = THREE.SRGBColorSpace;
        } else {
          sumTex.needsUpdate = true;
        }
        const mat = maskedText.material as MeshBasicMaterial | null;
        if (mat && sumTex) {
          mat.map = sumTex;
          mat.needsUpdate = true;
        }
      };

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

        // --------- Stencil mask & HUD planes ----------
        let maskGeo: Mesh['geometry'] | null = null;
        if (glass) {
          if ((glass as Mesh).isMesh) {
            maskGeo = (glass as Mesh).geometry ?? null;
          } else {
            const firstChildMesh = glass.children.find((c) => (c as Mesh).isMesh) as Mesh | undefined;
            if (firstChildMesh) maskGeo = firstChildMesh.geometry;
          }
        }

        if (maskGeo) {
          // (1) Write stencil where the glass silhouette is
          const maskMat = new THREE.MeshBasicMaterial({
            colorWrite: false,
            depthWrite: false,
          }) as StencilMaterial;
          maskMat.stencilWrite = true;
          maskMat.stencilRef = 1;
          maskMat.stencilFunc = THREE.AlwaysStencilFunc;
          maskMat.stencilZPass = THREE.ReplaceStencilOp;
          maskMat.stencilZFail = THREE.KeepStencilOp;
          maskMat.stencilFail = THREE.KeepStencilOp;

          const maskMesh: Mesh = new THREE.Mesh(maskGeo.clone(), maskMat);
          maskMesh.renderOrder = 1;
          maskMesh.frustumCulled = false;
          tiltNode.add(maskMesh);

          // (2) Fixed-screen occluder plane
          const occMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            depthTest: false,
          }) as StencilMaterial;
          occMat.stencilWrite = true;
          occMat.stencilRef = 1;
          occMat.stencilFunc = THREE.EqualStencilFunc;
          occMat.stencilZPass = THREE.KeepStencilOp;
          occMat.stencilZFail = THREE.KeepStencilOp;
          occMat.stencilFail = THREE.KeepStencilOp;

          const occ = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), occMat) as Mesh;
          occ.renderOrder = 2;
          occ.frustumCulled = false;
          scene.add(occ);
          occPlane = occ;
          occPlane.name = 'HUD_OCC';

          // (3) Text plane
          // Create initial texture; actual sizing happens in scheduleLayoutHUD()
          sumCanvas = document.createElement('canvas');
          sumCanvas.width = 1024; sumCanvas.height = 512;
          sumCtx = sumCanvas.getContext('2d');
          if (sumCtx) {
            sumCtx.clearRect(0,0,1024,512);
          }
          sumTex = new THREE.CanvasTexture(sumCanvas);
          sumTex.colorSpace = THREE.SRGBColorSpace;

          const sumMat = new THREE.MeshBasicMaterial({
            map: sumTex,
            transparent: true,
            depthTest: false,
          }) as StencilMaterial;
          sumMat.stencilWrite = true;
          sumMat.stencilRef = 1;
          sumMat.stencilFunc = THREE.EqualStencilFunc;
          sumMat.stencilZPass = THREE.KeepStencilOp;
          sumMat.stencilZFail = THREE.KeepStencilOp;
          sumMat.stencilFail = THREE.KeepStencilOp;

          const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), sumMat) as Mesh;
          textPlane.renderOrder = 3;
          textPlane.frustumCulled = false;
          scene.add(textPlane);
          maskedText = textPlane;
          maskedText.name = 'HUD_TEXT';

          // Observe SRKR element size so HUD updates when its vw-based font changes
          const srkrEl = document.getElementById('srkrRef');
          if (srkrEl) {
            srkrRO = new ResizeObserver(() => {
              // run on next frame to batch changes
              requestAnimationFrame(() => scheduleLayoutHUD());
            });
            srkrRO.observe(srkrEl);
          }

          // Mark HUD ready and do initial layout now that planes and material exist
          readyHUD = true;
          scheduleLayoutHUD();

          // Now that HUD is ready, attach ResizeObserver
          resize();
          ro = new ResizeObserver(() => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(resize);
          });
          ro.observe(containerEl);

          // Mark HUD planes & helpers
          const hudPlanes = [occPlane, maskedText].filter(Boolean) as Mesh[];
          for (const m of hudPlanes) {
            m.userData = { ...m.userData, hud: true };
          }
          const sceneUserData = scene.userData as HUDUserData;
          sceneUserData._hudPlanes = hudPlanes;

          sceneUserData._placeHUD = () => {
            const list = (scene.userData as HUDUserData)._hudPlanes ?? [];
            for (const m of list) {
              m.quaternion.copy(camera.quaternion);
              m.position
                .copy(camera.position)
                .add(new THREE.Vector3(0, 0, -HUD_DISTANCE).applyQuaternion(camera.quaternion));
            }
          };

          // After planes exist, compute their size to match SRKR height
          scheduleLayoutHUD();
        }

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
        const placeHUD = (scene.userData as HUDUserData)._placeHUD;
        if (placeHUD) placeHUD();
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
        if (srkrRO) srkrRO.disconnect();
        renderer.domElement.removeEventListener('webglcontextlost', onContextLost, false);
        renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored, false);
        renderer.dispose();
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

  return (
    <section
      className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hourglass hero"
    >
      {/* BIG SRKR. base layer */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <span
          id="srkrRef"
          className="text-[20vw] md:text-[16vw] font-extrabold tracking-tight text-black"
          style={{
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'Figtree, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 900,
          }}
        >
          SRKR
        </span>
      </div>

      {/* Canvas host (hidden until first painted frame with model) */}
      <div
        ref={(el) => { containerRef.current = el; hostRef.current = el; }}
        className="relative w-full h-[75vh] md:h-[85vh] lg:h-[92vh] max-w-none transition-opacity duration-200"
        style={{ opacity: 0 }}
      />

      {/* Bouncing arrow to next section (Projects) */}
      <a
        href="#about"
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[2000] text-black hover:text-indigo-600 focus:text-indigo-600 transition-colors"
        aria-label="Scroll to About section"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('about');
          if (!el) { window.location.hash = '#about'; return; }
          const wrapperEl = document.querySelector('div.fixed.top-0');
          const navH = wrapperEl
            ? (wrapperEl as HTMLElement).getBoundingClientRect().height
            : (document.querySelector('nav') as HTMLElement | null)?.getBoundingClientRect().height || 0;
          const paddingTop = parseFloat(window.getComputedStyle(el).paddingTop || '0') || 0;
          const y = el.getBoundingClientRect().top + window.scrollY + Math.min(40, paddingTop * 0.25) - navH;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }}
      >
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </div>
      </a>
    </section>
  );
}
