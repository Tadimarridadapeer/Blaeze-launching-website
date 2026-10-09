import React, { useState } from 'react';
import { Instagram, Mail } from 'lucide-react';
import PolicyModals from './PolicyModals';
import logoWhite from '../logo/logo-white.png';

export default function Footer({ config }) {
  const [modalType, setModalType] = useState(null);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#242424] py-16 px-6 sm:px-12 text-[#929292] font-mono text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <img
                src={logoWhite}
                alt="BLAEZE®"
                className="h-8 sm:h-10 w-auto object-contain mb-2"
              />
            </div>
            <p className="text-[#F4F1EB] tracking-wider uppercase font-semibold">
              {config.philosophyTag || "AE — AUTHENTIC EXPRESSION"}
            </p>
            <p className="text-[#C8FF00] tracking-widest font-bold uppercase">
              “{config.brandTagline || "IGNITE YOUR IDENTITY."}”
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] tracking-widest text-[#F4F1EB] uppercase font-bold block mb-4">DIRECT ACCESS</span>
            <ul className="space-y-2">
              <li>
                <a
                  href={config.instagramUrl || "https://instagram.com/blaeze.ae"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8FF00] transition-colors flex items-center gap-2"
                >
                  <Instagram size={14} />
                  <span>INSTAGRAM</span>
                </a>
              </li>
              {config.contactEmail && (
                <li>
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="hover:text-[#C8FF00] transition-colors flex items-center gap-2"
                  >
                    <Mail size={14} />
                    <span>{config.contactEmail}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal / Policy Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] tracking-widest text-[#F4F1EB] uppercase font-bold block mb-4">LEGAL & POLICIES</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setModalType('privacy')}
                  className="hover:text-[#F4F1EB] transition-colors uppercase text-left"
                >
                  PRIVACY POLICY
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('terms')}
                  className="hover:text-[#F4F1EB] transition-colors uppercase text-left"
                >
                  TERMS & CONDITIONS
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#242424]/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <span>© {currentYear} BLAEZE. ALL RIGHTS RESERVED. PRE-LAUNCH ANNOUNCEMENT SITE.</span>
          <span className="text-[#929292]">DESIGNED FOR GEN Z & MODERN MILLENNIALS</span>
        </div>
      </div>

      {/* Policy Modals */}
      <PolicyModals
        isOpen={Boolean(modalType)}
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </footer>
  );
}
