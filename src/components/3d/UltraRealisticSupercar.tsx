'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox, Text } from '@react-three/drei';

interface SupercarProps {
  color?: string;
  explodeProgress?: number; // 0 to 1
  autoRotate?: boolean;
  isNitro?: boolean;
  speed?: number;
  doorsOpen?: boolean;
}

export const UltraRealisticSupercar: React.FC<SupercarProps> = ({
  color = '#dc2626', // Ferrari Rosso Corsa
  explodeProgress = 0,
  autoRotate = false,
  isNitro = false,
  speed = 140,
  doorsOpen = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyShakeRef = useRef<THREE.Group>(null);
  
  // 4 Independent Spinning Wheel Hubs
  const flWheelGroup = useRef<THREE.Group>(null);
  const frWheelGroup = useRef<THREE.Group>(null);
  const rlWheelGroup = useRef<THREE.Group>(null);
  const rrWheelGroup = useRef<THREE.Group>(null);

  // Dihedral Butterfly Doors
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  // Exhaust & Flame Refs
  const exhaustL = useRef<THREE.Mesh>(null);
  const exhaustR = useRef<THREE.Mesh>(null);
  const nitroGlowRef = useRef<THREE.PointLight>(null);

  // Precision Ferrari PBR Materials
  const materials = useMemo(() => {
    return {
      // Ferrari Gloss Clearcoat Metallic Paint
      ferrariPaint: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.94,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 0.98,
      }),
      // Carbon Fiber Aero Trim & Splitters
      matteCarbon: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#07080c'),
        metalness: 0.8,
        roughness: 0.28,
      }),
      // Gloss Black Visor Roof & Canopy
      glossBlackCanopy: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#040508'),
        metalness: 0.9,
        roughness: 0.1,
      }),
      // Deep Tinted Cockpit Glass
      cockpitGlass: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#01040a'),
        transparent: true,
        opacity: 0.72,
        roughness: 0.02,
        transmission: 0.9,
        thickness: 0.9,
        ior: 1.55,
      }),
      // Ferrari Scuderia Yellow Shield Emblem
      scuderiaYellow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fbbf24'),
        metalness: 0.6,
        roughness: 0.2,
      }),
      // Laser LED Projector Headlights
      laserLED: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 5.0,
        toneMapped: false,
      }),
      // Sharp Horizontal DRL Light Blade (Daytona SP3 / SF90 Style)
      drlBlade: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e0f2fe'),
        emissive: new THREE.Color('#00f5c8'),
        emissiveIntensity: 6.0,
        toneMapped: false,
      }),
      // Full-Width Continuous Rear LED Taillight Blade
      taillightBlade: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff0033'),
        emissive: new THREE.Color('#ff0033'),
        emissiveIntensity: 6.0,
        toneMapped: false,
      }),
      // Pirelli High-Performance Rubber Tires
      tireRubber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#08080a'),
        roughness: 0.94,
        metalness: 0.06,
      }),
      // 5-Spoke Star Forged Alloy Rims
      forgedStarAlloy: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f8fafc'),
        metalness: 0.97,
        roughness: 0.08,
      }),
      // Gold / Yellow Brembo Brake Calipers
      bremboCaliper: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f59e0b'),
        metalness: 0.85,
        roughness: 0.2,
      }),
      // Drilled Carbon Ceramic Brake Disc
      drilledBrakeDisc: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#94a3b8'),
        metalness: 0.94,
        roughness: 0.22,
      }),
      // V12 Engine Cylinder Heads & Intakes
      v12Manifold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#c2410c'),
        metalness: 0.9,
        roughness: 0.2,
      }),
      // Titanium Quad Exhaust Tips
      titaniumTip: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38bdf8'),
        metalness: 0.98,
        roughness: 0.15,
      }),
      // Dynamic Nitro Flame Plume
      nitroFlameMat: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00ffff'),
        emissive: new THREE.Color('#ff007f'),
        emissiveIntensity: 7.0,
        transparent: true,
        opacity: 0.9,
      }),
      // Interior Alcantara Racing Cockpit
      alcantaraRed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#991b1b'),
        roughness: 0.88,
        metalness: 0.1,
      }),
    };
  }, [color]);

  // Frame Loop for Real-time Wheel Spin, Engine Vibration, Door Motion, and Flames
  useFrame((state, delta) => {
    // 1. Auto-rotation in stationary state
    if (groupRef.current && autoRotate && explodeProgress < 0.05) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    // 2. High-speed engine vibration & suspension flutter
    if (bodyShakeRef.current) {
      const shakeAmount = isNitro ? 0.005 : (speed > 0 ? 0.002 : 0.0004);
      bodyShakeRef.current.position.y = Math.sin(state.clock.elapsedTime * 35) * shakeAmount;
      bodyShakeRef.current.position.x = Math.cos(state.clock.elapsedTime * 28) * (shakeAmount * 0.5);
    }

    // 3. Active 4-Wheel Spinning Physics (Synchronized with velocity)
    const wheelAngularVelocity = delta * (speed > 0 ? speed * 0.22 : 6);
    if (flWheelGroup.current) flWheelGroup.current.rotation.x += wheelAngularVelocity;
    if (frWheelGroup.current) frWheelGroup.current.rotation.x += wheelAngularVelocity;
    if (rlWheelGroup.current) rlWheelGroup.current.rotation.x += wheelAngularVelocity;
    if (rrWheelGroup.current) rrWheelGroup.current.rotation.x += wheelAngularVelocity;

    // 4. True Dihedral Butterfly Doors Motion (LaFerrari upward/forward scissor angle)
    const targetDoorOpen = (doorsOpen || explodeProgress > 0.1) ? 0.95 : 0;
    if (leftDoorRef.current && rightDoorRef.current) {
      // Left Door swings forward & upward
      leftDoorRef.current.rotation.x = THREE.MathUtils.lerp(leftDoorRef.current.rotation.x, -targetDoorOpen * 0.6, 0.1);
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, targetDoorOpen * 0.5, 0.1);
      leftDoorRef.current.rotation.z = THREE.MathUtils.lerp(leftDoorRef.current.rotation.z, targetDoorOpen * 0.9, 0.1);

      // Right Door swings forward & upward
      rightDoorRef.current.rotation.x = THREE.MathUtils.lerp(rightDoorRef.current.rotation.x, -targetDoorOpen * 0.6, 0.1);
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, -targetDoorOpen * 0.5, 0.1);
      rightDoorRef.current.rotation.z = THREE.MathUtils.lerp(rightDoorRef.current.rotation.z, -targetDoorOpen * 0.9, 0.1);
    }

    // 5. Dynamic Nitro Flame Scale & Exhaust Glow
    if (exhaustL.current && exhaustR.current) {
      const flicker = isNitro ? 1.7 + Math.sin(state.clock.elapsedTime * 45) * 0.4 : (speed > 100 ? 0.5 + Math.sin(state.clock.elapsedTime * 20) * 0.15 : 0.1);
      exhaustL.current.scale.set(flicker, flicker, flicker * (isNitro ? 2.8 : 1.2));
      exhaustR.current.scale.set(flicker, flicker, flicker * (isNitro ? 2.8 : 1.2));
    }

    if (nitroGlowRef.current) {
      nitroGlowRef.current.intensity = isNitro ? 6.5 + Math.sin(state.clock.elapsedTime * 30) * 2.0 : 0;
    }
  });

  const p = explodeProgress;

  // Exploded view layer offsets
  const roofY = 0.38 + p * 2.3;
  const hoodY = 0.1 + p * 1.7;
  const rearDeckY = 0.2 + p * 2.0;
  const engineY = 0.08 + p * 1.3;
  const chassisY = -0.06 - p * 1.1;
  const wheelSpreadX = p * 1.35;

  // Reusable 5-Spoke Star Wheel Component (Matching Reference Photos)
  const render5SpokeWheel = (wheelRef: React.RefObject<THREE.Group | null>, isRightSide: boolean) => {
    return (
      <group>
        {/* Fixed Suspension Hub & Gold Brembo Caliper (Stationary) */}
        <mesh position={[isRightSide ? -0.05 : 0.05, 0.14, 0]} material={materials.bremboCaliper}>
          <boxGeometry args={[0.08, 0.16, 0.22]} />
        </mesh>

        {/* Spinning Wheel Assembly */}
        <group ref={wheelRef}>
          {/* Pirelli Rubber Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.tireRubber}>
            <cylinderGeometry args={[0.36, 0.36, 0.32, 32]} />
          </mesh>

          {/* Drilled Carbon Ceramic Brake Rotor */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.drilledBrakeDisc}>
            <cylinderGeometry args={[0.27, 0.27, 0.03, 32]} />
          </mesh>

          {/* Deep Alloy Rim Lip */}
          <mesh position={[isRightSide ? 0.12 : -0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.forgedStarAlloy}>
            <torusGeometry args={[0.32, 0.035, 16, 32]} />
          </mesh>

          {/* 5 Iconic Star Spokes */}
          {[0, 72, 144, 216, 288].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh
                key={idx}
                position={[isRightSide ? 0.1 : -0.1, Math.cos(rad) * 0.15, Math.sin(rad) * 0.15]}
                rotation={[rad, 0, 0]}
                material={materials.forgedStarAlloy}
              >
                <boxGeometry args={[0.04, 0.26, 0.05]} />
              </mesh>
            );
          })}

          {/* Center Ferrari Wheel Cap */}
          <mesh position={[isRightSide ? 0.15 : -0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.scuderiaYellow}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
          </mesh>
        </group>
      </group>
    );
  };

  return (
    <group ref={groupRef} scale={[1.28, 1.28, 1.28]} position={[0, 0.0, 0]}>
      <group ref={bodyShakeRef}>
        
        {/* ── 1. LOWER CARBON FIBER MONOCOQUE CHASSIS & AERODYNAMIC DIFFUSER ── */}
        <group position={[0, chassisY, 0]}>
          {/* Monocoque Floor Tub */}
          <RoundedBox args={[1.92, 0.16, 4.45]} radius={0.06} smoothness={3} material={materials.matteCarbon}>
            {/* Front Carbon Splitter with Vertical Aero Winglets (SP3 Daytona style) */}
            <group position={[0, -0.06, 2.28]}>
              <mesh material={materials.matteCarbon}>
                <boxGeometry args={[2.14, 0.05, 0.46]} />
              </mesh>
              {[-1.05, 1.05].map((x, i) => (
                <mesh key={i} position={[x, 0.1, 0]} material={materials.matteCarbon}>
                  <boxGeometry args={[0.06, 0.22, 0.42]} />
                </mesh>
              ))}
            </group>

            {/* Rear 4-Fin Racing Diffuser Strakes */}
            <group position={[0, -0.04, -2.24]}>
              <mesh material={materials.matteCarbon}>
                <boxGeometry args={[2.0, 0.14, 0.36]} />
              </mesh>
              {[-0.66, -0.22, 0.22, 0.66].map((x, i) => (
                <mesh key={i} position={[x, -0.04, 0]} material={materials.matteCarbon}>
                  <boxGeometry args={[0.04, 0.18, 0.36]} />
                </mesh>
              ))}
            </group>
          </RoundedBox>

          {p > 0.25 && (
            <Text position={[-2.6, 0, 0]} fontSize={0.22} color="#00f5c8" anchorX="right" anchorY="middle">
              01. Carbon-Titanium Monocoque
            </Text>
          )}
        </group>

        {/* ── 2. SCULPTED FERRARI HOOD, FRONT NOSE BLADE & FENDERS (SP3 Daytona / LaFerrari) ── */}
        <group position={[0, hoodY, p * 1.2]}>
          {/* Main Wedge Nose Hood with Center Aerodynamic S-Duct */}
          <RoundedBox args={[1.88, 0.22, 1.72]} radius={0.08} smoothness={4} position={[0, 0.04, 1.32]} material={materials.ferrariPaint}>
            {/* Center S-Duct Recessed Air Channel */}
            <mesh position={[0, 0.11, 0.1]} material={materials.matteCarbon}>
              <boxGeometry args={[0.64, 0.03, 1.05]} />
            </mesh>
          </RoundedBox>

          {/* Front Fender Muscular Wheel Arches */}
          {[-0.94, 0.94].map((x, idx) => (
            <group key={idx} position={[x, 0.08, 1.45]}>
              <RoundedBox args={[0.24, 0.28, 0.92]} radius={0.06} smoothness={3} material={materials.ferrariPaint} />
            </group>
          ))}

          {/* Horizontal Black Aerodynamic Mouth Blade (SP3 Daytona Style) */}
          <mesh position={[0, -0.01, 2.18]} material={materials.matteCarbon}>
            <boxGeometry args={[1.82, 0.16, 0.22]} />
          </mesh>

          {/* Continuous Laser LED Light Blade spanning the front nose */}
          <mesh position={[0, 0.09, 2.12]} material={materials.drlBlade}>
            <boxGeometry args={[1.72, 0.04, 0.06]} />
          </mesh>

          {/* Sharp Angular Projector Headlight Pods */}
          {[-0.74, 0.74].map((x, i) => (
            <mesh key={i} position={[x, 0.09, 2.14]} material={materials.laserLED}>
              <boxGeometry args={[0.32, 0.06, 0.14]} />
            </mesh>
          ))}

          {/* Yellow Scuderia Ferrari Shield Badges on Fenders */}
          {[-0.98, 0.98].map((x, i) => (
            <mesh key={i} position={[x, 0.12, 0.88]} rotation={[0, x > 0 ? Math.PI / 2 : -Math.PI / 2, 0]} material={materials.scuderiaYellow}>
              <cylinderGeometry args={[0.045, 0.045, 0.01, 16]} />
            </mesh>
          ))}

          {p > 0.35 && (
            <Text position={[2.6, 0.1, 1.32]} fontSize={0.22} color="#fbbf24" anchorX="left" anchorY="middle">
              02. Daytona SP3 Aero Nose & Laser Blade
            </Text>
          )}
        </group>

        {/* ── 3. COCKPIT VISOR CANOPY & DIHEDRAL BUTTERFLY DOORS ── */}
        <group position={[0, roofY, 0]}>
          {/* Black Aerodynamic Visor Canopy */}
          <RoundedBox args={[1.4, 0.42, 1.9]} radius={0.14} smoothness={4} position={[0, 0, -0.08]} material={materials.cockpitGlass}>
            {/* Gloss Black Carbon Roof Spine */}
            <mesh position={[0, 0.22, 0]} material={materials.glossBlackCanopy}>
              <boxGeometry args={[1.16, 0.04, 1.6]} />
            </mesh>
          </RoundedBox>

          {/* Interior Alcantara Racing Seats */}
          {[-0.3, 0.3].map((x, idx) => (
            <group key={idx} position={[x, -0.06, -0.15]}>
              <RoundedBox args={[0.36, 0.38, 0.36]} radius={0.04} smoothness={3} material={materials.alcantaraRed}>
                <mesh position={[0, 0.26, -0.1]} material={materials.alcantaraRed}>
                  <boxGeometry args={[0.3, 0.2, 0.1]} />
                </mesh>
              </RoundedBox>
            </group>
          ))}

          {/* ── LEFT DIHEDRAL BUTTERFLY DOOR (Hinges forward & swings up high) ── */}
          <group position={[-0.84, -0.02, 0.18]} ref={leftDoorRef}>
            <RoundedBox args={[0.18, 0.44, 1.4]} radius={0.06} smoothness={3} material={materials.ferrariPaint}>
              {/* Side Stalk Aerodynamic Mirror */}
              <group position={[-0.12, 0.22, 0.42]}>
                <mesh material={materials.matteCarbon}>
                  <boxGeometry args={[0.16, 0.03, 0.03]} />
                </mesh>
                <mesh position={[-0.1, 0.03, 0]} material={materials.ferrariPaint}>
                  <boxGeometry args={[0.18, 0.08, 0.12]} />
                </mesh>
              </group>
              {/* Carved Side Radiator Intake Scoop */}
              <mesh position={[0.02, -0.05, -0.2]} material={materials.matteCarbon}>
                <boxGeometry args={[0.12, 0.25, 0.5]} />
              </mesh>
            </RoundedBox>
          </group>

          {/* ── RIGHT DIHEDRAL BUTTERFLY DOOR (Hinges forward & swings up high) ── */}
          <group position={[0.84, -0.02, 0.18]} ref={rightDoorRef}>
            <RoundedBox args={[0.18, 0.44, 1.4]} radius={0.06} smoothness={3} material={materials.ferrariPaint}>
              {/* Side Stalk Aerodynamic Mirror */}
              <group position={[0.12, 0.22, 0.42]}>
                <mesh material={materials.matteCarbon}>
                  <boxGeometry args={[0.16, 0.03, 0.03]} />
                </mesh>
                <mesh position={[0.1, 0.03, 0]} material={materials.ferrariPaint}>
                  <boxGeometry args={[0.18, 0.08, 0.12]} />
                </mesh>
              </group>
              {/* Carved Side Radiator Intake Scoop */}
              <mesh position={[-0.02, -0.05, -0.2]} material={materials.matteCarbon}>
                <boxGeometry args={[0.12, 0.25, 0.5]} />
              </mesh>
            </RoundedBox>
          </group>

          {p > 0.45 && (
            <Text position={[-2.6, 0.2, 0]} fontSize={0.22} color="#ec4899" anchorX="right" anchorY="middle">
              03. LaFerrari Dihedral Butterfly Doors
            </Text>
          )}
        </group>

        {/* ── 4. MID-MOUNTED 6.3L V12 HYBRID ENGINE & TITANIUM QUAD EXHAUSTS ── */}
        <group position={[0, engineY, -0.82 - p * 0.5]}>
          {/* Engine Monoblock */}
          <mesh material={materials.matteCarbon}>
            <boxGeometry args={[1.02, 0.38, 1.12]} />
          </mesh>

          {/* Dual Golden V12 Intake Manifolds */}
          {[-0.24, 0.24].map((x, idx) => (
            <group key={idx} position={[x, 0.22, 0]}>
              <mesh material={materials.v12Manifold}>
                <boxGeometry args={[0.2, 0.08, 0.92]} />
              </mesh>
              {/* Intake Trumpets */}
              {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
                <mesh key={i} position={[0, 0.05, z]} material={materials.forgedStarAlloy}>
                  <cylinderGeometry args={[0.028, 0.028, 0.04, 12]} />
                </mesh>
              ))}
            </group>
          ))}

          {/* Center-Exit Quad Titanium Exhaust Tips */}
          <group position={[0, 0.06, -1.22]}>
            {[-0.26, -0.09, 0.09, 0.26].map((x, idx) => (
              <mesh key={idx} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.titaniumTip}>
                <cylinderGeometry args={[0.065, 0.065, 0.26, 16]} />
              </mesh>
            ))}

            {/* Dual Nitro / Turbo Afterburner Flames */}
            <mesh ref={exhaustL} position={[-0.18, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]} material={materials.nitroFlameMat}>
              <coneGeometry args={[0.14, 0.75, 16]} />
            </mesh>
            <mesh ref={exhaustR} position={[0.18, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]} material={materials.nitroFlameMat}>
              <coneGeometry args={[0.14, 0.75, 16]} />
            </mesh>

            {/* Dynamic Nitro Light Point */}
            <pointLight ref={nitroGlowRef} position={[0, 0, -0.55]} color="#00f5c8" distance={6} />
          </group>

          {p > 0.55 && (
            <Text position={[2.6, 0.1, -0.82]} fontSize={0.22} color="#f97316" anchorX="left" anchorY="middle">
              04. 950HP V12 Hybrid Powertrain
            </Text>
          )}
        </group>

        {/* ── 5. REAR ENGINE LOUVERS, GT DUCKTAIL SPOILER & FULL-WIDTH LED BLADE ── */}
        <group position={[0, rearDeckY, -1.32 - p * 0.9]}>
          {/* Sculpted Rear Engine Deck */}
          <RoundedBox args={[1.94, 0.2, 1.58]} radius={0.08} smoothness={4} material={materials.ferrariPaint}>
            {/* Engine Heat Cooling Louvers */}
            {[-0.32, -0.12, 0.08, 0.28].map((z, idx) => (
              <mesh key={idx} position={[0, 0.11, z]} material={materials.matteCarbon}>
                <boxGeometry args={[0.88, 0.02, 0.09]} />
              </mesh>
            ))}
          </RoundedBox>

          {/* Muscular Rear Fender Hips */}
          {[-0.95, 0.95].map((x, idx) => (
            <group key={idx} position={[x, 0.06, -0.05]}>
              <RoundedBox args={[0.24, 0.28, 1.12]} radius={0.06} smoothness={3} material={materials.ferrariPaint} />
            </group>
          ))}

          {/* Continuous Full-Width Horizontal LED Taillight Blade */}
          <mesh position={[0, 0.04, -0.8]} material={materials.taillightBlade}>
            <boxGeometry args={[1.9, 0.05, 0.06]} />
          </mesh>

          {/* Integrated Aerodynamic Rear GT Spoiler */}
          <group position={[0, 0.2, -0.74]}>
            {/* Wing Blade */}
            <mesh material={materials.matteCarbon}>
              <boxGeometry args={[2.04, 0.04, 0.32]} />
            </mesh>
            {/* Wing Pylons */}
            {[-0.52, 0.52].map((x, idx) => (
              <mesh key={idx} position={[x, -0.1, 0]} material={materials.matteCarbon}>
                <boxGeometry args={[0.04, 0.18, 0.2]} />
              </mesh>
            ))}
          </group>

          {p > 0.65 && (
            <Text position={[-2.6, 0.2, -1.32]} fontSize={0.22} color="#ef4444" anchorX="right" anchorY="middle">
              05. Active Aero Wing & LED Blade
            </Text>
          )}
        </group>

        {/* ── 6. 4 INDEPENDENT HIGH-SPEED SPINNING WHEELS (Nestled into Arches) ── */}
        {/* Front-Left Wheel */}
        <group position={[-0.96 - wheelSpreadX, 0.0, 1.45]}>
          {render5SpokeWheel(flWheelGroup, false)}
        </group>

        {/* Front-Right Wheel */}
        <group position={[0.96 + wheelSpreadX, 0.0, 1.45]}>
          {render5SpokeWheel(frWheelGroup, true)}
        </group>

        {/* Rear-Left Wheel */}
        <group position={[-0.98 - wheelSpreadX, 0.0, -1.35]}>
          {render5SpokeWheel(rlWheelGroup, false)}
        </group>

        {/* Rear-Right Wheel */}
        <group position={[0.98 + wheelSpreadX, 0.0, -1.35]}>
          {render5SpokeWheel(rrWheelGroup, true)}
        </group>

        {p > 0.75 && (
          <Text position={[2.6, 0, 1.45]} fontSize={0.22} color="#38bdf8" anchorX="left" anchorY="middle">
            06. Forged 5-Spoke Star Rims & Brembo Calipers
          </Text>
        )}
      </group>
    </group>
  );
};
