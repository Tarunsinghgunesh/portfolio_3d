'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei';

interface CyberCarModelProps {
  speed: number;
  explodeProgress: number; // 0 to 1
  isNitro: boolean;
}

export const CyberCarModel: React.FC<CyberCarModelProps> = ({ speed, explodeProgress, isNitro }) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsGroupRef = useRef<THREE.Group>(null);
  const frontLeftWheel = useRef<THREE.Mesh>(null);
  const frontRightWheel = useRef<THREE.Mesh>(null);
  const rearLeftWheel = useRef<THREE.Mesh>(null);
  const rearRightWheel = useRef<THREE.Mesh>(null);
  const engineCoreRef = useRef<THREE.Mesh>(null);
  const nitroFlameRef1 = useRef<THREE.Mesh>(null);
  const nitroFlameRef2 = useRef<THREE.Mesh>(null);

  // Materials with ultra-vibrant holographic cyber colors
  const materials = useMemo(() => {
    return {
      bodyChassis: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0f051d'),
        metalness: 0.92,
        roughness: 0.15,
      }),
      carbonFiber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#181824'),
        metalness: 0.8,
        roughness: 0.3,
        wireframe: false,
      }),
      neonPinkGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff007f'),
        emissive: new THREE.Color('#ff007f'),
        emissiveIntensity: 3.0,
        toneMapped: false,
      }),
      neonCyanGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00f5c8'),
        emissive: new THREE.Color('#00f5c8'),
        emissiveIntensity: 3.2,
        toneMapped: false,
      }),
      neonPurpleGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#a855f7'),
        emissive: new THREE.Color('#a855f7'),
        emissiveIntensity: 2.8,
        toneMapped: false,
      }),
      neonGoldGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f59e0b'),
        emissive: new THREE.Color('#f59e0b'),
        emissiveIntensity: 2.5,
        toneMapped: false,
      }),
      windshieldGlass: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#818cf8'),
        transparent: true,
        opacity: 0.45,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.6,
        ior: 1.52,
      }),
      wheelRubber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#09090b'),
        roughness: 0.8,
      }),
      wheelRim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00f5c8'),
        emissive: new THREE.Color('#00f5c8'),
        emissiveIntensity: 1.8,
        metalness: 0.95,
      }),
      nitroFire: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00ffff'),
        emissive: new THREE.Color('#ff0055'),
        emissiveIntensity: 4.5,
        transparent: true,
        opacity: 0.9,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const rotSpeed = delta * (speed * 0.15 + (isNitro ? 25 : 8));

    // Spin wheels
    if (frontLeftWheel.current) frontLeftWheel.current.rotation.x += rotSpeed;
    if (frontRightWheel.current) frontRightWheel.current.rotation.x += rotSpeed;
    if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += rotSpeed;
    if (rearRightWheel.current) rearRightWheel.current.rotation.x += rotSpeed;

    // Pulse engine core
    if (engineCoreRef.current) {
      engineCoreRef.current.rotation.y += delta * 3;
      engineCoreRef.current.rotation.z += delta * 2;
    }

    // Car vibration & drift tilt
    if (carGroupRef.current) {
      if (explodeProgress < 0.1) {
        carGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 15) * 0.03;
        carGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.02;
      } else {
        carGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }

    // Nitro exhaust scale pulsation
    if (nitroFlameRef1.current && nitroFlameRef2.current) {
      const scale = isNitro ? 1.4 + Math.sin(state.clock.elapsedTime * 40) * 0.3 : 0.4;
      nitroFlameRef1.current.scale.set(scale, scale, isNitro ? scale * 2.5 : scale * 0.8);
      nitroFlameRef2.current.scale.set(scale, scale, isNitro ? scale * 2.5 : scale * 0.8);
    }
  });

  const p = explodeProgress;

  // Exploded layer offsets
  const roofY = 0.5 + p * 2.8;
  const hoodY = 0.2 + p * 2.0;
  const spoilerY = 0.6 + p * 3.2;
  const engineY = 0.1 + p * 1.3;
  const chassisY = -0.1 - p * 1.2;
  const wheelsSpreadX = p * 1.6;
  const wheelsSpreadZ = p * 1.2;

  return (
    <group ref={carGroupRef} scale={[1.2, 1.2, 1.2]}>
      {/* ── 1. MAIN AERODYNAMIC CHASSIS & COCKPIT ── */}
      <group position={[0, chassisY, 0]}>
        {/* Lower Main Floor */}
        <RoundedBox args={[2.1, 0.25, 4.4]} radius={0.08} smoothness={4} material={materials.bodyChassis}>
          {/* Underglow Neon Strip */}
          <mesh position={[0, -0.14, 0]} material={materials.neonPinkGlow}>
            <boxGeometry args={[1.9, 0.04, 4.1]} />
          </mesh>
        </RoundedBox>

        {/* Side Skirts with Cyan Glow Channels */}
        {[-1.08, 1.08].map((x, i) => (
          <group key={i} position={[x, -0.05, 0]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.1, 0.12, 3.8]} />
            </mesh>
            <mesh position={[0, 0.05, 0]} material={materials.neonCyanGlow}>
              <boxGeometry args={[0.08, 0.03, 3.6]} />
            </mesh>
          </group>
        ))}

        {p > 0.3 && (
          <Text position={[-2.4, 0, 0]} fontSize={0.22} color="#00f5c8" anchorX="right" anchorY="middle">
            01. Carbon-Aerodynamic Chassis
          </Text>
        )}
      </group>

      {/* ── 2. UPPER CANOPY & COCKPIT GLASS (Explodes Up) ── */}
      <group position={[0, roofY, 0]}>
        <RoundedBox args={[1.4, 0.45, 1.8]} radius={0.12} smoothness={4} position={[0, 0, -0.1]} material={materials.windshieldGlass}>
          <mesh position={[0, 0.24, 0]} material={materials.bodyChassis}>
            <boxGeometry args={[1.2, 0.05, 1.4]} />
          </mesh>
        </RoundedBox>

        {/* Holographic HUD Display in Cockpit */}
        <mesh position={[0, 0.1, 0.4]} rotation={[-Math.PI / 6, 0, 0]}>
          <planeGeometry args={[0.8, 0.35]} />
          <meshBasicMaterial color="#00f5c8" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {p > 0.4 && (
          <Text position={[2.4, 0, 0]} fontSize={0.22} color="#ff007f" anchorX="left" anchorY="middle">
            02. Full-Stack Next.js 14 Cockpit
          </Text>
        )}
      </group>

      {/* ── 3. HOOD & FRONT LASER HEADLIGHTS (Explodes Forward-Up) ── */}
      <group position={[0, hoodY, p * 1.5]}>
        <RoundedBox args={[1.8, 0.18, 1.5]} radius={0.06} smoothness={3} position={[0, 0, 1.3]} material={materials.bodyChassis}>
          {/* Neon Hood Racing Stripes */}
          <mesh position={[0, 0.1, 0]} material={materials.neonPinkGlow}>
            <boxGeometry args={[0.3, 0.02, 1.4]} />
          </mesh>
        </RoundedBox>

        {/* Front Twin Laser Headlights */}
        {[-0.7, 0.7].map((x, i) => (
          <mesh key={i} position={[x, 0.02, 2.05]} material={materials.neonCyanGlow}>
            <boxGeometry args={[0.35, 0.06, 0.15]} />
          </mesh>
        ))}

        {p > 0.35 && (
          <Text position={[2.4, 0, 1.3]} fontSize={0.22} color="#38bdf8" anchorX="left" anchorY="middle">
            03. WebGL High-Speed Rendering
          </Text>
        )}
      </group>

      {/* ── 4. REAR CARBON SPOILER & WING (Explodes Rear-Up) ── */}
      <group position={[0, spoilerY, -p * 1.6]}>
        {/* Spoiler Blade */}
        <mesh position={[0, 0.2, -1.85]} material={materials.carbonFiber}>
          <boxGeometry args={[2.3, 0.06, 0.5]} />
        </mesh>
        <mesh position={[0, 0.24, -1.85]} material={materials.neonPinkGlow}>
          <boxGeometry args={[2.2, 0.02, 0.06]} />
        </mesh>

        {/* Spoiler Mount Brackets */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.05, -1.85]} material={materials.carbonFiber}>
            <boxGeometry args={[0.06, 0.3, 0.2]} />
          </mesh>
        ))}

        {/* Rear Neon Taillight Bar */}
        <mesh position={[0, -0.05, -2.15]} material={materials.neonPinkGlow}>
          <boxGeometry args={[1.9, 0.08, 0.05]} />
        </mesh>

        {p > 0.4 && (
          <Text position={[-2.4, 0.2, -1.85]} fontSize={0.22} color="#f59e0b" anchorX="right" anchorY="middle">
            04. Downforce & Conversion SEO
          </Text>
        )}
      </group>

      {/* ── 5. QUANTUM TURBO MOTOR / RACING ENGINE (Central Core) ── */}
      <group position={[0, engineY, -0.7]}>
        {/* Engine Block */}
        <RoundedBox args={[1.2, 0.6, 1.0]} radius={0.08} smoothness={3} material={materials.carbonFiber}>
          {/* Pulsating Quantum Crystal */}
          <mesh ref={engineCoreRef} position={[0, 0.1, 0]}>
            <octahedronGeometry args={[0.35, 1]} />
            <MeshDistortMaterial
              color="#ff007f"
              emissive="#ff007f"
              emissiveIntensity={2.5}
              speed={4}
              distort={0.4}
            />
          </mesh>
        </RoundedBox>

        {/* Twin Turbo Air Intakes */}
        {[-0.45, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.35, 0]} material={materials.wheelRim}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          </mesh>
        ))}

        {p > 0.25 && (
          <Text position={[2.4, 0, -0.7]} fontSize={0.22} color="#a855f7" anchorX="left" anchorY="middle">
            05. Quantum Nitro Engine (Supabase & Isar)
          </Text>
        )}
      </group>

      {/* ── 6. TWIN NITRO EXHAUST BOOSTERS ── */}
      <group position={[0, chassisY, -2.2]}>
        {[-0.4, 0.4].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.carbonFiber}>
              <cylinderGeometry args={[0.12, 0.16, 0.3, 16]} />
            </mesh>
            {/* Nitro Exhaust Flame */}
            <mesh
              ref={i === 0 ? nitroFlameRef1 : nitroFlameRef2}
              position={[0, 0, -0.4]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={materials.nitroFire}
            >
              <coneGeometry args={[0.16, 0.8, 16]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 7. RACING WHEELS & SUSPENSION (Explode Outwards) ── */}
      <group ref={wheelsGroupRef}>
        {/* Front Left */}
        <group position={[-1.15 - wheelsSpreadX, -0.05 + chassisY, 1.3 + wheelsSpreadZ]}>
          <mesh ref={frontLeftWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
            <mesh material={materials.wheelRim}>
              <cylinderGeometry args={[0.26, 0.26, 0.32, 16]} />
            </mesh>
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[1.15 + wheelsSpreadX, -0.05 + chassisY, 1.3 + wheelsSpreadZ]}>
          <mesh ref={frontRightWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
            <mesh material={materials.wheelRim}>
              <cylinderGeometry args={[0.26, 0.26, 0.32, 16]} />
            </mesh>
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-1.18 - wheelsSpreadX, -0.02 + chassisY, -1.3 - wheelsSpreadZ]}>
          <mesh ref={rearLeftWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.45, 0.45, 0.38, 32]} />
            <mesh material={materials.wheelRim}>
              <cylinderGeometry args={[0.28, 0.28, 0.4, 16]} />
            </mesh>
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[1.18 + wheelsSpreadX, -0.02 + chassisY, -1.3 - wheelsSpreadZ]}>
          <mesh ref={rearRightWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.45, 0.45, 0.38, 32]} />
            <mesh material={materials.wheelRim}>
              <cylinderGeometry args={[0.28, 0.28, 0.4, 16]} />
            </mesh>
          </mesh>
        </group>

        {p > 0.3 && (
          <Text position={[-2.4, -0.2, 1.3]} fontSize={0.22} color="#00f5c8" anchorX="right" anchorY="middle">
            06. Flutter 60FPS Cross-Platform Wheels
          </Text>
        )}
      </group>
    </group>
  );
};
