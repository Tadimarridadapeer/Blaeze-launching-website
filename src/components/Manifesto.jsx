import React from 'react';
import { motion } from 'framer-motion';

export default function Manifesto() {
  const statements = [
    {
      number: "01",
      title: "BE UNAPOLOGETICALLY YOU.",
      subtitle: "REJECT CONFORMITY",
      description: "Wear your truth. Your identity is your strength, not a compromise."
    },
    {
      number: "02",
      title: "BREAK THE EXPECTED.",
      subtitle: "DEFY TRADITION",
      description: "Streetwear evolved beyond boundaries. Unfiltered, contemporary, independent."
    },
    {
      number: "03",
      title: "IGNITE YOUR IDENTITY.",
      subtitle: "OWN YOUR STORY",
      description: "Clothing as an amplifier of your spirit. Spark a new chapter of expression."
    }
  ];

  return (
    <section id="manifesto" className="py-24 sm:py-36 px-6 sm:px-12 bg-[#0B0B0B] border-t border-[#242424] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase font-semibold">SECTION 02</span>
          <div className="h-[1px] w-12 bg-[#C8FF00]" />
          <span className="text-xs font-mono tracking-widest text-[#929292] uppercase">THE AE MANIFESTO</span>
        </motion.div>

        {/* Manifesto Statements List */}
        <div className="divide-y divide-[#242424]">
          {statements.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center group cursor-default transition-colors hover:bg-[#242424]/20 px-4 sm:px-6"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-3xl sm:text-4xl text-[#929292] group-hover:text-[#C8FF00] transition-colors font-bold">
                  {item.number}
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-[#929292] uppercase mt-1">
                  {item.subtitle}
                </span>
              </div>

              {/* Statement Title */}
              <div className="lg:col-span-7">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#F4F1EB] uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-3">
                <p className="text-sm font-sans text-[#929292] leading-relaxed group-hover:text-[#F4F1EB] transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-[#242424] flex justify-between items-center text-xs font-mono text-[#929292]"
        >
          <span>BLAEZE CREATIVE DIRECTION</span>
          <span className="text-[#C8FF00] font-bold">AUTHENTIC EXPRESSION ®</span>
        </motion.div>
      </div>
    </section>
  );
}
