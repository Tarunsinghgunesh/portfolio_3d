'use client';

import React, { useState } from 'react';
import { defaultFullData } from '@/lib/defaultData';
import { ScrapedDataResponse } from '@/types';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { Exploded3DSection } from '@/components/sections/Exploded3DSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { AboutFounderSection } from '@/components/sections/AboutFounderSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/ui/Footer';

export default function HomePage() {
  const [data, setData] = useState<ScrapedDataResponse>(defaultFullData);
  const [loading, setLoading] = useState(false);

  const fetchUpdatedData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sync-data');
      if (res.ok) {
        const liveData = await res.json();
        setData(liveData);
      }
    } catch (err) {
      // silent fallback to default verified data
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070114] text-white selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
      {/* ── Dynamic Ultra-Colorful Background Aura Gradients ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-pink-600/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[170px]" />
        <div className="absolute top-2/3 left-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-[150px]" />
      </div>

      {/* Dynamic Navigation */}
      <Navbar
        isLiveSynced={data.isLiveSynced}
        lastSyncedAt={data.lastSyncedAt}
        onRefreshData={fetchUpdatedData}
      />

      {/* 01. Cinematic Hero Section with Founder Live Coding Studio */}
      <HeroSection bio={data.bio} />

      {/* 02. Cinema-Quality 3D Italian V12 Supercar on High-Speed Neon Track */}
      <Exploded3DSection />

      {/* 03. Specialized Digital Capabilities & Services */}
      <ServicesSection services={data.services} />

      {/* 04. 100% Real Live Projects & Mobile Applications (Featuring Luna App Live Launch) */}
      <PortfolioSection projects={data.projects} />

      {/* 05. Fixed Pricing Packages & Interactive Cost Calculator */}
      <PricingSection pricingPlans={data.pricingPlans} phone={data.bio.phone} />

      {/* 06. Founder Profile & Engineering Manifesto */}
      <AboutFounderSection bio={data.bio} />

      {/* 07. Direct Founder Contact & Collaboration */}
      <ContactSection bio={data.bio} />

      {/* 08. Footer with verified links & sitemap */}
      <Footer bio={data.bio} />
    </main>
  );
}
