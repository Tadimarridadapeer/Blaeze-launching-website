import React from 'react';
import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 sm:py-36 px-6 sm:px-12 bg-[#0B0B0B] border-t border-[#242424] relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase font-semibold">SECTION 01</span>
          <div className="h-[1px] w-12 bg-[#C8FF00]" />
          <span className="text-xs font-mono tracking-widest text-[#929292] uppercase">BRAND PHILOSOPHY</span>
        </motion.div>

        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EB] tracking-tight uppercase leading-[1.1] mb-8">
              STYLE IS PERSONAL.<br />
              <span className="text-[#C8FF00] italic font-serif tracking-normal">EXPRESSION IS EVERYTHING.</span>
            </h2>

            <div className="inline-block px-4 py-2 bg-[#242424]/80 border border-[#242424] mb-8">
              <span className="text-xs font-mono font-bold tracking-widest text-[#F4F1EB] uppercase">
                AE — AUTHENTIC EXPRESSION
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 text-[#929292] text-base sm:text-lg leading-relaxed border-l border-[#242424] pl-6 sm:pl-8"
          >
            <p>
              <strong className="text-[#F4F1EB] font-semibold">BLAEZE</strong> was imagined for people who define themselves on their own terms. We believe personal style is not about following every trend.
            </p>
            <p>
              It is about owning your identity, embracing your individuality, and expressing it without permission.
            </p>
            <div className="pt-6 border-t border-[#242424]/60">
              <p className="text-xs font-mono text-[#F4F1EB] uppercase tracking-widest">
                “Clothing is more than what you wear. It is how you express who you are.”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
