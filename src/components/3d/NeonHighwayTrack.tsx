'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeonHighwayTrackProps {
  speed: number;
  isNitro: boolean;
}

export const NeonHighwayTrack: React.FC<NeonHighwayTrackProps> = ({ speed, isNitro }) => {
  const gridRef = useRef<THREE.Group>(null);
  const sideBeamsRef = useRef<THREE.Group>(null);
  const warpStarsRef = useRef<THREE.Points>(null);

  // Speed lines / Neon Grid
  const lineCount = 30;

  // Warp Stars Particles
  const warpPoints = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = Math.random() * 8 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 60;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame((_, delta) => {
    const moveZ = delta * (speed * 0.35 + (isNitro ? 50 : 16));

    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + moveZ) % 4;
    }

    if (sideBeamsRef.current) {
      sideBeamsRef.current.position.z = (sideBeamsRef.current.position.z + moveZ) % 10;
    }

    if (warpStarsRef.current) {
      const pos = warpStarsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 2; i < pos.length; i += 3) {
        pos[i] += moveZ;
        if (pos[i] > 20) {
          pos[i] = -40;
        }
      }
      warpStarsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* ── HIGHWAY FLOOR SURFACE ── */}
      <mesh position={[0, -0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 100]} />
        <meshStandardMaterial
          color="#060212"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* ── SCROLLING NEON GRID LANES ── */}
      <group ref={gridRef} position={[0, -0.44, 0]}>
        {/* Center Dash Stripes */}
        {Array.from({ length: lineCount }).map((_, i) => (
          <mesh key={`dash-${i}`} position={[0, 0, -40 + i * 4]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.25, 2.2]} />
            <meshBasicMaterial color={isNitro ? '#00ffff' : '#ff007f'} />
          </mesh>
        ))}

        {/* Lane Dividers */}
        {[-2.2, 2.2].map((x, idx) => (
          <mesh key={`lane-${idx}`} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.08, 100]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        ))}
      </group>

      {/* ── GLOWING NEON HIGHWAY SIDE BARRIERS ── */}
      {[-4.5, 4.5].map((x, idx) => (
        <group key={`barrier-${idx}`} position={[x, -0.25, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 100]} />
            <meshBasicMaterial color="#00f5c8" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.1, 0.4, 100]} />
            <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2.5} />
          </mesh>
        </group>
      ))}

      {/* ── HIGH-SPEED NEON ARCHES ── */}
      <group ref={sideBeamsRef} position={[0, -0.2, 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <group key={`arch-${i}`} position={[0, 1.6, -35 + i * 10]}>
            {/* Top Cross Beam */}
            <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[9.2, 0.1, 0.1]} />
              <meshStandardMaterial color="#00f5c8" emissive="#00f5c8" emissiveIntensity={3.0} />
            </mesh>
            {/* Left Pillar */}
            <mesh position={[-4.5, 0, 0]}>
              <boxGeometry args={[0.1, 2.8, 0.1]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.5} />
            </mesh>
            {/* Right Pillar */}
            <mesh position={[4.5, 0, 0]}>
              <boxGeometry args={[0.1, 2.8, 0.1]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── WARP SPEED PARTICLES ── */}
      <points ref={warpStarsRef} geometry={warpPoints}>
        <pointsMaterial
          size={0.08}
          color={isNitro ? '#00ffff' : '#ec4899'}
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};
