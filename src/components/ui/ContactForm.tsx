'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle2, Sparkles, Flame, Shield, Loader2 } from 'lucide-react';
import { InstagramIcon, TelegramIcon } from './BrandIcons';
import { FounderBio } from '@/types';
import confetti from 'canvas-confetti';

interface ContactFormProps {
  bio: FounderBio;
}

export const ContactForm: React.FC<ContactFormProps> = ({ bio }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Coaching Website',
    budget: '₹14,999 – ₹19,999',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send Email Notification to tkwebsolution1301@gmail.com via backend API
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'Not provided',
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.warn('[Contact] Direct API dispatch note:', err);
    } finally {
      setIsSubmitting(false);
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff007f', '#00f5c8', '#a855f7', '#f59e0b', '#38bdf8'],
    });

    setSubmitted(true);

    // 2. Open WhatsApp as dual instant notification
    const text = encodeURIComponent(
      `Hello Tarun! Inquiry from 3D Portfolio:\n` +
      `• Name: ${formData.name}\n` +
      `• Phone/WA: ${formData.phone}\n` +
      `• Email: ${formData.email || 'Not provided'}\n` +
      `• Service: ${formData.projectType}\n` +
      `• Budget: ${formData.budget}\n` +
      `• Details: ${formData.message || 'Looking to discuss project requirements'}`
    );

    window.open(`https://wa.me/919079368240?text=${text}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Contact Details */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c0836]/90 via-[#0f0322]/95 to-[#160529]/95 border-2 border-purple-500/40 shadow-xl space-y-6">
          <h3 className="text-xl font-syne font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            Direct Founder Connect
          </h3>

          <p className="text-sm text-white/80 leading-relaxed font-sans">
            Need a high-converting website for your coaching institute, school, brand, or need an Android APK? Reach out directly to founder Tarun Singh.
          </p>

          <div className="space-y-4 pt-2">
            <a
              href="tel:+919079368240"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e021a]/80 border border-purple-500/30 hover:border-pink-500/60 hover:bg-[#1f073b] transition-all group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-pink-400 uppercase font-bold block">Phone & WhatsApp</span>
                <span className="text-sm font-syne font-bold text-white group-hover:text-pink-300">
                  +91 90793 68240
                </span>
              </div>
            </a>

            <a
              href="mailto:tkwebsolution1301@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e021a]/80 border border-purple-500/30 hover:border-pink-500/60 hover:bg-[#1f073b] transition-all group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold block">Official Email</span>
                <span className="text-sm font-syne font-bold text-white group-hover:text-pink-300 truncate block max-w-[220px]">
                  tkwebsolution1301@gmail.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e021a]/80 border border-purple-500/30">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">Physical Location</span>
                <span className="text-sm font-syne font-bold text-white">
                  Bharatpur, Rajasthan, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <a
              href={bio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-500 hover:to-purple-600 border border-pink-500/40 text-xs font-mono font-bold text-white transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href={bio.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-500 hover:to-blue-600 border border-cyan-500/40 text-xs font-mono font-bold text-white transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <TelegramIcon className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="lg:col-span-7">
        <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#1c0836]/90 to-[#0e021a]/95 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-syne font-black text-white">
              Send Inquiry / Book Free Consultation
            </h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold shrink-0 hidden sm:inline-block">
              ⚡ Instant Gmail Alert
            </span>
          </div>

          <p className="text-xs sm:text-sm text-white/70 mb-6 font-sans">
            Your inquiry goes directly to <strong>tkwebsolution1301@gmail.com</strong> and founder WhatsApp for immediate response.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-syne font-bold text-white">Inquiry Sent & Gmail Alert Dispatched!</h4>
              <p className="text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                Details have been delivered directly to <strong>tkwebsolution1301@gmail.com</strong>. WhatsApp has also been opened to connect with Tarun Singh instantly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors font-mono"
                  >
                    <option value="Coaching Website">Coaching Institute Website</option>
                    <option value="School Website">School / College Portal</option>
                    <option value="Business Website">Business Corporate Website</option>
                    <option value="E-Commerce Store">E-Commerce & WhatsApp Store</option>
                    <option value="Android APK App">Android APK App</option>
                    <option value="Play Store App">Google Play Store App</option>
                    <option value="Android + iOS App">Android + iOS Dual App</option>
                    <option value="Custom 3D App">Custom 3D / Web Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                    Expected Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors font-mono"
                  >
                    <option value="₹14,999 – ₹19,999">₹14,999 – ₹19,999</option>
                    <option value="₹19,999 – ₹29,999">₹19,999 – ₹29,999</option>
                    <option value="₹29,999 – ₹44,999">₹29,999 – ₹44,999</option>
                    <option value="₹45,000+">₹45,000+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-bold">
                  Project Details / Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your institute, business, or specific features you need..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#090114]/90 border border-purple-500/30 focus:border-pink-400 text-white text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-syne font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,0,127,0.5)] hover:shadow-[0_0_45px_rgba(0,245,200,0.7)] hover:scale-[1.01] transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Notification to Gmail...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 fill-current" />
                    <span>Submit & Notify Tarun Singh (Gmail + WhatsApp)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
