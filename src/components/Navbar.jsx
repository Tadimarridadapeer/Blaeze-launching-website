import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import logoWhite from '../logo/logo-white.png';

export default function Navbar({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THE PHILOSOPHY', href: '#philosophy' },
    { name: 'MANIFESTO', href: '#manifesto' },
    { name: 'LAUNCH UPDATES', href: '#launch-updates' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/80 backdrop-blur-md border-b border-[#242424]/60 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="#"
          className="flex items-center group focus:outline-none"
        >
          <img
            src={logoWhite}
            alt="BLAEZE®"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs tracking-widest font-mono text-[#929292] hover:text-[#F4F1EB] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C8FF00] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}

          {/* Instagram Link */}
          <a
            href={config.instagramUrl || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#929292] hover:text-[#C8FF00] transition-colors p-1"
          >
            <Instagram size={18} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <a
            href={config.instagramUrl || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#929292] hover:text-[#C8FF00] transition-colors"
          >
            <Instagram size={20} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F4F1EB] hover:text-[#C8FF00] p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-[#0B0B0B]/95 backdrop-blur-xl z-30 flex flex-col justify-between p-8 border-t border-[#242424]">
          <div className="flex flex-col space-y-8 mt-6">
            <span className="text-[10px] font-mono tracking-widest text-[#929292]">NAVIGATION</span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-display font-bold tracking-wider text-[#F4F1EB] hover:text-[#C8FF00] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-[#242424] flex flex-col space-y-4">
            <span className="text-xs font-mono text-[#929292]">{config.brandTagline || "IGNITE YOUR IDENTITY."}</span>
            <div className="flex justify-between items-center text-xs text-[#929292] font-mono">
              <span>{config.philosophyTag || "AE — AUTHENTIC EXPRESSION"}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
