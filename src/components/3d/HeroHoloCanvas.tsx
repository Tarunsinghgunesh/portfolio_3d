'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function HoloCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.8;
    if (ring2.current) ring2.current.rotation.x -= delta * 0.5;
    if (ring3.current) ring3.current.rotation.y += delta * 0.7;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      {/* Central Cyber Crystal */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.4, 2]} />
        <MeshDistortMaterial
          color="#00f5c8"
          emissive="#00f5c8"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={3}
        />
      </mesh>

      {/* Outer Wireframe Rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" wireframe />
      </mesh>

      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.025, 16, 64]} />
        <meshBasicMaterial color="#a855f7" wireframe />
      </mesh>

      <mesh ref={ring3} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0, 0.02, 16, 64]} />
        <meshBasicMaterial color="#f59e0b" wireframe />
      </mesh>
    </Float>
  );
}

function StarField() {
  const points = useMemo(() => {
    const p = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i += 3) {
      p[i] = (Math.random() - 0.5) * 15;
      p[i + 1] = (Math.random() - 0.5) * 15;
      p[i + 2] = (Math.random() - 0.5) * 15;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return geom;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <points ref={ref} geometry={points}>
      <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.6} />
    </points>
  );
}

export const HeroHoloCanvas: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full min-h-[400px]" />;

  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[480px] relative pointer-events-auto">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#00f5c8" />
        <pointLight position={[-5, -5, -5]} intensity={1.8} color="#8b5cf6" />
        <pointLight position={[0, 0, 4]} intensity={1.2} color="#f59e0b" />
        <HoloCore />
        <StarField />
      </Canvas>
    </div>
  );
};
