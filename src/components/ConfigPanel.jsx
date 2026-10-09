import React, { useState, useEffect } from 'react';
import { Settings, X, Save, RefreshCw, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveSiteConfig, fetchSubscribers } from '../utils/api';

export default function ConfigPanel({ config, setConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(config);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    setForm(config);
  }, [config]);

  useEffect(() => {
    if (isOpen) {
      fetchSubscribers().then(res => {
        if (res.success) setSubscriberCount(res.totalSubscribers);
      });
    }
  }, [isOpen]);

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus('');

    const res = await saveSiteConfig(form);
    setSaving(false);

    if (res.success) {
      setConfig(form);
      setSaveStatus('Settings updated live!');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Failed to update config.');
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#242424] text-[#C8FF00] p-3 rounded-full border border-[#C8FF00]/40 shadow-xl hover:bg-[#C8FF00] hover:text-[#0B0B0B] transition-all duration-300 group"
        aria-label="Website Control Panel"
        title="Dynamic Website Configurator"
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-[#0B0B0B]/70 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#0B0B0B] border-l border-[#242424] h-full flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#242424] flex justify-between items-center bg-[#242424]/30">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-[#C8FF00]" />
                  <h3 className="font-display font-bold text-sm text-[#F4F1EB] uppercase tracking-wider">
                    DYNAMIC SITE SETTINGS
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#929292] hover:text-[#F4F1EB] p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs font-mono text-[#929292]">
                {/* Real-time Subscribers Counter Card */}
                <div className="bg-[#242424]/40 border border-[#242424] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-[#C8FF00]" />
                    <div>
                      <span className="text-[#F4F1EB] font-bold block">LIVE LAUNCH SUBSCRIBERS</span>
                      <span className="text-[10px] text-[#929292]">Stored in backend server</span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-xl text-[#C8FF00]">{subscriberCount}</span>
                </div>

                {/* Hero Headline Options */}
                <div className="space-y-3">
                  <span className="text-[#F4F1EB] font-bold uppercase block tracking-wider">HERO HEADLINE LINES</span>
                  <div>
                    <label className="block text-[10px] mb-1">LINE 1</label>
                    <input
                      type="text"
                      value={form.heroHeadlineLine1 || ''}
                      onChange={(e) => handleChange('heroHeadlineLine1', e.target.value)}
                      className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#F4F1EB] focus:border-[#C8FF00] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1">LINE 2</label>
                    <input
                      type="text"
                      value={form.heroHeadlineLine2 || ''}
                      onChange={(e) => handleChange('heroHeadlineLine2', e.target.value)}
                      className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#F4F1EB] focus:border-[#C8FF00] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1">LINE 3</label>
                    <input
                      type="text"
                      value={form.heroHeadlineLine3 || ''}
                      onChange={(e) => handleChange('heroHeadlineLine3', e.target.value)}
                      className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#F4F1EB] focus:border-[#C8FF00] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1">LINE 4 (VISUAL ANCHOR)</label>
                    <input
                      type="text"
                      value={form.heroHeadlineLine4 || ''}
                      onChange={(e) => handleChange('heroHeadlineLine4', e.target.value)}
                      className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#C8FF00] focus:border-[#C8FF00] outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Hero Subtext */}
                <div>
                  <label className="block text-[#F4F1EB] font-bold uppercase mb-1">HERO SUBTEXT</label>
                  <textarea
                    rows={3}
                    value={form.heroSubtext || ''}
                    onChange={(e) => handleChange('heroSubtext', e.target.value)}
                    className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#F4F1EB] focus:border-[#C8FF00] outline-none"
                  />
                </div>

                {/* Launch Countdown Configuration */}
                <div className="space-y-3 pt-3 border-t border-[#242424]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F4F1EB] font-bold uppercase">ENABLE COUNTDOWN TIMER</span>
                    <input
                      type="checkbox"
                      checked={Boolean(form.showCountdown)}
                      onChange={(e) => handleChange('showCountdown', e.target.checked)}
                      className="accent-[#C8FF00] w-4 h-4"
                    />
                  </div>

                  {form.showCountdown && (
                    <div>
                      <label className="block text-[10px] mb-1 flex items-center gap-1">
                        <Clock size={12} className="text-[#C8FF00]" />
                        <span>LAUNCH DATE & TIME (ISO FORMAT)</span>
                      </label>
                      <input
                        type="datetime-local"
                        value={form.launchDate ? form.launchDate.slice(0, 16) : ''}
                        onChange={(e) => handleChange('launchDate', new Date(e.target.value).toISOString())}
                        className="w-full bg-[#242424]/60 border border-[#242424] p-2 text-[#F4F1EB] focus:border-[#C8FF00] outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Save Feedback */}
                {saveStatus && (
                  <div className="p-3 bg-[#C8FF00]/10 border border-[#C8FF00] text-[#C8FF00] font-bold text-center">
                    {saveStatus}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#242424] flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 bg-[#C8FF00] text-[#0B0B0B] font-display font-bold uppercase tracking-wider hover:bg-[#F4F1EB] transition-colors flex items-center justify-center gap-2"
                  >
                    {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                    <span>APPLY SETTINGS</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
