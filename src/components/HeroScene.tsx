import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';

import { useGLTF, Float, Environment, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function Ripple() {
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!rippleRef.current) return;
    const t = (clock.getElapsedTime() * 0.5) % 1;
    const scale = 1 + t * 20;
    const opacity = Math.max(0, 1 - t * 1.5);

    rippleRef.current.scale.set(scale, scale, 1);
    if (rippleRef.current.material instanceof THREE.MeshBasicMaterial) {
      rippleRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <ringGeometry args={[0.98, 1, 128]} />
      <meshBasicMaterial color="#b81400" transparent opacity={0.6} />
    </mesh>
  );
}

import { getIKUrl } from '../utils/imageKit';

function Model({ scrollY }: { scrollY: number }) {
  // Ultra-robust pathing for Vite via ImageKit CDN
  const modelPath = getIKUrl("/portfolio/mecha_hunter_katana.glb");

  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Entrance Animation - Using a small delay to ensure geometry is fully ready for bounds
    const ctx = gsap.context(() => {
      gsap.from(modelRef.current!.scale, {
        x: 0, y: 0, z: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.from(modelRef.current!.rotation, {
        y: Math.PI * 4,
        duration: 3,
        ease: "power2.out",
      });
    }, modelRef);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  useFrame((state: RootState) => {
    if (!modelRef.current) return;

    // Smooth Scroll Rotation
    const targetRotationY = Math.PI * 2 * scrollY;
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY,
      0.03
    );

    // Parallax & Floating (Reduced intensity for better visibility)
    const targetY = scrollY * -4;
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      targetY + Math.sin(state.clock.elapsedTime) * 0.2,
      0.03
    );

    // Interaction & Italic Tilt
    const targetRotationX = mouse.current.y * 0.3;
    const targetRotationZ = (mouse.current.x * 0.3) - 0.54; // Added constant italic lean
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.05);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, targetRotationZ, 0.05);
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={2.4}
        position={[0, -7, 0]}
      />



    </Center>
  );
}

export default function HeroScene() {
  const [scrollY, setScrollY] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 1024 : false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll <= 0 ? 0 : window.scrollY / totalScroll;
      setScrollY(progress);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (hasError || !isDesktop) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-transparent">
      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 75, rotation: [0.2, 0.2, 0] }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#b81400" />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Ripple />
            <Model scrollY={scrollY} />
          </Float>
          <Environment preset="studio" />
          <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={3} far={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(getIKUrl("/portfolio/mecha_hunter_katana.glb"));





