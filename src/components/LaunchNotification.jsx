import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subscribeEmail } from '../utils/api';

export default function LaunchNotification() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const validateEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');

    try {
      const res = await subscribeEmail(cleanEmail);

      if (res.status === 200) {
        setStatus('success');
        setMessage(res.data.message || "YOU'RE ON THE LIST. SEE YOU AT LAUNCH.");
        setEmail('');

        // Trigger subtle celebration confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#C8FF00', '#F4F1EB', '#929292']
        });
      } else {
        setStatus('error');
        setMessage(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Unable to send request. Server may be offline.');
    }
  };

  return (
    <section id="launch-updates" className="py-24 sm:py-36 px-6 sm:px-12 bg-[#0B0B0B] border-t border-[#242424] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C8FF00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#242424]/60 border border-[#242424] rounded-full mb-8"
        >
          <Mail size={14} className="text-[#C8FF00]" />
          <span className="text-xs font-mono tracking-widest text-[#F4F1EB] uppercase">SECTION 04 — LAUNCH NOTIFICATION</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-6xl text-[#F4F1EB] uppercase tracking-tight mb-6"
        >
          BE THERE FROM THE BEGINNING.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-[#929292] font-normal max-w-xl mx-auto mb-12"
        >
          Get the first announcement when <strong className="text-[#F4F1EB]">BLAEZE</strong> goes live. No spam, only essential launch access.
        </motion.p>

        {/* Subscription Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#242424]/30 border border-[#242424] p-6 sm:p-10 max-w-2xl mx-auto relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 bg-[#0B0B0B] border ${
                    status === 'error' ? 'border-red-500' : 'border-[#242424] focus:border-[#C8FF00]'
                  } text-[#F4F1EB] placeholder-[#929292] font-mono text-sm outline-none transition-colors disabled:opacity-50`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-[#C8FF00] text-[#0B0B0B] font-display font-bold text-xs tracking-widest uppercase hover:bg-[#F4F1EB] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <span>NOTIFY ME</span>
                )}
              </button>
            </div>

            {/* Response Alerts */}
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-start gap-3 p-4 text-xs font-mono text-left ${
                    status === 'success'
                      ? 'bg-[#C8FF00]/10 border border-[#C8FF00] text-[#C8FF00]'
                      : 'bg-red-500/10 border border-red-500/50 text-red-400'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  )}
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy Consent Notice */}
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#929292] pt-2">
              <Lock size={12} className="text-[#929292]" />
              <span>By subscribing, you agree to receive BLAEZE launch updates. Unsubscribe anytime.</span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
