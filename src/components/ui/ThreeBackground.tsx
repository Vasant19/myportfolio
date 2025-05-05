// src/components/ThreeBackground.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeBackgroundProps {
  isDarkMode: boolean;
}

export default function ThreeBackground({ isDarkMode }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameId = useRef<number | null>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Create Round Sprite Texture ---
    const size = 64;
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = size;
    const ctx = spriteCanvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    const circleTexture = new THREE.CanvasTexture(spriteCanvas);

    // --- Particles Setup ---
    const geometry = new THREE.BufferGeometry();
    const count = 600; // fewer particles
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.25,
      map: circleTexture,
      alphaTest: 0.5,
      color: isDarkMode ? 0xffffff : 0x000000,
      opacity: isDarkMode ? 0.8 : 0.6,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // one continuous spin on mount
    gsap.to(particles.rotation, {
      y: Math.PI * 2,
      duration: 80,
      ease: 'none',
      repeat: -1,
    });

    // --- Resize Handling ---
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // initial sizing

    // --- Mouse Move (throttled) ---
    let lastTime = 0;
    const handleMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 16) return;
      lastTime = now;
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);

    // --- Animation Loop ---
    const animate = () => {
      if (
        !particlesRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      ) {
        return;
      }

      // auto‑spin
      particlesRef.current.rotation.x += 0.0003;
      particlesRef.current.rotation.y += 0.0005;

      // micro‐drift: jiggle each vertex slightly
      const posAttr = particlesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] += (Math.random() - 0.5) * 0.0005;
        arr[i + 1] += (Math.random() - 0.5) * 0.0005;
        arr[i + 2] += (Math.random() - 0.5) * 0.0005;
      }
      posAttr.needsUpdate = true;

      // ease towards mouse rotation target
      particlesRef.current.rotation.x +=
        (mouse.current.y * 0.5 - particlesRef.current.rotation.x) * 0.05;
      particlesRef.current.rotation.y +=
        (mouse.current.x * 0.5 - particlesRef.current.rotation.y) * 0.05;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameId.current = requestAnimationFrame(animate);
    };
    animate();

    // --- Cleanup on Unmount ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(frameId.current!);

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
        scene.remove(particlesRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []); // mount only

  // Update color & opacity when theme toggles
  useEffect(() => {
    if (particlesRef.current) {
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.set(isDarkMode ? 0xffffff : 0x000000);
      mat.opacity = isDarkMode ? 0.8 : 0.6;
    }
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="three-bg-canvas fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
