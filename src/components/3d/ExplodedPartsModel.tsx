'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei';

interface ExplodedPartsModelProps {
  progress: number; // 0 to 1
  autoRotate?: boolean;
}

export const ExplodedPartsModel: React.FC<ExplodedPartsModelProps> = ({ progress, autoRotate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Smooth lerp progress value
  const smoothProgress = useRef(0);

  // Custom materials with futuristic cyber aesthetic
  const materials = useMemo(() => {
    return {
      darkChassis: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b1428'),
        metalness: 0.85,
        roughness: 0.2,
        wireframe: false,
      }),
      titaniumTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38bdf8'),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color('#0284c7'),
        emissiveIntensity: 0.3,
      }),
      neonCyanGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00f5c8'),
        emissive: new THREE.Color('#00f5c8'),
        emissiveIntensity: 2.5,
        toneMapped: false,
      }),
      neonGoldGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f59e0b'),
        emissive: new THREE.Color('#f59e0b'),
        emissiveIntensity: 2.0,
        toneMapped: false,
      }),
      circuitBoard: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#062035'),
        metalness: 0.6,
        roughness: 0.4,
      }),
      glassShield: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#e0f2fe'),
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.5,
        ior: 1.5,
      }),
      copperCoil: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ea580c'),
        metalness: 0.9,
        roughness: 0.25,
      }),
    };
  }, []);

  // Generate dynamic floating particles around the exploded assembly
  const particlesGeometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    // Lerp progress smoothly
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, progress, 0.08);
    const p = smoothProgress.current;

    if (groupRef.current) {
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.25 * (1 - p * 0.5);
      }
      // Slight floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.8;
      coreRef.current.rotation.y += delta * 1.2;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.5;

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  const p = progress;

  // Layer offsets dynamically calculated according to explosion expansion factor
  const topCoverY = 1.0 + p * 3.2;
  const topGlassY = 0.7 + p * 2.4;
  const opticsY = 0.45 + p * 1.6;
  const pcbTopY = 0.2 + p * 0.9;
  const coreY = 0.0;
  const pcbBottomY = -0.2 - p * 0.9;
  const batteryArrayY = -0.45 - p * 1.6;
  const coolingHeatsinkY = -0.7 - p * 2.3;
  const baseChassisY = -1.0 - p * 3.1;

  return (
    <group ref={groupRef} scale={[1.1, 1.1, 1.1]}>
      {/* ── LAYER 1: Top Titanium Display Enclosure (Explodes Highest) ── */}
      <group position={[0, topCoverY, 0]}>
        <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.08} smoothness={4} material={materials.darkChassis}>
          <mesh position={[0, 0.07, 0]} material={materials.glassShield}>
            <boxGeometry args={[3.0, 0.02, 2.0]} />
          </mesh>
        </RoundedBox>
        {/* Glowing Logo / Status Badge on Top */}
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.35, 32]} />
          <meshBasicMaterial color="#00f5c8" side={THREE.DoubleSide} />
        </mesh>
        {p > 0.3 && (
          <Text
            position={[2.4, 0.1, 0]}
            fontSize={0.22}
            color="#00f5c8"
            anchorX="left"
            anchorY="middle"
          >
            01. Interactive UI / UX Layer
          </Text>
        )}
      </group>

      {/* ── LAYER 2: Glass AR Projection & Sensor Screen ── */}
      <group position={[0, topGlassY, 0]}>
        <mesh material={materials.glassShield}>
          <boxGeometry args={[2.9, 0.04, 1.9]} />
        </mesh>
        {/* Micro Sensor Grid */}
        <gridHelper args={[2.8, 14, '#00f5c8', '#1e293b']} position={[0, 0.03, 0]} />
        {p > 0.4 && (
          <Text
            position={[-2.4, 0, 0]}
            fontSize={0.2}
            color="#38bdf8"
            anchorX="right"
            anchorY="middle"
          >
            02. Three.js / R3F Canvas Bridge
          </Text>
        )}
      </group>

      {/* ── LAYER 3: Optical Lens Array & Laser Emitters ── */}
      <group position={[0, opticsY, 0]}>
        {[-0.8, 0, 0.8].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh material={materials.titaniumTrim}>
              <cylinderGeometry args={[0.3, 0.32, 0.15, 32]} />
            </mesh>
            <mesh position={[0, 0.08, 0]} material={materials.neonCyanGlow}>
              <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── LAYER 4: High-Density Motherboard PCB (Frontend & Next.js Engine) ── */}
      <group position={[0, pcbTopY, 0]}>
        <mesh material={materials.circuitBoard}>
          <boxGeometry args={[3.0, 0.06, 2.0]} />
        </mesh>
        {/* Microchips & Capacitors Array */}
        {[-0.9, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0.07, -0.5]} material={materials.darkChassis}>
            <boxGeometry args={[0.6, 0.08, 0.6]} />
          </mesh>
        ))}
        {/* Golden Pin Connectors */}
        <mesh position={[0, 0.05, 0.9]} material={materials.neonGoldGlow}>
          <boxGeometry args={[2.6, 0.04, 0.08]} />
        </mesh>
        {p > 0.35 && (
          <Text
            position={[2.4, 0, 0]}
            fontSize={0.22}
            color="#f59e0b"
            anchorX="left"
            anchorY="middle"
          >
            03. Next.js App Router Architecture
          </Text>
        )}
      </group>

      {/* ── LAYER 5: The Quantum Cyber Core (Central Power & Isar / Supabase Engine) ── */}
      <group position={[0, coreY, 0]}>
        {/* Central Glowing Icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.65, 1]} />
          <MeshDistortMaterial
            color="#00f5c8"
            emissive="#00f5c8"
            emissiveIntensity={1.8}
            speed={2}
            distort={0.25}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Gyroscopic Orbital Rings */}
        <group ref={ring1Ref}>
          <mesh material={materials.neonCyanGlow}>
            <torusGeometry args={[1.1, 0.02, 16, 64]} />
          </mesh>
        </group>
        <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <mesh material={materials.neonGoldGlow}>
            <torusGeometry args={[1.35, 0.02, 16, 64]} />
          </mesh>
        </group>
        <group ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <mesh material={materials.titaniumTrim}>
            <torusGeometry args={[1.6, 0.02, 16, 64]} />
          </mesh>
        </group>

        {p > 0.25 && (
          <Text
            position={[-2.4, 0, 0]}
            fontSize={0.22}
            color="#00f5c8"
            anchorX="right"
            anchorY="middle"
          >
            04. High-Throughput Cloud & Native DB
          </Text>
        )}
      </group>

      {/* ── LAYER 6: Bottom PCB (Flutter & Android Native Bridges) ── */}
      <group position={[0, pcbBottomY, 0]}>
        <mesh material={materials.circuitBoard}>
          <boxGeometry args={[3.0, 0.06, 2.0]} />
        </mesh>
        {/* Copper Induction Tracks */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0]} material={materials.copperCoil}>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          </mesh>
        ))}
      </group>

      {/* ── LAYER 7: High-Capacity Battery & Power Modules ── */}
      <group position={[0, batteryArrayY, 0]}>
        {[-0.75, 0.75].map((x, i) => (
          <RoundedBox key={i} args={[1.3, 0.2, 1.8]} radius={0.05} smoothness={3} position={[x, 0, 0]} material={materials.darkChassis}>
            <mesh position={[0, 0.11, 0]} material={materials.neonCyanGlow}>
              <boxGeometry args={[1.1, 0.02, 0.1]} />
            </mesh>
          </RoundedBox>
        ))}
        {p > 0.4 && (
          <Text
            position={[2.4, 0, 0]}
            fontSize={0.22}
            color="#38bdf8"
            anchorX="left"
            anchorY="middle"
          >
            05. 60fps Native Android/iOS Bridge
          </Text>
        )}
      </group>

      {/* ── LAYER 8: Copper Heat-Pipes & Vapor Chamber Cooling ── */}
      <group position={[0, coolingHeatsinkY, 0]}>
        <mesh material={materials.copperCoil}>
          <boxGeometry args={[2.7, 0.08, 1.7]} />
        </mesh>
        {/* Fins */}
        {Array.from({ length: 8 }).map((_, idx) => (
          <mesh key={idx} position={[0, 0.07, -0.7 + idx * 0.2]} material={materials.titaniumTrim}>
            <boxGeometry args={[2.6, 0.06, 0.04]} />
          </mesh>
        ))}
      </group>

      {/* ── LAYER 9: Anodized Bottom Chassis with Intake Vents ── */}
      <group position={[0, baseChassisY, 0]}>
        <RoundedBox args={[3.2, 0.25, 2.2]} radius={0.1} smoothness={4} material={materials.darkChassis}>
          {/* Glowing Status Underglow */}
          <mesh position={[0, -0.13, 0]} material={materials.neonCyanGlow}>
            <boxGeometry args={[3.0, 0.02, 2.0]} />
          </mesh>
        </RoundedBox>
        {/* Mechanical Corner Stand-off Pillars */}
        {[
          [-1.4, 0.2, -0.9],
          [1.4, 0.2, -0.9],
          [-1.4, 0.2, 0.9],
          [1.4, 0.2, 0.9],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} material={materials.titaniumTrim}>
            <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
          </mesh>
        ))}
        {p > 0.3 && (
          <Text
            position={[-2.4, 0, 0]}
            fontSize={0.22}
            color="#94a3b8"
            anchorX="right"
            anchorY="middle"
          >
            06. Zero-Downtime Infrastructure & Security
          </Text>
        )}
      </group>

      {/* ── Ambient Floating Cyber Data Particles ── */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.06}
          color="#00f5c8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
