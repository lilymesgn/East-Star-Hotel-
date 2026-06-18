/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useRouting } from '../context/RoutingContext';
import { Menu, X, Globe, Phone, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomDetailsModal } from './RoomDetailsModal';
import { Room } from '../types';

// High-resolution stylized SVG "E" inside a gold star
const LogoStarE: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Elegant 5-point star shadow and star outer casing */}
    <path 
      d="M50 8 L63 36 L93 36 L69 54 L78 84 L50 66 L22 84 L31 54 L7 36 L37 36 Z" 
      fill="url(#star-gold-gradient)" 
      stroke="#c5a059" 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    {/* Inner starry window casing */}
    <path 
      d="M50 18 L59 39 L82 39 L64 53 L71 77 L50 62 L29 77 L36 53 L18 39 L41 39 Z" 
      fill="#12211b" 
      opacity="0.9"
    />
    {/* Bold classical stylized capital "E" positioned inside */}
    <path 
      d="M38 35 H62 V41 H46 V47 H58 V53 H46 V59 H62 V65 H38 Z" 
      fill="#fdfcf8" 
      stroke="#c5a059"
      strokeWidth="0.75"
    />
    <defs>
      <linearGradient id="star-gold-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f3e0b5" />
        <stop offset="40%" stopColor="#c5a059" />
        <stop offset="100%" stopColor="#9a7122" />
      </linearGradient>
    </defs>
  </svg>
);

