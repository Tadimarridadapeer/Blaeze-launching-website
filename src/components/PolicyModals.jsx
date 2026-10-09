import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PolicyModals({ isOpen, type, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0B0B]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0B0B0B] border border-[#242424] max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#242424]">
            <div className="flex items-center gap-3">
              {type === 'privacy' ? <Shield size={18} className="text-[#C8FF00]" /> : <FileText size={18} className="text-[#C8FF00]" />}
              <h3 className="font-display font-bold text-lg text-[#F4F1EB] uppercase tracking-wider">
                {type === 'privacy' ? 'PRIVACY POLICY' : 'TERMS & CONDITIONS'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#929292] hover:text-[#F4F1EB] p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Scrollable */}
          <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs text-[#929292] leading-relaxed">
            {type === 'privacy' ? (
              <>
                <p><strong className="text-[#F4F1EB]">BLAEZE Privacy Policy</strong></p>
                <p>At BLAEZE (Authentic Expression), we respect your privacy and are committed to protecting the email address you share with us for launch notifications.</p>
                <h4 className="text-[#F4F1EB] font-bold mt-4">1. Data Collection</h4>
                <p>We only collect email addresses explicitly submitted through our pre-launch announcement notification form.</p>
                <h4 className="text-[#F4F1EB] font-bold mt-4">2. Use of Information</h4>
                <p>Your email is used solely to notify you when BLAEZE officially launches or releases early preview access. We do not sell, rent, or trade your contact information to third parties.</p>
                <h4 className="text-[#F4F1EB] font-bold mt-4">3. Security</h4>
                <p>Data stored on our server is protected using standard administrative and technical safety protocols.</p>
              </>
            ) : (
              <>
                <p><strong className="text-[#F4F1EB]">BLAEZE Terms of Service</strong></p>
                <p>Welcome to BLAEZE (Authentic Expression). By interacting with this website, you agree to these terms.</p>
                <h4 className="text-[#F4F1EB] font-bold mt-4">1. Pre-Launch Status</h4>
                <p>This website is an official brand announcement and pre-launch teaser. No commercial shopping transactions or product orders are conducted on this site.</p>
                <h4 className="text-[#F4F1EB] font-bold mt-4">2. Intellectual Property</h4>
                <p>All brand copy, typography layouts, trademarks (BLAEZE®, AE, IGNITE YOUR IDENTITY), and original design motifs are intellectual property of BLAEZE.</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#242424] text-[#F4F1EB] font-mono text-xs hover:bg-[#C8FF00] hover:text-[#0B0B0B] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
