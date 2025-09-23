'use client';

import { useEffect, useRef } from 'react';
// Type-only imports to keep the bundle lean while satisfying TS
import type { Group, Mesh, PerspectiveCamera, Scene, WebGLRenderer, PMREMGenerator, Sphere, Euler, Quaternion } from 'three';

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

      // -------------------- Tunables --------------------
      const HUD_DISTANCE = 2.4;

      const PLANE_W = 3.6;
      const PLANE_H = 1.6;
      const FONT_SCALE = 0.08;

      const GLASS_SURFACE_COLOR = 0xa5b4fc;
      const GLASS_ATTEN_COLOR   = 0xaec2ff;
      const GLASS_THICKNESS     = 0.9;
      const GLASS_ATTEN_DIST    = 1.6;
      const GLASS_ENV_INTENSITY = 1.0;
      const GLASS_ROUGHNESS     = 0.08;

      const CAVITY_ATTEN_COLOR  = 0xeef3ff;
      const CAVITY_ATTEN_DIST   = 5.0;

      // -------------------- Renderer --------------------
      const renderer: WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        stencil: true,
      });
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
      (renderer as any).physicallyCorrectLights = true;
      (renderer as any).toneMapping = (THREE as any).ACESFilmicToneMapping;
      (renderer as any).toneMappingExposure = 1.0;
      containerEl.appendChild(renderer.domElement);

      // -------------------- Scene / Camera --------------------
      const scene: Scene = new THREE.Scene();
      scene.background = null;

      const camera: PerspectiveCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);

      // -------------------- Lights --------------------
      scene.add(new THREE.HemisphereLight(0xBFD4FF, 0x1b1f2f, 0.5));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(2.5, 2.0, 2.5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe7ecff, 0.4);
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

      function resize() {
        const el = containerRef.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = Math.max(1e-6, w / Math.max(1, h));
        camera.updateProjectionMatrix();
        if (fitRadius) fitCameraForRadius(fitRadius);
      }

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(containerEl);

      // -------------------- Controls --------------------
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;
      controls.rotateSpeed = 2.6;
      controls.dynamicDampingFactor = 0.1;

      // -------------------- Graph --------------------
      const hourglassGroup: Group = new (THREE as any).Group();
      scene.add(hourglassGroup);

      const axisNode: Group = new (THREE as any).Group();
      hourglassGroup.add(axisNode);

      const tiltNode: Group = new (THREE as any).Group();
      axisNode.add(tiltNode);

      // HUD planes (created later)
      let occPlane: Mesh | undefined;
      let maskedText: Mesh | undefined;

      // -------------------- Load GLTF --------------------
      const loader = new GLTFLoader();
      loader.load('/hourglass_V4.5.glb', (gltf: any) => {
        const root = gltf.scene as Group;
        root.scale.set(1.25, 1.25, 1.25);
        root.traverse((o: any) => {
          if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; }
        });

        // Environment
        const pmrem: PMREMGenerator = new (THREE as any).PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        // Cavity
        const cavity = root.getObjectByName('Cavity_Collider') || root.getObjectByName('Cavity') || null;
        if (cavity) {
          const cavMat = new (THREE as any).MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.12,
            transmission: 1.0,
            ior: 1.15,
            thickness: 0.18,
            attenuationColor: new (THREE as any).Color(CAVITY_ATTEN_COLOR),
            attenuationDistance: CAVITY_ATTEN_DIST,
            transparent: true,
            opacity: 1.0,
            side: (THREE as any).BackSide,
            depthWrite: false,
            envMapIntensity: 1.0,
          });
          (cavity as any).traverse?.((n: any) => { if (n.isMesh) n.material = cavMat; });
          if ((cavity as any).isMesh) (cavity as any).material = cavMat;
          (cavity as any).renderOrder = 3.2;
        }

        // Glass
        const glass = root.getObjectByName('Glass') || root.getObjectByName('Hourglass_Glass') || root.getObjectByName('glass') || null;
        if (glass) {
          const glassMat = new (THREE as any).MeshPhysicalMaterial({
            color: GLASS_SURFACE_COLOR,
            metalness: 0.0,
            roughness: GLASS_ROUGHNESS,
            transparent: true,
            opacity: 1.0,
            transmission: 1.0,
            ior: 1.5,
            thickness: GLASS_THICKNESS,
            attenuationColor: new (THREE as any).Color(GLASS_ATTEN_COLOR),
            attenuationDistance: GLASS_ATTEN_DIST,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            envMapIntensity: GLASS_ENV_INTENSITY,
            depthWrite: false,
          });
          (glass as any).traverse?.((n: any) => { if (n.isMesh) n.material = glassMat; });
          if ((glass as any).isMesh) (glass as any).material = glassMat;
          (glass as any).renderOrder = 4.0;
        }

        tiltNode.add(root);

        // --------- Stencil mask & HUD planes ----------
        const maskGeo =
          (glass as any)?.geometry ||
          (glass as any)?.children?.find((c: any) => c.isMesh)?.geometry;

        if (maskGeo) {
          // (1) Write stencil where the glass silhouette is
          const maskMat = new (THREE as any).MeshBasicMaterial({ colorWrite: false, depthWrite: false });
          (maskMat as any).stencilWrite = true;
          (maskMat as any).stencilRef = 1;
          (maskMat as any).stencilFunc = (THREE as any).AlwaysStencilFunc;
          (maskMat as any).stencilZPass = (THREE as any).ReplaceStencilOp;
          (maskMat as any).stencilZFail = (THREE as any).KeepStencilOp;
          (maskMat as any).stencilFail = (THREE as any).KeepStencilOp;

          const maskMesh: Mesh = new (THREE as any).Mesh(maskGeo.clone(), maskMat);
          maskMesh.renderOrder = 1;
          maskMesh.frustumCulled = false;
          tiltNode.add(maskMesh);

          // (2) Fixed-screen occluder plane
          const occMat = new (THREE as any).MeshBasicMaterial({ color: 0xffffff, depthTest: false });
          (occMat as any).stencilWrite = true;
          (occMat as any).stencilRef = 1;
          (occMat as any).stencilFunc = (THREE as any).EqualStencilFunc;
          (occMat as any).stencilZPass = (THREE as any).KeepStencilOp;

          const occ = new (THREE as any).Mesh(new (THREE as any).PlaneGeometry(PLANE_W, PLANE_H), occMat) as Mesh;
          occ.renderOrder = 2;
          occ.frustumCulled = false;
          // Only add if defined (it is)
          scene.add(occ);
          occPlane = occ;

          // (3) Text plane
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
          ctx.fillText('SUMMIT',  sumCanvas.width / 2, sumCanvas.height * 0.41);
          ctx.fillText('VISIONS', sumCanvas.width / 2, sumCanvas.height * 0.56);

          const sumTex = new (THREE as any).CanvasTexture(sumCanvas);
          (sumTex as any).colorSpace = (THREE as any).SRGBColorSpace;

          const sumMat = new (THREE as any).MeshBasicMaterial({
            map: sumTex,
            transparent: true,
            depthTest: false,
          });
          (sumMat as any).stencilWrite = true;
          (sumMat as any).stencilRef = 1;
          (sumMat as any).stencilFunc = (THREE as any).EqualStencilFunc;
          (sumMat as any).stencilZPass = (THREE as any).KeepStencilOp;

          const textPlane = new (THREE as any).Mesh(new (THREE as any).PlaneGeometry(PLANE_W, PLANE_H), sumMat) as Mesh;
          textPlane.renderOrder = 3;
          textPlane.frustumCulled = false;
          scene.add(textPlane);
          maskedText = textPlane;

          // Mark HUD planes (guards + filter to satisfy TS)
          const hudPlanes = [occPlane, maskedText].filter(Boolean) as Mesh[];
          for (const m of hudPlanes) (m as any).userData.hud = true;
          (scene as any).userData._hudPlanes = hudPlanes;

          (scene as any).userData._placeHUD = () => {
            const list = ((scene as any).userData._hudPlanes as Mesh[]) || [];
            for (const m of list) {
              m.quaternion.copy(camera.quaternion);
              m.position.copy(camera.position).add(
                new (THREE as any).Vector3(0, 0, -HUD_DISTANCE).applyQuaternion(camera.quaternion)
              );
            }
          };
        }

        // Fit camera to model
        const sphere: Sphere = new (THREE as any).Sphere();
        new (THREE as any).Box3().setFromObject(root).getBoundingSphere(sphere);
        fitRadius = (sphere as any).radius || 0;
        fitCameraForRadius(fitRadius);

        // -------------------- On-load pose --------------------
        const smoother = (u: number) => u * u * u * (u * (6 * u - 15) + 10);
        const startQ: Quaternion = axisNode.quaternion.clone();
        const targetEuler: Euler = new (THREE as any).Euler(
          (THREE as any).MathUtils.degToRad(-20),
          0,
          (THREE as any).MathUtils.degToRad(15),
          'YXZ'
        );
        const targetQ: Quaternion = new (THREE as any).Quaternion().setFromEuler(targetEuler);

        let startMs = 0;
        function animatePose(now: number) {
          if (startMs === 0) startMs = now + 150;
          const t = Math.max(0, Math.min(1, (now - startMs) / 1200));
          const u = smoother(t);
          const q = startQ.clone().slerp(targetQ, u);
          (axisNode as any).quaternion.copy(q);
          if (t < 1) requestAnimationFrame(animatePose);
        }
        requestAnimationFrame(animatePose);
      });

      // -------------------- Loop --------------------
      function tick() {
        (controls as any).update();
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
    return () => { if (cleanup) cleanup(); };
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

      {/* Canvas host */}
      <div ref={containerRef} className="relative w-full h-[75vh] md:h-[85vh] lg:h-[92vh] max-w-none" />

      <div className="absolute left-4 bottom-4 text-xs text-black/60">
        use mouse to move the hourglass
      </div>
    </section>
  );
}