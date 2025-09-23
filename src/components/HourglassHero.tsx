'use client';

import { useEffect, useRef } from 'react';

// ✅ Type-only imports so TS knows the shapes, while we still lazy-load THREE at runtime
import type {
  Mesh,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  MeshBasicMaterial,
  PlaneGeometry,
  CanvasTexture,
  PMREMGenerator,
  Sphere,
  Box3,
  Euler,
  Quaternion,
  Vector3,
} from 'three';

export default function HourglassHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let rafId: number | null = null;

    async function init() {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      const { TrackballControls } = await import('three/examples/jsm/controls/TrackballControls.js');

      const containerEl = containerRef.current;
      if (!containerEl) return;

      // =========================
      // STATIC TUNING KNOBS
      // =========================
      const HUD_DISTANCE = 2.4;

      const PLANE_W = 3.6;
      const PLANE_H = 1.6;
      const FONT_SCALE = 0.08;

      const GLASS_SURFACE_COLOR = 0xa5b4fc;
      const GLASS_ATTEN_COLOR = 0xaec2ff;
      const GLASS_THICKNESS = 0.9;
      const GLASS_ATTEN_DIST = 1.6;
      const GLASS_ENV_INTENSITY = 1.0;
      const GLASS_ROUGHNESS = 0.08;

      const CAVITY_ATTEN_COLOR = 0xeef3ff;
      const CAVITY_ATTEN_DIST = 5.0;

      // --- Renderer (stencil REQUIRED) ---
      const renderer: WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        stencil: true,
      });
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
      (renderer as any).physicallyCorrectLights = true;
      (renderer as any).toneMapping = (THREE as any).ACESFilmicToneMapping;
      (renderer as any).toneMappingExposure = 1.0;

      // ✅ containerEl is definitely non-null here
      containerEl.appendChild(renderer.domElement);

      // Scene / Camera
      const scene: Scene = new THREE.Scene();
      scene.background = null;

      const camera: PerspectiveCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);

      // Lights
      const hemi = new THREE.HemisphereLight(0xBFD4FF, 0x1b1f2f, 0.5);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(2.5, 2.0, 2.5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe7ecff, 0.4);
      fill.position.set(-2, 1.2, -1.5);
      scene.add(fill);

      // Resize / camera fit
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

      function resize() {
        // ✅ Read the ref fresh every time; bail if missing
        const el = containerRef.current;
        if (!el) return;
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = Math.max(1e-6, w / Math.max(1, h)); // avoid NaN
        camera.updateProjectionMatrix();
        if (fitRadius) fitCameraForRadius(fitRadius);
      }

      resize();
      const ro = new ResizeObserver(() => resize());
      // ✅ Observe only if the element is still present
      if (containerRef.current) ro.observe(containerRef.current);

      // Controls
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;
      controls.rotateSpeed = 2.6;
      controls.dynamicDampingFactor = 0.1;

      // Scene graph
      const hourglassGroup: Group = new THREE.Group();
      scene.add(hourglassGroup);

      const axisNode: Group = new THREE.Group();
      hourglassGroup.add(axisNode);

      const tiltNode: Group = new THREE.Group();
      axisNode.add(tiltNode);

      // Will store refs for HUD planes (fixed to screen)
      let occPlane: Mesh | null = null;
      let maskedText: Mesh | null = null;

      // Load model
      const loader = new GLTFLoader();
      loader.load('/hourglass_V4.5.glb', (gltf: any) => {
        const root = gltf.scene as Group;
        root.scale.set(1.25, 1.25, 1.25);
        root.traverse((o: any) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = false;
          }
        });

        // Env
        const pmrem: PMREMGenerator = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        // Cavity (inner)
        const cavity =
          root.getObjectByName('Cavity_Collider') ||
          root.getObjectByName('Cavity') ||
          null;

        if (cavity) {
          const cavMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.12,
            transmission: 1.0,
            ior: 1.15,
            thickness: 0.18,
            attenuationColor: new THREE.Color(CAVITY_ATTEN_COLOR),
            attenuationDistance: CAVITY_ATTEN_DIST,
            transparent: true,
            opacity: 1.0,
            side: THREE.BackSide,
            depthWrite: false,
            envMapIntensity: 1.0,
          } as any);
          (cavity as any).traverse?.((n: any) => {
            if (n.isMesh) n.material = cavMat;
          });
          if ((cavity as any).isMesh) (cavity as any).material = cavMat;
          (cavity as any).renderOrder = 3.2;
        }

        // Glass
        const glass =
          root.getObjectByName('Glass') ||
          root.getObjectByName('Hourglass_Glass') ||
          root.getObjectByName('glass') ||
          null;

        if (glass) {
          const glassMat = new THREE.MeshPhysicalMaterial({
            color: GLASS_SURFACE_COLOR,
            metalness: 0.0,
            roughness: GLASS_ROUGHNESS,
            transparent: true,
            opacity: 1.0,
            transmission: 1.0,
            ior: 1.5,
            thickness: GLASS_THICKNESS,
            attenuationColor: new THREE.Color(GLASS_ATTEN_COLOR),
            attenuationDistance: GLASS_ATTEN_DIST,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            envMapIntensity: GLASS_ENV_INTENSITY,
            depthWrite: false,
          } as any);
          (glass as any).traverse?.((n: any) => {
            if (n.isMesh) n.material = glassMat;
          });
          if ((glass as any).isMesh) (glass as any).material = glassMat;
          (glass as any).renderOrder = 4.0;
        }

        tiltNode.add(root);

        // ====== STENCIL MASK PIPELINE (static sizes) ======
        const maskGeo =
          (glass as any)?.geometry ||
          (glass as any)?.children?.find((c: any) => c.isMesh)?.geometry;

        if (maskGeo) {
          // (1) Write stencil=1 where glass silhouette is (follows hourglass).
          const maskMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({
            colorWrite: false,
            depthWrite: false,
          });
          (maskMat as any).stencilWrite = true;
          (maskMat as any).stencilRef = 1;
          (maskMat as any).stencilFunc = (THREE as any).AlwaysStencilFunc;
          (maskMat as any).stencilZPass = (THREE as any).ReplaceStencilOp;
          (maskMat as any).stencilZFail = (THREE as any).KeepStencilOp;
          (maskMat as any).stencilFail = (THREE as any).KeepStencilOp;

          const maskMesh: Mesh = new THREE.Mesh(maskGeo.clone(), maskMat);
          maskMesh.renderOrder = 1;
          maskMesh.frustumCulled = false;
          tiltNode.add(maskMesh);

          // (2) Screen-fixed occluder + stacked text, drawn only where stencil==1
          const occMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            depthTest: false,
          });
          (occMat as any).stencilWrite = true;
          (occMat as any).stencilRef = 1;
          (occMat as any).stencilFunc = (THREE as any).EqualStencilFunc;
          (occMat as any).stencilZPass = (THREE as any).KeepStencilOp;

          occPlane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), occMat);
          occPlane.renderOrder = 2;
          occPlane.frustumCulled = false;
          scene.add(occPlane);

          // Stacked SUMMIT / VISIONS
          const sumCanvas = document.createElement('canvas');
          sumCanvas.width = 2048;
          sumCanvas.height = 1024;
          const ctx = sumCanvas.getContext('2d')!;
          ctx.clearRect(0, 0, sumCanvas.width, sumCanvas.height);
          ctx.fillStyle = '#000000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const size = Math.floor(sumCanvas.width * FONT_SCALE);
          ctx.font = `900 ${size}px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`;
          ctx.fillText('SUMMIT', sumCanvas.width / 2, sumCanvas.height * 0.41);
          ctx.fillText('VISIONS', sumCanvas.width / 2, sumCanvas.height * 0.56);

          const sumTex: CanvasTexture = new THREE.CanvasTexture(sumCanvas);
          (sumTex as any).colorSpace = (THREE as any).SRGBColorSpace;

          const sumMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: sumTex,
            transparent: true,
            depthTest: false,
          });
          (sumMat as any).stencilWrite = true;
          (sumMat as any).stencilRef = 1;
          (sumMat as any).stencilFunc = (THREE as any).EqualStencilFunc;
          (sumMat as any).stencilZPass = (THREE as any).KeepStencilOp;

          maskedText = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), sumMat);
          maskedText.renderOrder = 3;
          maskedText.frustumCulled = false;
          scene.add(maskedText);

          // Mark as HUD so we reposition every frame (but NOT rescale)
          (occPlane as any).userData.hud = true;
          (maskedText as any).userData.hud = true;
          (scene as any).userData._hudPlanes = [occPlane, maskedText];

          function placeHUD() {
            const hudPlanes = ((scene as any).userData._hudPlanes as Mesh[]) || [];
            for (const m of hudPlanes) {
              m.quaternion.copy(camera.quaternion); // face camera
              m.position
                .copy(camera.position)
                .add(new THREE.Vector3(0, 0, -HUD_DISTANCE).applyQuaternion(camera.quaternion));
            }
          }
          (scene as any).userData._placeHUD = placeHUD;
        }

        // Fit camera to model
        const sphere: Sphere = new THREE.Sphere();
        new THREE.Box3().setFromObject(root).getBoundingSphere(sphere as Sphere);
        fitRadius = (sphere as Sphere).radius;
        fitCameraForRadius(fitRadius);

        // ============== POSE ANIMATION ON LOAD =================
        function ease(u: number) {
          return u * u * u * (u * (6 * u - 15) + 10); // smootherstep
        }

        const startQ: Quaternion = axisNode.quaternion.clone();
        const targetEuler: Euler = new THREE.Euler(
          THREE.MathUtils.degToRad(-20),
          0,
          THREE.MathUtils.degToRad(15),
          'YXZ'
        );
        const targetQ: Quaternion = new THREE.Quaternion().setFromEuler(targetEuler);

        let startMs = 0;
        function animatePose(now: number) {
          if (startMs === 0) startMs = now + 150; // delay ms
          const t = Math.max(0, Math.min(1, (now - startMs) / 1200)); // 1.2s
          const u = ease(t);

          const q = startQ.clone().slerp(targetQ, u);
          axisNode.quaternion.copy(q);

          if (t < 1) requestAnimationFrame(animatePose);
        }
        requestAnimationFrame(animatePose);
        // =======================================================
      });

      // Render loop
      function tick() {
        controls.update();

        const placeHUD = (scene as any).userData._placeHUD as (() => void) | undefined;
        if (placeHUD) placeHUD();

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      }
      tick();

      cleanup = () => {
        if (rafId) cancelAnimationFrame(rafId);
        ro.disconnect();
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
          className="text-[18vw] md:text-[14vw] font-extrabold tracking-tight text-black"
          style={{ letterSpacing: '0.25em', textTransform: 'uppercase' }}
        >
          SRKR
        </span>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[75vh] md:h-[85vh] lg:h-[92vh] max-w-none"
      />

      <div className="absolute left-4 bottom-4 text-xs text-black/60">
        use mouse to move the hourglass
      </div>
    </section>
  );
}