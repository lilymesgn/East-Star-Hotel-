/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouting } from '../context/RoutingContext';
import { Sparkles, Bed, Users, Square, Check, Tv, Wind, Coffee, Eye, ArrowRight, ShieldCheck, FileText, CreditCard, MessageSquare } from 'lucide-react';
import { Lightbox } from '../components/Lightbox';
import { RoomDetailsModal } from '../components/RoomDetailsModal';
import { LazyImage } from '../components/LazyImage';
import { Room } from '../types';

export const Rooms: React.FC = () => {
  const { navigate, language, rooms } = useRouting();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'suite' | 'standard'>('all');

  // Room details modal management
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDetailedRoom, setSelectedDetailedRoom] = useState<Room | null>(null);

  const handleOpenLightbox = (src: string, alt: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent click
    setSelectedImage({ src, alt });
    setLightboxOpen(true);
  };

  const handleOpenDetails = (room: Room) => {
    setSelectedDetailedRoom(room);
    setIsDetailsOpen(true);
  };

  const handleBookRoom = (roomId: string) => {
    navigate(`/contact?in=true&room=${roomId}`);
  };

  const filteredRooms = rooms.filter(room => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'suite') return room.id === 'deluxe';
    if (selectedFilter === 'standard') return room.id !== 'deluxe';
    return true;
  });

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* 1. Header Hero section */}
      <section className="relative py-20 bg-[#12211b] border-b border-[#e5e1d8]/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block">
            {language === 'en' ? 'EAST STAR ACCOMMODATIONS' : 'ኢስት ስታር ክፍሎች'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#fdfcf8] mt-2 leading-tight">
            {language === 'en' ? 'Sanctuaries of Silent Comfort' : 'ፀጥ ያሉና ምቹ ማረፊያዎች'}
          </h1>
          <p className="mt-3 text-[#bfbbb3] text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
            {language === 'en'
              ? 'Our rooms feature double-insulated soundproof structures, clean premium sheets, private bathrooms, and responsive AC. Discover your quiet rest in Dire Dawa.'
              : 'ክፍሎቻችን ከድምፅ የተጠበቁ፣ የፀዱ አንሶላዎች፣ የግል መታጠቢያ ቤቶች እና አስተማማኝ የአየር ማቀዝቀዣ አላቸው። በድሬዳዋ ውብ ቆይታ ለእርስዎ ይዘጋጃል።'}
          </p>

          {/* Core filters */}
          <div className="mt-8 flex justify-center gap-3">
            {[
              { id: 'all', nameEn: 'All Rooms', nameAm: 'ሁሉንም ክፍሎች' },
              { id: 'suite', nameEn: 'Suites & Balconies', nameAm: 'ስዊቶችና በረንዳዎች' },
              { id: 'standard', nameEn: 'Executive Rooms', nameAm: 'ኤክስኪውቲቭ ክፍሎች' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                  selectedFilter === f.id
                    ? 'bg-[#c5a059] border-[#c5a059] text-[#12211b] font-bold'
                    : 'bg-[#12211b] border-[#e5e1d8]/10 text-[#bfbbb3] hover:text-[#fdfcf8]'
                }`}
              >
                {language === 'en' ? f.nameEn : f.nameAm}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Detailed Rooms Listing with interactive Lightbox triggers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {filteredRooms.map((room, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={room.id}
                onClick={() => handleOpenDetails(room)}
                className={`flex flex-col lg:flex-row items-stretch bg-stone-900 border border-stone-800/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#c5a059]/40 group cursor-pointer ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Image half */}
                <div 
                  className="relative lg:w-1/2 min-h-[350px] overflow-hidden"
                >
                  <LazyImage
                    src={room.image}
                    alt={language === 'en' ? room.nameEn : room.nameAm}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 select-none"
                    wrapperClassName="w-full h-full absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Rating or status badge */}
                  <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur border border-stone-800/80 px-2.5 py-1 rounded text-[11px] font-semibold text-amber-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Rating: {room.rating} • Verified Guest Reviews</span>
                  </div>

                  {/* Absolute Click details prompt overlay */}
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <div className="bg-stone-900/90 backdrop-blur border border-stone-700/60 p-3 rounded-full text-stone-100 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Click to View Details & Reviews</span>
                    </div>
                  </div>

                  {/* Small trigger inside image component strictly for direct full gallery zooming */}
                  <button
                    onClick={(e) => handleOpenLightbox(room.image, language === 'en' ? room.nameEn : room.nameAm, e)}
                    className="absolute bottom-4 right-4 bg-black/70 hover:bg-black p-2 rounded-md border border-[#e5e1d8]/20 z-20 transition-all text-[10px] font-mono font-bold uppercase tracking-widest text-[#bfbbb3] text-white flex items-center gap-1"
                    title="Zoom Image"
                  >
                    Zoom
                  </button>
                </div>

                {/* Narrative Half */}
                <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-4">
                    {/* Upper title & rates */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-800/60 pb-4">
                      <div>
                        <h2 
                          onClick={() => handleOpenDetails(room)}
                          className="text-xl sm:text-2xl font-serif font-bold text-stone-100 hover:text-amber-400 cursor-pointer transition-colors"
                        >
                          {language === 'en' ? room.nameEn : room.nameAm}
                        </h2>
                        <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono block mt-1">
                          {language === 'en' ? 'Verified Sabiyan Suite' : 'የተረጋገጠ የሳቢያን ክፍል'}
                        </span>
                      </div>
                      
                      <div className="text-left sm:text-right">
                        <p className="text-xl font-mono font-bold text-amber-500">
                          {language === 'en' ? `$${room.priceUSD}` : `${room.priceETB} ብር`}
                        </p>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                          {language === 'en' ? 'per night (inc. VAT)' : 'በቀን (ግብርን ጨምሮ)'}
                        </p>
                      </div>
                    </div>

                    {/* Room Attributes list */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="bg-stone-950 p-2.5 rounded border border-stone-800/60 flex flex-col items-center justify-center text-center">
                        <Bed className="w-4 h-4 text-[#bfbbb3] mb-1" />
                        <span className="text-[9px] text-stone-500 uppercase font-mono tracking-wider">Bed Setup</span>
                        <span className="text-[11px] font-semibold text-stone-350 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                          {language === 'en' ? room.bedTypeEn : room.bedTypeAm}
                        </span>
                      </div>

                      <div className="bg-stone-950 p-2.5 rounded border border-stone-800/60 flex flex-col items-center justify-center text-center">
                        <Users className="w-4 h-4 text-[#bfbbb3] mb-1" />
                        <span className="text-[9px] text-stone-500 uppercase font-mono tracking-wider">Capacity</span>
                        <span className="text-[11px] font-semibold text-stone-350 mt-0.5">
                          {room.maxGuests} {language === 'en' ? 'Guests' : 'እንግዶች'}
                        </span>
                      </div>

                      <div className="bg-stone-950 p-2.5 rounded border border-stone-800/60 flex flex-col items-center justify-center text-center">
                        <Square className="w-4 h-4 text-[#bfbbb3] mb-1" />
                        <span className="text-[9px] text-stone-500 uppercase font-mono tracking-wider">Unit Size</span>
                        <span className="text-[11px] font-semibold text-stone-350 mt-0.5">
                          {room.sizeSqM} m²
                        </span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      {language === 'en' ? room.descriptionEn : room.descriptionAm}
                    </p>

                    {/* Amenities Tag Clouds */}
                    <div>
                      <h4 className="text-[10px] text-stone-500 uppercase font-mono tracking-widest mb-2 font-semibold">
                        {language === 'en' ? 'Included In-Room Conveniences' : 'የክፍሉ የውስጥ አገልግሎቶች'}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(language === 'en' ? room.amenitiesEn : room.amenitiesAm).map((amen, idx) => (
                          <span 
                            key={idx}
                            className="bg-stone-950 px-2.5 py-1 rounded text-[10px] text-stone-400 border border-stone-850 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                            <span>{amen}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Call-to-action buttons */}
                  <div className="pt-6 mt-6 border-t border-stone-800/60 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => navigate(`/contact?in=true&tab=foreigners&room=${room.id}`)}
                      className="flex-1 min-w-[150px] bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Book USD / Card' : 'በዶላር/ካርድ ያዝ'}</span>
                    </button>

                    <button
                      onClick={() => navigate(`/contact?in=true&tab=locals&room=${room.id}`)}
                      className="flex-1 min-w-[150px] bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold py-2.5 px-4 rounded text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5 border border-stone-700"
                    >
                      <span>{language === 'en' ? 'Inquire ETB / CBE' : 'በብር/ባንክ ይጠይቁ'}</span>
                    </button>
                    
                    <a
                      href={`https://wa.me/251967222224?text=${encodeURIComponent(
                        language === 'en' 
                          ? `Hello East Star Hotel! I would like to inquire about booking the ${room.nameEn} online directly.`
                          : `ሰላም ኢስት ስታር ሆቴል! የ${room.nameAm} ክፍል በዋትስአፕ በኩል ማስያዝ እፈልጋለሁ።`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[150px] text-center border border-stone-700 bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-white font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 inline-flex"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>WhatsApp Book</span>
                    </a>

                    <button
                      onClick={() => handleOpenDetails(room)}
                      className="flex-1 min-w-[150px] border border-[#c5a059]/40 bg-stone-950/80 hover:bg-[#c5a059] hover:text-[#12211b] text-amber-400 font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 animate-pulse" />
                      <span>{language === 'en' ? 'Specs & Reviews' : 'ዝርዝር መግለጫ'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Common Inclusions/Safety section to secure trust */}
      <section className="bg-stone-900 border-t border-stone-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-stone-950 border border-stone-800 mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-serif text-stone-200">
            {language === 'en' ? 'Our High Sanitation Guarantee' : 'ልዩ የንፅህና ጥበቃ ማረጋገጫ'}
          </h3>
          <p className="text-xs text-stone-400 mt-2 max-w-xl mx-auto leading-relaxed font-light">
            {language === 'en'
              ? 'Every room is checked, cleaned, and sterilized by senior supervisors before arrival. If any aspect does not meet your expectations, our 24-hour crew will address it instantly or upgrade your room.'
              : 'ከእናንተ መምጣት በፊት እያንዳንዱ ክፍል በከፍተኛ የበላይ ተቆጣጣሪዎች ይፈተሻል፣ ይፀዳል እንዲሁም ንፅህናው ይጠበቃል። ዝቅ ያለ ነገር ከተመለከቱ የእኛ የ24 ሰዓት ሰራተኞች ወዲያውኑ ያስተካክሉልዎታል ወይም ክፍል ይቀይሩልዎታል።'}
          </p>
        </div>
      </section>

      {/* Embedded Lightbox overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Embedded RoomDetailsModal */}
      <RoomDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        room={selectedDetailedRoom}
        language={language}
      />
    </div>
  );
};