export const Header: React.FC = () => {
  const { page, navigate, language, setLanguage, hotelInfo, rooms, headerConfig } = useRouting();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal display states (Map modal removed; Details modal kept for previews)
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const menuItems = (headerConfig?.menuItems || [
    { id: '1', nameEn: 'Home', nameAm: 'መነሻ', path: '/' },
    { id: '2', nameEn: 'Rooms', nameAm: 'ክፍሎች', path: '/rooms' },
    { id: '3', nameEn: 'Dining', nameAm: 'ምግብና መጠጥ', path: '/dining' },
    { id: '4', nameEn: 'Amenities', nameAm: 'አገልግሎቶች', path: '/amenities' },
    { id: '5', nameEn: 'About Us', nameAm: 'ስለ እኛ', path: '/about' },
    { id: '6', nameEn: 'Map', nameAm: 'ካርታ', path: '#map-scroll-section' },
    { id: '7', nameEn: 'Reviews', nameAm: 'አስተያየቶች', path: '/reviews' },
    { id: '8', nameEn: 'Contact', nameAm: 'ግንኙነት', path: '/contact' },
  ]).filter(item => item.nameEn !== 'Map' && item.nameEn !== 'Contact');

  const handleNav = (path: string) => {
    if (path.startsWith('#')) {
      setMobileMenuOpen(false);
      if (page !== '/') {
        navigate('/');
        // Wait minor milliseconds for dynamic route transition to register
        setTimeout(() => {
          const el = document.getElementById(path.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      } else {
        const el = document.getElementById(path.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a2e26]/95 backdrop-blur-md border-b border-[#e5e1d8]/15 text-[#fdfcf8] shadow-md">
      
      {/* Top narrow high-value micro bar for direct support announcements */}
      <div className="hidden sm:block bg-[#12211b] px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-[#bfbbb3] border-b border-[#e5e1d8]/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-light text-[#bfbbb3]">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[#fdfcf8]">{hotelInfo.phone1}</span>
            </span>
            <span className="text-[#e5e1d8]/10">|</span>
            <span className="font-medium text-[#bfbbb3] flex items-center gap-1">
              <Map className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'en' ? 'Sabiyan, Dire Dawa' : 'ሳቢያን ፣ ድሬዳዋ'}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/35 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
              {language === 'en' ? 'Free Airport Pick-up (10-Min)' : 'የአውሮፕላን ማረፊያ በነጻ ማመላለሻ'}
            </span>
            <button 
              onClick={() => handleNav('/admin')}
              className="text-[11px] text-amber-400 hover:text-amber-350 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              {language === 'en' ? 'Staff Portal' : 'ሰራተኛ መግቢያ'}
            </button>
          </div>
        </div>
      </div>

      {/* Main interactive header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Stylized Logo & Title Header */}
          <button 
            id="logo-button"
            onClick={() => handleNav('/')} 
            className="flex items-center gap-3 cursor-pointer group text-left transition-all hover:opacity-95"
          >
            <LogoStarE className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col items-start leading-tight">
              <div className="flex items-baseline space-x-1">
                <span className="text-lg sm:text-xl font-serif font-black tracking-tight text-[#fdfcf8] leading-none">
                  {headerConfig?.logoTextEn || 'EAST STAR'}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#c5a059] font-sans tracking-[0.2em] uppercase font-bold mt-0.5 block">
                {headerConfig?.logoTextAm || 'ኢስት ስታር ሆቴል'}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {menuItems.map((item) => {
              const isActive = page === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`px-3 py-2 rounded-md text-xs xl:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer hover:scale-[1.05] ${
                    isActive
                      ? 'text-amber-400 bg-[#12211b] font-bold'
                      : 'text-[#bfbbb3] hover:text-[#c5a059] hover:bg-[#12211b]/40'
                  }`}
                >
                  {language === 'en' ? item.nameEn : item.nameAm}
                </button>
              );
            })}
          </nav>

          {/* Desktop Language Switcher & Highlighted CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Language Selector Button */}
            <div className="flex items-center border border-[#e5e1d8]/15 rounded-md bg-[#12211b]/80 p-0.5 text-xs font-mono">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#c5a059] text-[#12211b] font-bold shadow-sm'
                    : 'text-[#bfbbb3] hover:text-[#fdfcf8]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  language === 'am'
                    ? 'bg-[#c5a059] text-[#12211b] font-bold shadow-sm'
                    : 'text-[#bfbbb3] hover:text-[#fdfcf8]'
                }`}
              >
                አማ
              </button>
            </div>

            {/* Prominent Call-to-Action Book Now Button */}
            <button
              onClick={() => handleNav('/contact')}
              className="bg-[#b35a38] hover:bg-[#9a4b2e] active:bg-[#b05230] text-white font-extrabold text-xs py-3.5 px-6 rounded-md tracking-widest font-sans transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer uppercase border border-[#b35a38]/40"
            >
              {language === 'en' ? (headerConfig?.buttonTextEn || 'Book Now') : (headerConfig?.buttonTextAm || 'አሁኑኑ ይያዙ')}
            </button>
          </div>

          {/* Mobile Actions Overlay (Language + Hamburg) */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden">
            
            {/* Quick Language Toggle on Mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1 px-2.5 py-2 rounded-md border border-[#e5e1d8]/20 bg-[#12211b] text-xs font-mono text-[#bfbbb3]"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === 'en' ? 'አማ' : 'EN'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#bfbbb3] hover:text-amber-400 hover:bg-[#12211b]/40 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1a2e26] border-t border-[#e5e1d8]/10 overflow-hidden shadow-2xl text-[#fdfcf8]"
          >
            <div className="px-3 pt-2 pb-6 space-y-2 max-w-sm mx-auto">
              {menuItems.map((item) => {
                const isActive = page === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`block w-full text-left px-4 py-3 rounded-md text-sm font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#c5a059] text-[#12211b] font-bold'
                        : 'text-[#bfbbb3] hover:bg-[#12211b] hover:text-amber-400'
                    }`}
                  >
                    {language === 'en' ? item.nameEn : item.nameAm}
                  </button>
                );
              })}

              <div className="pt-4 px-4 flex flex-col gap-3">
                <button
                  onClick={() => handleNav('/contact')}
                  className="w-full bg-[#b35a38] hover:bg-[#9a4b2e] text-white font-bold py-3.5 px-4 text-center rounded-md font-sans text-xs tracking-widest uppercase transition-all hover:scale-[1.02]"
                >
                  {language === 'en' ? (headerConfig?.buttonTextEn || 'Book Now') : (headerConfig?.buttonTextAm || 'አሁኑኑ ይያዙ')}
                </button>
                <div className="flex justify-between items-center text-[11px] text-[#bfbbb3] pt-3 border-t border-[#e5e1d8]/10">
                  <button 
                    onClick={() => handleNav('/admin')}
                    className="text-amber-400 hover:underline cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                  >
                    {language === 'en' ? 'Staff Area' : 'የሰራተኞች ክፍል'}
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-wider">Dire Dawa, Ethiopia</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RoomDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        room={selectedRoomForModal}
        language={language}
      />
    </header>
  );
};
