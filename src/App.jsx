import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Manifesto from './components/Manifesto';
import FirstChapter from './components/FirstChapter';
import LaunchNotification from './components/LaunchNotification';
import Footer from './components/Footer';
import ConfigPanel from './components/ConfigPanel';
import { defaultSiteConfig } from './config/siteConfig';
import { fetchSiteConfig } from './utils/api';

export default function App() {
  const [config, setConfig] = useState(defaultSiteConfig);

  useEffect(() => {
    fetchSiteConfig().then((loadedConfig) => {
      if (loadedConfig) {
        setConfig((prev) => ({ ...prev, ...loadedConfig }));
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EB] selection:bg-[#C8FF00] selection:text-[#0B0B0B] font-sans">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Section A: Minimal Navigation */}
      <Navbar config={config} />

      {/* Section B: Cinematic Hero */}
      <main>
        <Hero config={config} />

        {/* Section C: Brand Philosophy */}
        <Philosophy />

        {/* Section D: The AE Manifesto */}
        <Manifesto />

        {/* Section E: The First Chapter */}
        <FirstChapter config={config} />

        {/* Section F: Launch Notification */}
        <LaunchNotification />
      </main>

      {/* Section G: Minimal Footer */}
      <Footer config={config} />

      {/* Dynamic Website Config Panel */}
      <ConfigPanel config={config} setConfig={setConfig} />
    </div>
  );
}
