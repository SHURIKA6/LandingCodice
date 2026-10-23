// Used only by the client-side Hero. Keeping a single client boundary also
// prevents this optional module from becoming a required hydration entry.
import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { clampPortraitProgress, getPortraitMotion, getSquareTextureCrop } from "./portraitMotion";

export type PortraitSceneProps = {
  portraits: readonly string[];
  progress: MotionValue<number>;
  onReady: () => void;
  onError: () => void;
};

export default function PortraitScene({ portraits, progress, onReady, onError }: PortraitSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const callbacks = useRef({ onReady, onError });

  useEffect(() => {
    callbacks.current = { onReady, onError };
  }, [onReady, onError]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let released = false;
    let failed = false;
    let ready = false;
    let texturesReady = false;
    let loadedCount = 0;
    let frame: number | null = null;
    let targetProgress = clampPortraitProgress(progress.get());
    let displayWidth = 0;
    let displayHeight = 0;
    let displayDpr = 0;
    let needsResize = true;
    let renderer: THREE.WebGLRenderer | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let unsubscribeProgress: (() => void) | undefined;
    const initialRect = canvas.getBoundingClientRect();
    let inView = initialRect.bottom > 0 && initialRect.top < window.innerHeight
      && initialRect.right > 0 && initialRect.left < window.innerWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    const textures = new Set<THREE.Texture>();
    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();
    const panels: THREE.Group[] = [];

    function cancelFrame() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function releaseResources() {
      if (released) return;
      released = true;
      cancelFrame();
      unsubscribeProgress?.();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      canvas?.removeEventListener("webglcontextlost", handleContextLost);
      scene.clear();
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      textures.clear();
      materials.clear();
      geometries.clear();
      panels.length = 0;
      // Do not force a context-loss event on the canvas: Strict Mode reuses it.
      renderer?.dispose();
    }

    function fail() {
      if (disposed || failed) return;
      failed = true;
      releaseResources();
      callbacks.current.onError();
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      // A complete HTML fallback is more useful here than a partial GL rebuild.
      fail();
    }

    function requestRender() {
      if (disposed || failed || !texturesReady || !inView || document.hidden || frame !== null) return;
      frame = window.requestAnimationFrame(render);
    }

    function handleVisibilityChange() {
      if (document.hidden) cancelFrame();
      else requestRender();
    }

    function handleResize() {
      needsResize = true;
      requestRender();
    }

    function render() {
      frame = null;
      if (disposed || failed || !renderer || !texturesReady || !inView || document.hidden) return;

      try {
        if (needsResize) {
          const width = Math.round(canvas?.clientWidth ?? 0);
          const height = Math.round(canvas?.clientHeight ?? 0);
          if (width <= 0 || height <= 0) return;
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          if (width !== displayWidth || height !== displayHeight || dpr !== displayDpr) {
            renderer.setPixelRatio(dpr);
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            displayWidth = width;
            displayHeight = height;
            displayDpr = dpr;
          }
          needsResize = false;
        }

        const motion = getPortraitMotion(targetProgress);
        motion.panels.forEach((pose, index) => {
          const panel = panels[index];
          panel.position.set(pose.x, pose.y, pose.z);
          panel.rotation.set(0, pose.rotationY, pose.rotationZ);
          panel.scale.set(...pose.scale);
        });
        camera.position.set(motion.camera.x, motion.camera.y, motion.camera.z);
        camera.lookAt(0, 0, -0.05);

        const context = renderer.getContext();
        if (context.isContextLost()) {
          fail();
          return;
        }
        renderer.render(scene, camera);

        if (!ready && !disposed && !failed) {
          if (context.getError() !== context.NO_ERROR) {
            fail();
            return;
          }
          ready = true;
          callbacks.current.onReady();
        }
      } catch {
        fail();
      }
      // No recurring loop. The next scroll, resize or visibility change renders.
    }

    try {
      if (portraits.length < 1) {
        fail();
        return () => { disposed = true; releaseResources(); };
      }

      canvas.addEventListener("webglcontextlost", handleContextLost);
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setClearColor(0x000000, 0);

      const imageGeometry = new THREE.PlaneGeometry(3.15, 3.15);
      const frameGeometry = new THREE.PlaneGeometry(3.29, 3.29);
      geometries.add(imageGeometry);
      geometries.add(frameGeometry);
      const frameMaterial = new THREE.MeshBasicMaterial({ color: "#2F4BFF", toneMapped: false });
      materials.add(frameMaterial);
      const loader = new THREE.TextureLoader();

      portraits.forEach((source) => {
        const group = new THREE.Group();
        const imageMaterial = new THREE.MeshBasicMaterial({ toneMapped: false });
        materials.add(imageMaterial);
        const image = new THREE.Mesh(imageGeometry, imageMaterial);
        const border = new THREE.Mesh(frameGeometry, frameMaterial);
        border.position.set(0.035, -0.035, -0.035);
        group.add(border, image);
        panels.push(group);
        scene.add(group);

        const texture = loader.load(source, (loaded) => {
          if (disposed || failed) {
            loaded.dispose();
            return;
          }
          const imageSource = loaded.image as { width: number; height: number };
          if (!imageSource || imageSource.width <= 0 || imageSource.height <= 0) {
            fail();
            return;
          }
          const crop = getSquareTextureCrop(imageSource.width, imageSource.height);
          loaded.colorSpace = THREE.SRGBColorSpace;
          loaded.repeat.set(...crop.repeat);
          loaded.offset.set(...crop.offset);
          loaded.minFilter = THREE.LinearFilter;
          loaded.magFilter = THREE.LinearFilter;
          loaded.generateMipmaps = false;
          imageMaterial.map = loaded;
          imageMaterial.needsUpdate = true;
          loadedCount += 1;
          texturesReady = loadedCount === portraits.length;
          requestRender();
        }, undefined, fail);
        textures.add(texture);
      });

      unsubscribeProgress = progress.on("change", (value) => {
        targetProgress = clampPortraitProgress(value);
        requestRender();
      });
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);
      intersectionObserver = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        if (inView) requestRender();
        else cancelFrame();
      });
      intersectionObserver.observe(canvas);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("resize", handleResize, { passive: true });
    } catch {
      fail();
    }

    return () => {
      disposed = true;
      releaseResources();
    };
  }, [portraits, progress]);

  return <canvas className="portrait-canvas" aria-hidden="true" ref={canvasRef} />;
}
