import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import aeLogo from '../logo/ae-logo.png';

export default function Hero({ config }) {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-[#0B0B0B] bg-grain bg-grid-pattern">
      {/* Background Lighting & AE Visual Motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#242424]/20 via-[#C8FF00]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Editorial Official AE Logo Overlay Artwork */}
      <div className="absolute right-4 sm:right-16 top-1/3 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block select-none max-w-[420px]">
        <img
          src={aeLogo}
          alt="BLAEZE AE Logo Motif"
          className="w-full h-auto object-contain filter drop-shadow-[0_0_30px_rgba(200,255,0,0.15)]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-8">
        {/* Top Status & Label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-[#242424] pb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#242424]/60 border border-[#242424] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-[#F4F1EB] uppercase">
              {config.heroLabel || 'BLAEZE® — AE / AUTHENTIC EXPRESSION'}
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#929292] tracking-widest uppercase flex items-center gap-2">
            <span>{config.statusLabel || 'THE FIRST CHAPTER — COMING SOON'}</span>
          </div>
        </motion.div>

        {/* Oversized Multiline Editorial Headline */}
        <div className="mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-[#F4F1EB] uppercase select-none"
          >
            <div className="overflow-hidden">
              <span className="block">{config.heroHeadlineLine1 || "NOT MADE"}</span>
            </div>
            <div className="overflow-hidden">
              <span className="block text-[#929292]">{config.heroHeadlineLine2 || "TO FIT IN."}</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">{config.heroHeadlineLine3 || "MADE TO"}</span>
            </div>
            <div className="overflow-hidden pt-1">
              {/* Visual Anchor "EXPRESS." */}
              <span className="inline-block text-[#C8FF00] drop-shadow-[0_0_25px_rgba(200,255,0,0.25)] relative group cursor-default">
                {config.heroHeadlineLine4 || "EXPRESS."}
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#C8FF00] transform scale-x-100 transition-transform duration-500" />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Supporting Copy & Brand Signature */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4 border-t border-[#242424]/80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-6 space-y-4"
          >
            <p className="text-base sm:text-lg text-[#929292] font-normal leading-relaxed max-w-xl">
              {config.heroSubtext || "An independent expression of identity, culture, and streetwear. A new chapter is on its way."}
            </p>
            <div className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase font-bold flex items-center gap-2">
              <Sparkles size={14} />
              <span>{config.brandTagline || "IGNITE YOUR IDENTITY."}</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:col-span-6 flex flex-col sm:flex-row gap-4 md:justify-end"
          >
            <button
              onClick={() => scrollToSection('#launch-updates')}
              className="px-8 py-4 bg-[#F4F1EB] text-[#0B0B0B] font-display font-bold text-xs tracking-widest uppercase hover:bg-[#C8FF00] hover:text-[#0B0B0B] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span>BE FIRST TO KNOW</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection('#philosophy')}
              className="px-8 py-4 bg-transparent border border-[#242424] text-[#F4F1EB] font-mono text-xs tracking-widest uppercase hover:border-[#F4F1EB] hover:bg-[#242424]/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>DISCOVER OUR PHILOSOPHY</span>
              <ArrowDown size={14} className="animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex justify-between items-center text-[10px] font-mono text-[#929292] tracking-widest border-t border-[#242424]/40">
        <span>BLAEZE ANNOUNCEMENT 2026</span>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
