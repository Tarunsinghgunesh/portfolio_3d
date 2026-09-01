'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { UltraRealisticSupercar } from './UltraRealisticSupercar';
import { NeonHighwayTrack } from './NeonHighwayTrack';
import { Flame, Gauge, Sliders, Zap, Sparkles, DoorOpen, RotateCcw, Play, Pause, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CyberCarCanvasProps {
  scrollSync?: boolean;
}

export const CyberCarCanvas: React.FC<CyberCarCanvasProps> = () => {
  const [explodeProgress, setExplodeProgress] = useState(0); // Default to fully assembled real supercar
  const [speed, setSpeed] = useState(160);
  const [isDriving, setIsDriving] = useState(true);
  const [isNitro, setIsNitro] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [cameraView, setCameraView] = useState<'dynamic' | 'front' | 'side' | 'top'>('dynamic');
  const [selectedPaint, setSelectedPaint] = useState('#dc2626'); // Ferrari Rosso Corsa Red
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNitro = () => {
    setIsNitro(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00ffff', '#ec4899', '#f59e0b', '#dc2626', '#ffffff'],
    });
    setTimeout(() => {
      setIsNitro(false);
    }, 4000);
  };

  const getCameraPosition = (): [number, number, number] => {
    if (cameraView === 'front') return [0, 1.2, 6.8];
    if (cameraView === 'side') return [7.2, 1.4, 0.2];
    if (cameraView === 'top') return [0, 9.2, 0.8];
    return [4.6, 1.8, 5.2]; // Clean 3/4 Studio Hero Stance
  };

  const paintOptions = [
    { name: 'Rosso Corsa Red', hex: '#dc2626' },
    { name: 'Giallo Modena Gold', hex: '#f59e0b' },
    { name: 'Bianco Avus Cream', hex: '#fef3c7' }, // Cream like in the second photo!
    { name: 'Blu Elettrico Cyan', hex: '#0284c7' },
    { name: 'Nero Daytona Black', hex: '#09090b' },
  ];

  if (!isMounted) {
    return (
      <div className="w-full h-[580px] rounded-3xl bg-[#0d031c] border border-pink-500/30 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[680px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f0322] via-[#05010e] to-[#14052e] border-2 border-pink-500/40 shadow-[0_0_80px_rgba(255,0,127,0.25)] group"
    >
      {/* ── TOP HYPERCAR RACING CONTROLS HUD ── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Badge & Model */}
        <div className="flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-500/40 pointer-events-auto shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
          <span className="font-mono text-xs font-black tracking-wider text-pink-400">
            🏎️ ITALIAN V12 HYPERCAR • WHEELS ACTIVE
          </span>
        </div>

        {/* Real-time Customization Bar */}
        <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
          
          {/* Paint Swatches */}
          <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
            {paintOptions.map((p) => (
              <button
                key={p.hex}
                onClick={() => setSelectedPaint(p.hex)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedPaint === p.hex ? 'scale-125 border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: p.hex }}
                title={p.name}
              />
            ))}
          </div>

          {/* Butterfly Doors Toggle */}
          <button
            onClick={() => setDoorsOpen(!doorsOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-2xl border transition-all ${
              doorsOpen
                ? 'bg-pink-500 text-white font-bold border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]'
                : 'bg-black/85 text-white/80 border-white/10 hover:border-pink-500/50 hover:text-white'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5 text-yellow-300" />
            <span>{doorsOpen ? 'Doors Open 🦋' : 'Open Doors'}</span>
          </button>

          {/* Camera Selector */}
          <div className="flex items-center bg-black/85 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            {(['dynamic', 'front', 'side', 'top'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setCameraView(mode)}
                className={`px-2.5 py-1 text-xs font-mono uppercase rounded-xl transition-all ${
                  cameraView === mode ? 'bg-cyan-400 text-black font-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Nitro Button */}
          <button
            onClick={triggerNitro}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-xl ${
              isNitro
                ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 text-black animate-pulse scale-105 shadow-[0_0_30px_rgba(0,255,255,0.9)]'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:scale-105 shadow-[0_0_20px_rgba(255,0,127,0.5)]'
            }`}
          >
            <Flame className={`w-4 h-4 ${isNitro ? 'animate-bounce text-yellow-300 fill-current' : 'fill-current'}`} />
            <span>{isNitro ? 'NITRO ON!' : 'NITRO BOOST'}</span>
          </button>
        </div>
      </div>

      {/* ── 3D CANVAS WITH REALISTIC RACING DYNAMICS ── */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={getCameraPosition()} fov={42} />
          
          {/* Dynamic Studio Lighting with Clear Reflections */}
          <ambientLight intensity={1.3} />
          <directionalLight position={[10, 20, 12]} intensity={3.5} color="#ffffff" />
          <directionalLight position={[-12, 12, 8]} intensity={2.0} color="#38bdf8" />
          <pointLight position={[-6, 4, 4]} intensity={6.0} color="#dc2626" />
          <pointLight position={[6, 4, 4]} intensity={5.5} color="#00f5c8" />
          <pointLight position={[0, -2, -6]} intensity={4.5} color="#a855f7" />

          <Suspense fallback={null}>
            <UltraRealisticSupercar
              color={isNitro ? '#00f5c8' : selectedPaint}
              explodeProgress={explodeProgress}
              autoRotate={false}
              isNitro={isNitro}
              speed={isDriving ? (isNitro ? 260 : speed) : 0}
              doorsOpen={doorsOpen}
            />
            <NeonHighwayTrack speed={isDriving ? (isNitro ? 260 : speed) : 0} isNitro={isNitro} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            target={[0, 0.15, 0]}
            minDistance={3.5}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* ── SPEEDOMETER & EXPLODED VIEW SCRUBBER HUD ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/85 backdrop-blur-2xl p-4 rounded-3xl border border-pink-500/30 shadow-2xl">
        
        {/* Speedometer Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-pink-400">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[10px] font-mono text-white/50 block uppercase font-bold">V12 Hypercar Velocity</span>
              <span className="text-xl sm:text-2xl font-syne font-black text-white">
                {isDriving ? (isNitro ? '355' : Math.round(speed * 1.6)) : '0'}{' '}
                <span className="text-xs font-mono text-pink-400 font-bold">KM/H</span>
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div>
            <span className="text-[10px] font-mono text-white/50 block uppercase font-bold">Wheel Status</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isDriving ? 'Pirelli 4-Wheel High Spin' : 'Wheels Stationary'}</span>
            </span>
          </div>
        </div>

        {/* Exploded View Scrubber Slider */}
        <div className="flex items-center gap-3 w-full md:w-64">
          <span className="text-[10px] font-mono text-white/40 font-bold">RACE</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explodeProgress}
            onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
            className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
          />
          <span className="text-[10px] font-mono text-white/40 font-bold">EXPLODE</span>
        </div>

        {/* Quick Action Presets */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setIsDriving(!isDriving)}
            className={`px-3 py-1.5 text-xs font-mono rounded-xl border transition-all flex items-center gap-1.5 font-bold ${
              isDriving ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-white/10 text-white/80 border-white/10'
            }`}
          >
            {isDriving ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isDriving ? 'Pause Drive' : 'Drive'}</span>
          </button>

          <button
            onClick={() => {
              setExplodeProgress(0);
              setDoorsOpen(false);
            }}
            className="px-3 py-1.5 text-xs font-mono rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all font-semibold"
          >
            Assembled
          </button>
          
          <button
            onClick={() => setExplodeProgress(1.0)}
            className="px-3.5 py-1.5 text-xs font-mono rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(255,0,127,0.4)] hover:scale-105 transition-all"
          >
            Full Explode
          </button>
        </div>
      </div>
    </div>
  );
};
