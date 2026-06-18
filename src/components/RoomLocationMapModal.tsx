/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Room, Language } from '../types';
import { X, Map, Layers, Compass, ExternalLink, BookmarkCheck, Star, Sparkles, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomLocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

type FloorLevel = 'ground' | 'first' | 'second' | 'third';

export const RoomLocationMapModal: React.FC<RoomLocationMapModalProps> = ({
  isOpen,
  onClose,
  language,
  rooms,
  onRoomSelect,
}) => {
  const [activeFloor, setActiveFloor] = useState<FloorLevel>('second');
  const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);

  if (!isOpen) return null;

  // Find the exact room objects for details propagation
  const deluxeRoom = rooms.find(r => r.id === 'deluxe');
  const standardRoom = rooms.find(r => r.id === 'standard');
  const twinRoom = rooms.find(r => r.id === 'twin');

  // Interactive Room click assistant
  const handleSpaceClick = (roomId: string) => {
    let targetRoom: Room | undefined;
    if (roomId === 'deluxe') targetRoom = deluxeRoom;
    else if (roomId === 'standard') targetRoom = standardRoom;
    else if (roomId === 'twin') targetRoom = twinRoom;

    if (targetRoom) {
      onRoomSelect(targetRoom);
    }
  };

  const getFloorTitle = (floor: FloorLevel) => {
    switch (floor) {
      case 'ground':
        return language === 'en' ? 'Ground Floor: Reception & Dining' : 'መሬት ፎቅ፡ መቀበያና ምግብ ቤት';
      case 'first':
        return language === 'en' ? 'First Floor: Executive Rooms' : '1ኛ ፎቅ፡ ኤክስኪውቲቭ ክፍሎች';
      case 'second':
        return language === 'en' ? 'Second Floor: Premium Suites' : '2ኛ ፎቅ፡ ልዩ የሰገነት ክፍሎች';
      case 'third':
        return language === 'en' ? 'Third Floor: Rooftop Terrace Bar' : '3ኛ ፎቅ፡ ሰገነት ላይ የመዝናኛ ባር';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#12211b]/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-[#fdfcf8] text-[#2d2a26] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 border border-[#e5e1d8]"
        >
          {/* Header Bar */}
          <div className="bg-[#1a2e26] text-[#fdfcf8] p-5 sm:p-6 flex justify-between items-center border-b border-[#e5e1d8]/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#12211b] rounded-lg border border-[#e5e1d8]/15 text-[#c5a059]">
                <Map className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#fdfcf8]">
                  {language === 'en' ? 'Interactive Room Locator Map' : 'የክፍሎች መለያ ፎቅ ካርታ'}
                </h2>
                <p className="text-[10px] sm:text-xs text-[#bfbbb3] font-light">
                  {language === 'en' 
                    ? 'Explore our actual physical floorplan layout to select your perfect room coordinates.' 
                    : 'በእያንዳንዱ ፎቅ ላይ የክፍሎችን አቀማመጥና አቅጣጫ አይተው የሚፈልጉትን ይመዝግቡ።'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-[#12211b] text-[#fdfcf8] hover:bg-black/40 p-2.5 rounded-full transition-transform hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Controls & floor selection tabs */}
          <div className="p-5 sm:p-6 bg-[#f5f2ed] border-b border-[#e5e1d8] flex flex-wrap justify-center sm:justify-start items-center gap-2">
            <span className="text-[9px] uppercase font-mono tracking-wider text-stone-500 mr-2 flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5 text-[#b35a38]" /> {language === 'en' ? 'SELECT BUILDING STOREY:' : 'የፎቅ ደረጃ ይምረጡ፡'}
            </span>
            <div className="inline-flex flex-wrap gap-1 bg-white p-1 rounded-lg border border-[#e5e1d8] shadow-inner">
              {[
                { id: 'ground', nameEn: 'Ground Floor', nameAm: 'መሬት ፎቅ' },
                { id: 'first', nameEn: '1st Floor', nameAm: '1ኛ ፎቅ' },
                { id: 'second', nameEn: '2nd Floor', nameAm: '2ኛ ፎቅ' },
                { id: 'third', nameEn: 'Rooftop 3F', nameAm: '3ኛ ፎቅ (ሰገነት)' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFloor(f.id as FloorLevel)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    activeFloor === f.id
                      ? 'bg-[#1a2e26] text-white shadow-sm'
                      : 'text-stone-500 hover:text-[#1a2e26] hover:bg-[#f5f2ed]'
                  }`}
                >
                  {language === 'en' ? f.nameEn : f.nameAm}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Visual Floor Layout Diagram Frame */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-sm text-[#1a2e26] tracking-tight flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#b35a38] rounded-full inline-block animate-pulse"></span>
                  {getFloorTitle(activeFloor)}
                </h3>
                <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" /> {language === 'en' ? 'NORTHEAST FACING' : 'የሰሜን ዋልታ አቅጣጫ'}
                </span>
              </div>

              {/* Graphic container (Visual blueprint floor map) */}
              <div className="bg-[#12211b] rounded-2xl border border-[#1a2e26]/30 p-6 shadow-xl relative aspect-[16/10] flex flex-col justify-between overflow-hidden">
                {/* Background blueprints decorative patterns */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* BUILDING STRUCTURE OUTLINE GRAPHIC */}
                <div className="w-full h-full relative z-10 flex items-center justify-center p-2">
                  
                  {/* GROUND FLOOR PLAN MAP */}
                  {activeFloor === 'ground' && (
                    <div className="w-full h-full grid grid-cols-12 gap-2 text-[#fdfcf8]">
                      {/* Left: Lobby Reception Area */}
                      <div className="col-span-7 bg-[#1a2e26]/60 border-2 border-[#e5e1d8]/40 rounded-xl p-4 flex flex-col justify-between hover:border-amber-400 transition-colors">
                        <div className="text-left">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-amber-400">Reception Lobby</span>
                          <h4 className="font-serif text-sm font-bold mt-1 text-[#fdfcf8]">{language === 'en' ? 'Front Desk & Guest Lounge' : 'የፊት ጠረጴዛ መስተንግዶ'}</h4>
                        </div>
                        <p className="text-[10px] text-[#dfded9]/60 font-light mt-2">
                          {language === 'en' ? '• 24/7 Concierge Service\n• Safe-box deposits\n• Direct Shuttle Transfer Desk' : '• የ24 ሰዓት አመቻች ሰራተኞች\n• የነጻ አውሮፕላን ማረፊያ ማቆሚያ'}
                        </p>
                      </div>

                      {/* Right upper-lower splited dining rooms */}
                      <div className="col-span-12 sm:col-span-5 grid grid-rows-2 gap-2">
                        {/* Buffet spaces */}
                        <div className="bg-[#b35a38]/30 border-2 border-[#e5e1d8]/30 rounded-xl p-3 flex flex-col justify-center hover:border-amber-400 transition-colors">
                          <span className="text-[8px] uppercase font-mono text-amber-500 block">Gourmet Dining</span>
                          <h5 className="font-serif text-[11px] font-bold text-[#fdfcf8]">{language === 'en' ? 'East Star Buffet Room' : 'ልዩ የቡፌ ቁርስ አዳራሽ'}</h5>
                        </div>
                        
                        {/* Administration store */}
                        <div className="bg-[#12211b]/80 border border-[#e5e1d8]/20 rounded-xl p-3 flex items-center justify-center text-center">
                          <span className="text-[10px] text-white/40 block uppercase font-mono tracking-widest">{language === 'en' ? 'Staff Kitchen & Office' : 'የሰራተኞች ክፍል'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FIRST FLOOR: EXEC ROOMS */}
                  {activeFloor === 'first' && (
                    <div className="w-full h-full grid grid-cols-4 gap-2 text-[#fdfcf8]">
                      {/* Room 101 Standard */}
                      <button
                        onClick={() => handleSpaceClick('standard')}
                        onMouseEnter={() => setHoveredSpace('standard_101')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="bg-[#1a2e26]/50 hover:bg-[#1a2e26] border-2 border-[#e5e1d8]/35 hover:border-amber-400 rounded-xl p-3.5 text-left transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-[8px] text-amber-400 font-mono tracking-widest font-extrabold uppercase">ROOM 101</span>
                        <h4 className="font-serif text-xs font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{language === 'en' ? 'Standard Comfort' : 'ስታንዳርድ ኪንግ'}</h4>
                        <div className="mt-4 text-[9px] text-[#dfded9]/60">{language === 'en' ? '28m² • Road facing' : '28m²'}</div>
                      </button>

                      {/* Room 102 Standard */}
                      <button
                        onClick={() => handleSpaceClick('standard')}
                        onMouseEnter={() => setHoveredSpace('standard_102')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="bg-[#1a2e26]/50 hover:bg-[#1a2e26] border-2 border-[#e5e1d8]/35 hover:border-amber-400 rounded-xl p-3.5 text-left transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-[8px] text-amber-400 font-mono tracking-widest font-extrabold uppercase">ROOM 102</span>
                        <h4 className="font-serif text-xs font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{language === 'en' ? 'Standard Comfort' : 'ስታንዳርድ ኪንግ'}</h4>
                        <div className="mt-4 text-[9px] text-[#dfded9]/60">{language === 'en' ? '28m² • Road facing' : '28m²'}</div>
                      </button>

                      {/* Room 103 Standard */}
                      <button
                        onClick={() => handleSpaceClick('standard')}
                        onMouseEnter={() => setHoveredSpace('standard_103')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="bg-[#1a2e26]/50 hover:bg-[#1a2e26] border-2 border-[#e5e1d8]/35 hover:border-amber-400 rounded-xl p-3.5 text-left transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-[8px] text-amber-400 font-mono tracking-widest font-extrabold uppercase">ROOM 103</span>
                        <h4 className="font-serif text-xs font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{language === 'en' ? 'Standard Comfort' : 'ስታንዳርድ ኪንግ'}</h4>
                        <div className="mt-4 text-[9px] text-[#dfded9]/60">{language === 'en' ? '28m² • Quiet alley' : '28m²'}</div>
                      </button>

                      {/* Room 105 Twin */}
                      <button
                        onClick={() => handleSpaceClick('twin')}
                        onMouseEnter={() => setHoveredSpace('twin_105')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="bg-[#b35a38]/40 hover:bg-[#b35a38] border-2 border-[#e5e1d8]/35 hover:border-amber-400 rounded-xl p-3.5 text-left transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-[8px] text-amber-400 font-mono tracking-widest font-extrabold uppercase">ROOM 105</span>
                        <h4 className="font-serif text-xs font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{language === 'en' ? 'Executive Twin' : 'ኤክስኪውቲቭ ባለሁለት'}</h4>
                        <div className="mt-4 text-[9px] text-[#dfded9]/60">{language === 'en' ? '35m² • Dual Beds' : '35m²'}</div>
                      </button>
                    </div>
                  )}

                  {/* SECOND FLOOR: BALCONY SUITES */}
                  {activeFloor === 'second' && (
                    <div className="w-full h-full grid grid-cols-12 gap-2 text-[#fdfcf8]">
                      {/* Deluxe Balcony Room 201 */}
                      <button
                        onClick={() => handleSpaceClick('deluxe')}
                        onMouseEnter={() => setHoveredSpace('deluxe_201')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="col-span-5 bg-gradient-to-tr from-[#1a2e26] to-[#12211b] border-2 border-[#c5a059] hover:border-amber-400 rounded-xl p-4 text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] text-[#c5a059] font-mono tracking-widest font-extrabold uppercase">ROOM 201 DE LUXE</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          </div>
                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#fdfcf8] mt-1 pr-4 leading-snug">
                            {language === 'en' ? 'Deluxe Balcony Suite' : 'ዴሉክስ የሰገነት ክፍሎች'}
                          </h4>
                        </div>
                        
                        {/* Balcony visual segment representation */}
                        <div className="mt-2 bg-[#c5a059]/25 hover:bg-[#c5a059]/40 border border-[#c5a059]/40 p-1.5 rounded text-[9px] text-[#c5a059] text-center font-bold font-mono tracking-widest">
                          [ GLASS BALCONY CITY VIEW ]
                        </div>
                      </button>

                      {/* Deluxe Balcony Room 202 */}
                      <button
                        onClick={() => handleSpaceClick('deluxe')}
                        onMouseEnter={() => setHoveredSpace('deluxe_202')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="col-span-4 bg-gradient-to-tr from-[#1a2e26] to-[#12211b] border-2 border-[#c5a059] hover:border-amber-400 rounded-xl p-4 text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] text-[#c5a059] font-mono tracking-widest font-extrabold uppercase">ROOM 202 DE LUXE</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          </div>
                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#fdfcf8] mt-1 pr-4 leading-snug">
                            {language === 'en' ? 'Deluxe Balcony Suite' : 'ዴሉክስ የሰገነት ክፍሎች'}
                          </h4>
                        </div>
                        
                        <div className="mt-2 bg-[#c5a059]/25 border border-[#c5a059]/40 p-1.5 rounded text-[9px] text-[#c5a059] text-center font-bold font-mono tracking-widest">
                          [ CITY VIEW BANNER ]
                        </div>
                      </button>

                      {/* Room 203 Executive Twin */}
                      <button
                        onClick={() => handleSpaceClick('twin')}
                        onMouseEnter={() => setHoveredSpace('twin_203')}
                        onMouseLeave={() => setHoveredSpace(null)}
                        className="col-span-3 bg-[#b35a38]/40 hover:bg-[#b35a38] border-2 border-[#e5e1d8]/35 hover:border-amber-400 rounded-xl p-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[8px] text-[#dfded9] font-mono tracking-widest font-extrabold uppercase block">ROOM 203</span>
                          <h4 className="font-serif text-xs font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{language === 'en' ? 'Executive Twin' : 'ኤክስኪውቲቭ ባለሁለት'}</h4>
                        </div>
                        <div className="text-[8px] text-[#dfded9]/60 leading-none">35m² • Dual Beds</div>
                      </button>
                    </div>
                  )}

                  {/* THIRD FLOOR ROOFTOP */}
                  {activeFloor === 'third' && (
                    <div className="w-full h-full grid grid-cols-12 gap-2 text-[#fdfcf8]">
                      {/* Left side: Open sky terrace lounge */}
                      <div className="col-span-8 bg-[#1a2e26]/30 border-2 border-dashed border-[#c5a059]/40 rounded-xl p-4 flex flex-col justify-between hover:border-amber-400 transition-colors">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-mono text-amber-400">OPEN SUNSET VIEW TERRACE</span>
                          <h4 className="font-serif text-sm font-bold mt-1 text-[#fdfcf8]">{language === 'en' ? 'Sunset Panoramic Lounge' : 'የፀሐይ መግቢያ መመልከቻ ሰገነት'}</h4>
                        </div>
                        <p className="text-[10px] text-stone-300 font-light max-w-sm">
                          {language === 'en' ? 'Cozy outdoor seating and fireplace. Highly complimented sunset breezes.' : 'የምሽት ንፋስ የሚንሸራሸሩበት እንዲሁም ኮክቴል መጠጦች የሚጠጡበት ሰገነት።'}
                        </p>
                      </div>

                      {/* Right side: Rooftop Bar station */}
                      <div className="col-span-4 bg-[#b35a38]/40 border-2 border-[#e5e1d8]/40 rounded-xl p-4 flex flex-col justify-center text-center">
                        <span className="text-[9px] uppercase font-mono text-amber-500 font-bold">Rooftop Station</span>
                        <h4 className="font-serif text-xs font-bold text-[#fdfcf8] mt-1">{language === 'en' ? 'East Star Bar' : 'ኢስት ስታር ባር'}</h4>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Legend details */}
                <div className="flex border-t border-[#dfded9]/15 pt-3 items-center justify-between text-[10px] text-[#bfbbb3]">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#1a2e26] border border-[#c5a059] rounded-full inline-block"></span>
                      <span>{language === 'en' ? 'Deluxe Suite' : 'ዴሉክስ ክፍል'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#b35a38]/60 rounded-full inline-block"></span>
                      <span>{language === 'en' ? 'Executive Twin' : 'ባለ ሁለት አልጋ ክፍል'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#12211b] border border-white/20 rounded-full inline-block"></span>
                      <span>{language === 'en' ? 'Standard Comfort' : 'ስታንዳርድ ክፍል'}</span>
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-amber-400">{language === 'en' ? '★ CLICK ROOM BOX TO PREVIEW DETAILS' : '★ ዝርዝር ለማየት ክፍሉን ይጫኑ'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Selected Room Information Cards */}
            <div className="md:col-span-4 space-y-5 bg-[#f5f2ed] border border-[#e5e1d8] p-5 rounded-2xl h-fit">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#b35a38] font-bold block mb-1">
                {language === 'en' ? 'Storey Specifications' : 'የፎቅ መረጃ ማብራሪያ'}
              </span>
              
              <div className="space-y-4">
                <div className="text-left">
                  <h4 className="font-serif font-bold text-[#1a2e26] text-base mb-1">
                     {language === 'en' ? 'Sabiyan Quiet Isolation' : 'ከድምፅ የተጠበቀው ሰገነት'}
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                    {language === 'en' 
                      ? 'Every room category features dual-glaze noise proof layouts. Deluxe Balcony suites face Northeast offering clean breezes of Dire Dawa.' 
                      : 'ሁሉም ክፍሎች ከሳቢያን መንገድ የሚወጡ የድምፅ ረብሻዎችን ለመከላከል ድርብ መከላከያ አላቸው። ጠዋት ላይ ቀዝቃዛ አየር ያስገባሉ።'}
                  </p>
                </div>

                {/* Highlight specific features */}
                <div className="space-y-2 pt-2 border-t border-[#e5e1d8]">
                  <h5 className="text-[10px] font-mono tracking-wider font-bold text-stone-500 uppercase">
                    {language === 'en' ? 'HOTEL KEY LOCATIONS' : 'ዋና ዋና ክፍሎች'}
                  </h5>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleSpaceClick('deluxe')}
                      className="w-full text-left bg-white hover:bg-[#1a2e26]/5 p-2 rounded-lg border border-[#e5e1d8] flex justify-between items-center text-xs text-[#1a2e26] font-semibold transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Deluxe Balcony Suite' : 'ዴሉክስ የሰገነት ክፍሎች'}</span>
                      <span className="text-[10px] text-[#b35a38] font-mono font-bold">2F (Suite 201/202)</span>
                    </button>

                    <button 
                      onClick={() => handleSpaceClick('twin')}
                      className="w-full text-left bg-white hover:bg-[#1a2e26]/5 p-2 rounded-lg border border-[#e5e1d8] flex justify-between items-center text-xs text-[#1a2e26] font-semibold transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Executive Twin Room' : 'ኤክስኪውቲቭ ባለሁለት አልጋ'}</span>
                      <span className="text-[10px] text-[#b35a38] font-mono font-bold">1F/2F (Room 105/203)</span>
                    </button>

                    <button 
                      onClick={() => handleSpaceClick('standard')}
                      className="w-full text-left bg-white hover:bg-[#1a2e26]/5 p-2 rounded-lg border border-[#e5e1d8] flex justify-between items-center text-xs text-[#1a2e26] font-semibold transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Standard Comfort King' : 'ስታንዳርድ ምቹ ኪንግ'}</span>
                      <span className="text-[10px] text-[#b35a38] font-mono font-bold">1F (Rooms 101/102/103)</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e5e1d8] text-center">
                  <span className="text-[10px] text-stone-500 italic block leading-relaxed">
                    {language === 'en'
                      ? 'Note: All rooms include free Airport transit shuttle transfers.'
                      : 'ማሳሰቢያ፡ ሁሉም ቦታ የሚያስይዙ እንግዶች የአየር ማረፊያ ነጻ መኪና ይመደብላቸዋል።'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
