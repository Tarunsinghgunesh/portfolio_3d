'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text, RoundedBox } from '@react-three/drei';

interface SupercarModelProps {
  color?: string; // 'red' | 'gold' | 'cyan' | 'purple' | 'black'
  explodeProgress?: number; // 0 (assembled) to 1 (fully exploded)
  autoRotate?: boolean;
  isHeadlightsOn?: boolean;
  speed?: number;
}

export const LamborghiniFerrariModel: React.FC<SupercarModelProps> = ({
  color = '#ff1744', // Ferrari Rosso Corsa default
  explodeProgress = 0,
  autoRotate = true,
  isHeadlightsOn = true,
  speed = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const frontLeftWheel = useRef<THREE.Mesh>(null);
  const frontRightWheel = useRef<THREE.Mesh>(null);
  const rearLeftWheel = useRef<THREE.Mesh>(null);
  const rearRightWheel = useRef<THREE.Mesh>(null);
  const doorLeftRef = useRef<THREE.Group>(null);
  const doorRightRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      carPaint: new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.88,
        roughness: 0.18,
      }),
      carbonFiber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#111318'),
        metalness: 0.7,
        roughness: 0.35,
      }),
      tintedGlass: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1e1b4b'),
        transparent: true,
        opacity: 0.6,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 0.8,
        ior: 1.5,
      }),
      headlights: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00f5c8'),
        emissive: new THREE.Color('#00f5c8'),
        emissiveIntensity: isHeadlightsOn ? 4.0 : 0.5,
      }),
      taillights: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff0055'),
        emissive: new THREE.Color('#ff0055'),
        emissiveIntensity: 3.5,
      }),
      wheelRubber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#09090b'),
        roughness: 0.85,
      }),
      alloyRim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e2e8f0'),
        metalness: 0.95,
        roughness: 0.1,
      }),
      brakeCaliper: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fbbf24'),
        metalness: 0.8,
        roughness: 0.2,
      }),
      engineV12: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ea580c'),
        metalness: 0.85,
        roughness: 0.3,
      }),
      neonUnderglow: new THREE.MeshStandardMaterial({
        color: new THREE.Color(color === '#ff1744' ? '#ff0055' : '#00f5c8'),
        emissive: new THREE.Color(color === '#ff1744' ? '#ff0055' : '#00f5c8'),
        emissiveIntensity: 3.0,
      }),
    };
  }, [color, isHeadlightsOn]);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate && explodeProgress < 0.05) {
      groupRef.current.rotation.y += delta * 0.4;
    }

    // Wheel spin when speed is positive
    const rotSpeed = delta * (speed > 0 ? speed * 0.2 : 4);
    if (frontLeftWheel.current) frontLeftWheel.current.rotation.x += rotSpeed;
    if (frontRightWheel.current) frontRightWheel.current.rotation.x += rotSpeed;
    if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += rotSpeed;
    if (rearRightWheel.current) rearRightWheel.current.rotation.x += rotSpeed;

    // Scissor Doors opening when exploded
    if (doorLeftRef.current && doorRightRef.current) {
      doorLeftRef.current.rotation.z = THREE.MathUtils.lerp(doorLeftRef.current.rotation.z, explodeProgress * 0.8, 0.1);
      doorRightRef.current.rotation.z = THREE.MathUtils.lerp(doorRightRef.current.rotation.z, -explodeProgress * 0.8, 0.1);
    }
  });

  const p = explodeProgress;

  // Layer offsets
  const roofY = 0.52 + p * 2.6;
  const hoodY = 0.22 + p * 1.8;
  const spoilerY = 0.58 + p * 2.8;
  const engineY = 0.15 + p * 1.4;
  const floorY = -0.15 - p * 1.2;
  const wheelsSpreadX = p * 1.4;
  const wheelsSpreadZ = p * 1.0;

  return (
    <group ref={groupRef} scale={[1.25, 1.25, 1.25]} position={[0, -0.2, 0]}>
      {/* ── 1. LOWER CARBON MONOCOQUE CHASSIS & AERODYNAMIC UNDERBODY ── */}
      <group position={[0, floorY, 0]}>
        {/* Main Floor Plate */}
        <RoundedBox args={[2.0, 0.18, 4.4]} radius={0.06} smoothness={3} material={materials.carbonFiber}>
          {/* Neon Underglow Strip */}
          <mesh position={[0, -0.1, 0]} material={materials.neonUnderglow}>
            <boxGeometry args={[1.8, 0.02, 4.0]} />
          </mesh>
        </RoundedBox>

        {/* Aggressive Front Splitter with Wings */}
        <group position={[0, -0.06, 2.2]}>
          <mesh material={materials.carbonFiber}>
            <boxGeometry args={[2.1, 0.05, 0.4]} />
          </mesh>
          {[-1.0, 1.0].map((x, i) => (
            <mesh key={i} position={[x, 0.08, 0]} material={materials.carbonFiber}>
              <boxGeometry args={[0.08, 0.18, 0.35]} />
            </mesh>
          ))}
        </group>

        {/* Rear Aerodynamic Diffuser Fins */}
        <group position={[0, -0.04, -2.15]}>
          <mesh material={materials.carbonFiber}>
            <boxGeometry args={[1.9, 0.12, 0.3]} />
          </mesh>
          {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
            <mesh key={i} position={[x, -0.02, 0]} material={materials.carbonFiber}>
              <boxGeometry args={[0.04, 0.16, 0.32]} />
            </mesh>
          ))}
        </group>

        {p > 0.25 && (
          <Text position={[-2.4, 0, 0]} fontSize={0.22} color="#00f5c8" anchorX="right" anchorY="middle">
            01. Carbon Monocoque Chassis
          </Text>
        )}
      </group>

      {/* ── 2. SCULPTED LAMBORGHINI / FERRARI HOOD & FRONT FENDERS (Explodes Up/Forward) ── */}
      <group position={[0, hoodY, p * 1.2]}>
        {/* Low Slung Slanted Hood */}
        <RoundedBox args={[1.85, 0.22, 1.6]} radius={0.08} smoothness={4} position={[0, 0.05, 1.25]} material={materials.carPaint}>
          {/* Dual Aerodynamic Hood Air Scoops */}
          {[-0.35, 0.35].map((x, i) => (
            <mesh key={i} position={[x, 0.12, 0]} material={materials.carbonFiber}>
              <boxGeometry args={[0.2, 0.03, 0.8]} />
            </mesh>
          ))}
        </RoundedBox>

        {/* Sharp Iconic Y-Shaped Laser Headlights */}
        {[-0.7, 0.7].map((x, i) => (
          <group key={i} position={[x, 0.08, 1.98]}>
            <mesh material={materials.headlights}>
              <boxGeometry args={[0.32, 0.06, 0.15]} />
            </mesh>
            {/* Projector Lens */}
            <mesh position={[0, 0, 0.08]} material={materials.headlights}>
              <sphereGeometry args={[0.05, 16, 16]} />
            </mesh>
          </group>
        ))}

        {p > 0.35 && (
          <Text position={[2.4, 0.1, 1.25]} fontSize={0.22} color="#fbbf24" anchorX="left" anchorY="middle">
            02. Aerodynamic Frontend Architecture
          </Text>
        )}
      </group>

      {/* ── 3. COCKPIT CANOPY & TINTED WINDSHIELD (Explodes Up) ── */}
      <group position={[0, roofY, 0]}>
        {/* Sleek Low Roofline */}
        <RoundedBox args={[1.4, 0.42, 1.8]} radius={0.12} smoothness={4} position={[0, 0, -0.1]} material={materials.tintedGlass}>
          {/* Top Carbon Roof Spine */}
          <mesh position={[0, 0.22, 0]} material={materials.carbonFiber}>
            <boxGeometry args={[1.1, 0.04, 1.5]} />
          </mesh>
        </RoundedBox>

        {/* Interior Sport Steering & Digital Cockpit */}
        <mesh position={[0.3, 0.05, 0.4]} rotation={[Math.PI / 4, 0, 0]} material={materials.carbonFiber}>
          <torusGeometry args={[0.12, 0.02, 16, 32]} />
        </mesh>
        <mesh position={[0, 0.08, 0.45]} rotation={[-Math.PI / 6, 0, 0]}>
          <planeGeometry args={[0.6, 0.2]} />
          <meshBasicMaterial color="#00f5c8" />
        </mesh>

        {p > 0.4 && (
          <Text position={[-2.4, 0, 0]} fontSize={0.22} color="#ff007f" anchorX="right" anchorY="middle">
            03. Next.js Full-Stack Cockpit
          </Text>
        )}
      </group>

      {/* ── 4. SCISSOR DOORS (Open / Pivot upwards) ── */}
      <group position={[-0.95, 0.15 + floorY, 0.1]} ref={doorLeftRef}>
        <RoundedBox args={[0.15, 0.45, 1.3]} radius={0.04} smoothness={3} material={materials.carPaint}>
          {/* Side Air Intake Scoop */}
          <mesh position={[-0.08, -0.05, -0.2]} material={materials.carbonFiber}>
            <boxGeometry args={[0.06, 0.25, 0.45]} />
          </mesh>
        </RoundedBox>
      </group>

      <group position={[0.95, 0.15 + floorY, 0.1]} ref={doorRightRef}>
        <RoundedBox args={[0.15, 0.45, 1.3]} radius={0.04} smoothness={3} material={materials.carPaint}>
          {/* Side Air Intake Scoop */}
          <mesh position={[0.08, -0.05, -0.2]} material={materials.carbonFiber}>
            <boxGeometry args={[0.06, 0.25, 0.45]} />
          </mesh>
        </RoundedBox>
      </group>

      {/* ── 5. V12 MID-ENGINE QUANTUM CORE (Central Powerplant) ── */}
      <group position={[0, engineY, -0.85]}>
        {/* V12 Engine Block */}
        <RoundedBox args={[1.2, 0.55, 1.1]} radius={0.08} smoothness={3} material={materials.carbonFiber}>
          {/* Dual Red Valve Cylinder Heads */}
          {[-0.35, 0.35].map((x, i) => (
            <mesh key={i} position={[x, 0.3, 0]} material={materials.engineV12}>
              <boxGeometry args={[0.3, 0.12, 0.9]} />
            </mesh>
          ))}
          {/* Intake Plenum Runner Pipes */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <mesh key={idx} position={[0, 0.36, -0.38 + idx * 0.15]} rotation={[0, 0, Math.PI / 2]} material={materials.alloyRim}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
            </mesh>
          ))}
        </RoundedBox>

        {p > 0.3 && (
          <Text position={[2.4, 0, -0.85]} fontSize={0.22} color="#ea580c" anchorX="left" anchorY="middle">
            04. High-Performance V12 Cloud Engine
          </Text>
        )}
      </group>

      {/* ── 6. REAR SPOILER, DIFFUSER & QUAD EXHAUSTS (Explodes Rear) ── */}
      <group position={[0, spoilerY, -p * 1.5]}>
        {/* Carbon Wing Blade */}
        <mesh position={[0, 0.26, -1.9]} material={materials.carbonFiber}>
          <boxGeometry args={[2.2, 0.05, 0.45]} />
        </mesh>
        {/* Endplate Winglets */}
        {[-1.08, 1.08].map((x, i) => (
          <mesh key={i} position={[x, 0.32, -1.9]} material={materials.carPaint}>
            <boxGeometry args={[0.04, 0.18, 0.48]} />
          </mesh>
        ))}

        {/* Iconic Horizontal LED Taillight Bar */}
        <mesh position={[0, -0.02, -2.18]} material={materials.taillights}>
          <boxGeometry args={[1.85, 0.06, 0.05]} />
        </mesh>

        {/* Quad Polished Chrome Exhaust Tips */}
        {[-0.45, -0.25, 0.25, 0.45].map((x, i) => (
          <mesh key={i} position={[x, -0.15, -2.2]} rotation={[Math.PI / 2, 0, 0]} material={materials.alloyRim}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          </mesh>
        ))}

        {p > 0.35 && (
          <Text position={[-2.4, 0.2, -1.9]} fontSize={0.22} color="#ff0055" anchorX="right" anchorY="middle">
            05. Quad Exhaust & SEO Downforce
          </Text>
        )}
      </group>

      {/* ── 7. ALLOY WHEELS & BREMBO CALIPERS (Explode Outwards) ── */}
      <group>
        {/* Front Left */}
        <group position={[-1.05 - wheelsSpreadX, -0.05 + floorY, 1.25 + wheelsSpreadZ]}>
          <mesh ref={frontLeftWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 32]} />
            <mesh material={materials.alloyRim}>
              <cylinderGeometry args={[0.28, 0.28, 0.29, 16]} />
            </mesh>
          </mesh>
          {/* Yellow Brake Caliper */}
          <mesh position={[0.02, 0.15, 0]} material={materials.brakeCaliper}>
            <boxGeometry args={[0.06, 0.14, 0.1]} />
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[1.05 + wheelsSpreadX, -0.05 + floorY, 1.25 + wheelsSpreadZ]}>
          <mesh ref={frontRightWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 32]} />
            <mesh material={materials.alloyRim}>
              <cylinderGeometry args={[0.28, 0.28, 0.29, 16]} />
            </mesh>
          </mesh>
          <mesh position={[-0.02, 0.15, 0]} material={materials.brakeCaliper}>
            <boxGeometry args={[0.06, 0.14, 0.1]} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-1.08 - wheelsSpreadX, -0.02 + floorY, -1.25 - wheelsSpreadZ]}>
          <mesh ref={rearLeftWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
            <mesh material={materials.alloyRim}>
              <cylinderGeometry args={[0.3, 0.3, 0.36, 16]} />
            </mesh>
          </mesh>
          <mesh position={[0.02, 0.16, 0]} material={materials.brakeCaliper}>
            <boxGeometry args={[0.06, 0.16, 0.12]} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[1.08 + wheelsSpreadX, -0.02 + floorY, -1.25 - wheelsSpreadZ]}>
          <mesh ref={rearRightWheel} rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber}>
            <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
            <mesh material={materials.alloyRim}>
              <cylinderGeometry args={[0.3, 0.3, 0.36, 16]} />
            </mesh>
          </mesh>
          <mesh position={[-0.02, 0.16, 0]} material={materials.brakeCaliper}>
            <boxGeometry args={[0.06, 0.16, 0.12]} />
          </mesh>
        </group>

        {p > 0.3 && (
          <Text position={[-2.4, -0.2, 1.25]} fontSize={0.22} color="#00f5c8" anchorX="right" anchorY="middle">
            06. Flutter 60FPS Native Traction
          </Text>
        )}
      </group>
    </group>
  );
};
