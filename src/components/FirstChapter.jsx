import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VisualMotif from './VisualMotif';
import aeLogo from '../logo/ae-logo.png';

export default function FirstChapter({ config }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    if (!config?.showCountdown || !config?.launchDate) {
      setIsConfigured(false);
      return;
    }

    const targetTime = new Date(config.launchDate).getTime();
    if (isNaN(targetTime)) {
      setIsConfigured(false);
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsConfigured(false);
        return;
      }

      setIsConfigured(true);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config?.launchDate, config?.showCountdown]);

  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 bg-[#0B0B0B] border-t border-[#242424] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase font-semibold">SECTION 03</span>
          <div className="h-[1px] w-12 bg-[#C8FF00]" />
          <span className="text-xs font-mono tracking-widest text-[#929292] uppercase">THE FIRST CHAPTER</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F4F1EB] uppercase tracking-tight leading-none">
              WE'RE JUST<br />
              <span className="text-[#929292]">GETTING STARTED.</span>
            </h2>

            <p className="text-base sm:text-xl text-[#929292] font-normal leading-relaxed max-w-xl">
              The first expression of <span className="text-[#F4F1EB] font-semibold">BLAEZE</span> is taking shape. Stay close. Something different is coming.
            </p>

            {/* Countdown Display OR Launching Soon Badge */}
            <div className="pt-6 border-t border-[#242424]">
              <span className="text-xs font-mono tracking-widest text-[#929292] uppercase block mb-4">
                {isConfigured ? 'LAUNCH COUNTDOWN' : 'CURRENT STATUS'}
              </span>

              {isConfigured ? (
                <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-lg">
                  {[
                    { label: 'DAYS', val: timeLeft.days },
                    { label: 'HOURS', val: timeLeft.hours },
                    { label: 'MINS', val: timeLeft.minutes },
                    { label: 'SECS', val: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="bg-[#242424]/40 border border-[#242424] p-4 text-center">
                      <span className="font-mono text-3xl sm:text-5xl font-bold text-[#F4F1EB] block leading-none">
                        {String(unit.val).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono text-[#C8FF00] tracking-widest mt-2 block">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#242424]/60 border border-[#C8FF00]/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF00] animate-pulse" />
                  <span className="font-mono font-bold text-lg text-[#F4F1EB] tracking-widest uppercase">
                    LAUNCHING SOON.
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Canvas AE Emblem & Official Brand Logo Motif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-[#242424]/20 border border-[#242424] p-6 relative flex flex-col justify-between overflow-hidden"
          >
            <div className="flex justify-between items-center text-[10px] font-mono text-[#929292] mb-4">
              <span>MOTIF ID: AE-01</span>
              <span>OFFICIAL BRAND LOGO</span>
            </div>
            
            <div className="relative my-4 flex items-center justify-center">
              <VisualMotif />
              <img
                src={aeLogo}
                alt="BLAEZE AE Official Logo"
                className="absolute w-36 sm:w-44 h-auto object-contain opacity-85 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_20px_rgba(200,255,0,0.2)]"
              />
            </div>

            <div className="text-center pt-4 border-t border-[#242424]/60">
              <span className="text-xs font-mono text-[#F4F1EB] tracking-widest uppercase font-bold">
                BLAEZE — AE / 2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
