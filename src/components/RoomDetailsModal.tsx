/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Room, Language } from '../types';
import { X, Sparkles, Bed, Users, Square, Check, Star, ShieldCheck, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LazyImage } from './LazyImage';
import { useRouting } from '../context/RoutingContext';

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Dedicated room testimonials to show rich reviews
const CATEGORY_REVIEWS: Record<string, Array<{author: string; rating: number; textEn: string; textAm: string; date: string}>> = {
  deluxe: [
    {
      author: "Marcus Vance",
      rating: 5,
      textEn: "The Deluxe Balcony Suite is stunning! The balcony views of Dire Dawa are tranquil. The bed is deep and extremely comfortable, and the soundproofing works beautifully.",
      textAm: "ዴሉክስ የሰገነት ክፍሉ እጅግ ድንቅ ነው! ከሰገነቱ የሚታየው የድሬዳዋ ውብ እይታ ድንቅ ነው። ባለ ትልቁ አልጋ በጣም ምቹ ነው፤ ጸጥታውም ፍፁም ነው።",
      date: "2026-05-26"
    },
    {
      author: "Sophia Al-Jamil",
      rating: 5,
      textEn: "Very luxurious double-insulated room. No road noises from Sabiyan reach you. Fully premium Habesha decorative textiles and the tea service was remarkable.",
      textAm: "ከድምፅ የተጠበቀው ይህ ክፍል በጣም ድንቅ ነው። ከሳቢያን መንገድ ምንም አይነት ድምፅ አይገባም። የባህል ምንጣፎች ማስጌጫው እና የሻይ አገልግሎታቸው ደስ ይላል።",
      date: "2026-05-10"
    }
  ],
  standard: [
    {
      author: "Sven Lindqvist",
      rating: 5,
      textEn: "Incredibly tidy! Exceeded standard luxury suites in terms of sanitation. The desk is convenient for executive remote working.",
      textAm: "በጣም ፅዱ! ከሰገነት ውጭ ያለውን ምቾት ለሚፈልግ ተመራጭ ክፍል ነው። የስራ ጠረጴዛው ለቢዝነስ ተጓዦች ምቹ ነው።",
      date: "2026-05-18"
    },
    {
      author: "Yonas Biru",
      rating: 4.8,
      textEn: "Best price to comfort ratio in Dire Dawa. AC was cold and fresh, mini-fridge kept drinks perfectly cooled.",
      textAm: "በድሬዳዋ ምርጥ ዋጋና ምቾት ማጣመርያ። አየር ማቀዝቀዣው በጣም ቀዝቃዛ ሲሆን፤ ሚኒ ፍሪጁም መጠጦችን በጥሩ ሁኔታ ያቀዘቅዛል።",
      date: "2026-04-12"
    }
  ],
  twin: [
    {
      author: "Selamawit Kebede",
      rating: 5,
      textEn: "Stayed here with my sister. Extremely tidy, fresh sheets, and our own individual reading lights made it highly convenient.",
      textAm: "ከእህቴ ጋር እዚህ አርፈናል። በጣም ንፁህ፣ ትኩስ አንሶላዎች እና እያንዳንዳችን የራሳችን የማንበቢያ መብራት መኖሩ በጣም ረድቶናል።",
      date: "2026-05-24"
    },
    {
      author: "Dr. David K.",
      rating: 4.5,
      textEn: "Excellent twin setup for business colleagues. Generous tea and coffee selections, clean modern private bathroom is top notch.",
      textAm: "ለስራ ባልደረቦች የሚሆን ምርጥ የባለሁለት አልጋ ክፍል ዝግጅት። ነጻ ሻይና ቡና እንዲሁም ልዩ የግል መታጠቢያ ቤቱ እጅግ አርክቶኛል።",
      date: "2026-05-02"
    }
  ]
};

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, isOpen, onClose, language }) => {
  if (!room) return null;

  const { navigate } = useRouting();

  // Local booking form dates for WhatsApp extraction
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [showInForm, setShowInForm] = useState(false);

  // Filter category-specific reviews
  const reviews = CATEGORY_REVIEWS[room.id] || [];

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const roomName = language === 'en' ? room.nameEn : room.nameAm;
    let message = '';
    
    if (showInForm && guestName) {
      message = language === 'en'
        ? `Hello East Star Hotel Front Desk!\n\nI would like to book a stay directly:\n• Room Type: ${room.nameEn}\n• Guest Name: ${guestName}\n• Check-In Date: ${checkIn || 'Not specified yet'}\n• Check-Out Date: ${checkOut || 'Not specified yet'}\n• Guests: ${guestsCount}\n\nPlease confirm availability. Thank you!`
        : `ሰላም ኢስት ስታር ሆቴል በዋትስአፕ!\n\nክፍል ለማስያዝ ፈልጌ ነበር፡\n• ክፍሉ፡ ${room.nameAm}\n• ስም፡ ${guestName}\n• መግቢያ ቀን፡ ${checkIn || 'ያልተወሰነ'}\n• መውጫ ቀን፡ ${checkOut || 'ያልተወሰነ'}\n• የእንግዶች ብዛት፡ ${guestsCount}\n\nእባክዎን ማረጋገጫ ይላኩልኝ። እናመሰግናለን!`;
    } else {
      message = language === 'en'
        ? `Hello East Star Hotel! I would like to inquire about booking the ${room.nameEn} priced at $${room.priceUSD}/night. Please check the current availability.`
        : `ሰላም ኢስት ስታር ሆቴል! የ${room.nameAm} ክፍል በቀን ${room.priceETB} ብር ማስያዝ ፈልጌ ነበር። እባክዎን ሰሌዳውን አይተው ያረጋግጡልኝ።`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/251967222224?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#12211b]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white text-[#2d2a26] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#e5e1d8]"
          >
            {/* Close Button sticky top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#12211b]/80 text-[#fdfcf8] hover:bg-[#1a2e26] p-2 rounded-full z-30 transition-transform hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Immersive Room Header Photo */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <LazyImage
                src={room.image}
                alt={language === 'en' ? room.nameEn : room.nameAm}
                className="w-full h-full object-cover select-none"
                wrapperClassName="w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 bg-black/40 border border-amber-400/30 px-2.5 py-0.5 rounded-md inline-block">
                  {language === 'en' ? 'Verified sanctuary Suite' : 'የተረጋገጠ ምርጥ ክፍል'}
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#fdfcf8]">
                  {language === 'en' ? room.nameEn : room.nameAm}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-amber-300">
                  {language === 'en' ? `$${room.priceUSD} / Night` : `${room.priceETB} ብር / በቀን`} <span className="text-white/60">• {language === 'en' ? 'inc. VAT & breakfast' : 'ቁርስና ግብርን ጨምሮ'}</span>
                </p>
              </div>
            </div>

            {/* Content Segment */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Room Specs, About & reviews */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Specifications Grid */}
                <div className="grid grid-cols-3 gap-2.5 bg-[#f5f2ed] p-3 rounded-lg border border-[#e5e1d8]">
                  <div className="flex flex-col items-center justify-center text-center p-1.5">
                    <Bed className="w-4 h-4 text-[#b35a38] mb-1" />
                    <span className="text-[9px] uppercase font-mono tracking-wide text-stone-500">{language === 'en' ? 'Bed Type' : 'አልጋ'}</span>
                    <span className="text-xs font-semibold text-[#1a2e26] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {language === 'en' ? room.bedTypeEn : room.bedTypeAm}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center p-1.5 border-x border-[#e5e1d8]">
                    <Users className="w-4 h-4 text-[#b35a38] mb-1" />
                    <span className="text-[9px] uppercase font-mono tracking-wide text-stone-500">{language === 'en' ? 'Max Guests' : 'የሰው ብዛት'}</span>
                    <span className="text-xs font-semibold text-[#1a2e26] mt-0.5">
                      {room.maxGuests} {language === 'en' ? 'Guests' : 'እንግዶች'}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center p-1.5">
                    <Square className="w-4 h-4 text-[#b35a38] mb-1" />
                    <span className="text-[9px] uppercase font-mono tracking-wide text-stone-500">{language === 'en' ? 'Room Size' : 'ስፋት'}</span>
                    <span className="text-xs font-semibold text-[#1a2e26] mt-0.5">
                      {room.sizeSqM} m²
                    </span>
                  </div>
                </div>

                {/* Narrative description */}
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#b35a38] font-bold">
                    {language === 'en' ? 'ACCOMMODATION SANCTUARY SUMMARY' : 'ስለ ክፍሉ አጠቃላይ ማብራሪያ'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {language === 'en' ? room.descriptionEn : room.descriptionAm}
                  </p>
                </div>

                {/* Key Amenities */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#b35a38] font-bold">
                    {language === 'en' ? 'INSTRUCTED IN-ROOM SPECIAL AMENITIES' : 'በክፍሉ ውስጥ የሚገኙ ማደሻዎች'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(language === 'en' ? room.amenitiesEn : room.amenitiesAm).map((amen, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <span className="flex-shrink-0 w-4 h-4 bg-[#1a2e26]/10 text-[#1a2e26] rounded-full flex items-center justify-center text-[10px]">✓</span>
                        <span>{amen}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highly structured Review Testimonials specific to Room */}
                <div className="border-t border-[#e5e1d8] pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs uppercase font-mono tracking-widest text-[#b35a38] font-bold">
                      {language === 'en' ? `VERIFIED ROOM REVIEWS (${reviews.length})` : `የተረጋገጡ የክፍሉ ምስክርነቶች (${reviews.length})`}
                    </h3>
                    <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{room.rating} Rating</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev, idx) => (
                      <div key={idx} className="bg-[#fdfcf8] border border-[#e5e1d8] p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-start text-xs text-stone-500 font-mono">
                          <div>
                            <span className="font-bold text-[#1a2e26] font-sans text-sm block">{rev.author}</span>
                            <span>{language === 'en' ? 'Verified Reservation Guest' : 'ትክክለኛ የተከራየ እንግዳ'}</span>
                          </div>
                          <span className="text-[10px]">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(rev.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 italic leading-relaxed">
                          "{language === 'en' ? rev.textEn : rev.textAm}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Direct WhatsApp Booking Form Setup */}
              <div className="md:col-span-5 bg-[#f5f2ed] border border-[#e5e1d8] p-5 sm:p-6 rounded-2xl h-fit space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b35a38] font-bold block">
                    {language === 'en' ? 'Direct Booking Engine' : 'ቀጥታ መስተንግዶ ማረጋገጫ'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1a2e26]">
                    {language === 'en' ? 'WhatsApp Stay Setup' : 'የቀጥታ ስልክ ማስያዣ'}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                    {language === 'en'
                      ? 'Select dates and finalize details to transmit directly to the hotel reception in the Sabiyan administrative desk.'
                      : 'ቀኖችንና ዝርዝር መረጃዎችን በመምረጥ በሳቢያን የፊት ጠረጴዛ መዝገብ ላይ በቀጥታ ይመዝግቡ።'}
                  </p>
                </div>

                {!showInForm ? (
                  <div className="space-y-3.5 pt-2">
                    <button
                      onClick={() => setShowInForm(true)}
                      className="w-full bg-[#1a2e26] hover:bg-[#12211b] text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-white" />
                      <span>{language === 'en' ? 'Add Dates & Names' : 'ቀኖችና ስም ያስገቡ'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full bg-[#b35a38] hover:bg-[#9a4b2e] text-[#fdfcf8] font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#fdfcf8]" />
                      <span>{language === 'en' ? 'Send Quick General Inquiry' : 'አጠቃላይ ጥያቄ በዋትስአፕ'}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleWhatsAppRedirect} className="space-y-3">
                    <div>
                      <label htmlFor="modal-name" className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                        {language === 'en' ? 'Your Name' : 'የእርስዎ ስም'}
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        placeholder="e.g., Almaz Tesfaye"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-white border border-[#e5e1d8] rounded-md px-3 py-2 text-xs text-[#2d2a26] focus:outline-none focus:border-[#1a2e26]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="modal-checkin" className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                          {language === 'en' ? 'Check-In' : 'መግቢያ ቀን'}
                        </label>
                        <input
                          id="modal-checkin"
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-white border border-[#e5e1d8] rounded-md px-2 py-1.5 text-xs text-[#2d2a26] focus:outline-none focus:border-[#1a2e26] font-mono"
                        />
                      </div>
                      <div>
                        <label htmlFor="modal-checkout" className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                          {language === 'en' ? 'Check-Out' : 'መውጫ ቀን'}
                        </label>
                        <input
                          id="modal-checkout"
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-white border border-[#e5e1d8] rounded-md px-2 py-1.5 text-xs text-[#2d2a26] focus:outline-none focus:border-[#1a2e26] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modal-guests" className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">
                        {language === 'en' ? 'Total Guests' : 'የእንግዶች ብዛት'}
                      </label>
                      <select
                        id="modal-guests"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-white border border-[#e5e1d8] rounded-md px-3 py-2 text-xs text-[#2d2a26] focus:outline-none focus:border-[#1a2e26]"
                      >
                        <option value="1">1 {language === 'en' ? 'Guest' : 'እንግዳ'}</option>
                        <option value="2">2 {language === 'en' ? 'Guests' : 'እንግዶች'}</option>
                        <option value="3">3 {language === 'en' ? 'Guests' : 'እንግዶች'}</option>
                      </select>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-white" />
                        <span>{language === 'en' ? 'Open WhatsApp Chat' : 'በዋትስአፕ ይላኩ'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowInForm(false)}
                        className="w-full text-center text-xs text-stone-500 hover:text-stone-700 underline tracking-wider cursor-pointer py-1"
                      >
                        {language === 'en' ? 'Go Back' : 'ተመለስ'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Secure Card / Bank Reservation option */}
                <div className="pt-4 border-t border-[#e5e1d8] space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#1a2e26] block">
                    {language === 'en' ? 'Or Book via Credit Card / Local Bank' : 'ወይንም በክሬዲት ካርድ / በባንክ ይጠይቁ'}
                  </span>
                  <button
                    onClick={() => {
                      navigate(`/contact?in=true&room=${room.id}`);
                      onClose();
                    }}
                    className="w-full bg-[#1a2e26] hover:bg-[#253f34] text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'en' ? 'Inquire via Dollar/CBE Hold' : 'በዶላር ወይንም በብር ማስያዣ'}</span>
                  </button>
                  <p className="text-[9px] text-stone-500 leading-none text-center">
                    {language === 'en' ? 'Voucher & card pre-authorization supported' : 'በባንክ ማዘዣ እና በክሬዲት ካርድ ማስከበርያ የተደገፈ'}
                  </p>
                </div>

                {/* Satisfaction Stamp */}
                <div className="pt-4 border-t border-[#e5e1d8] flex items-center gap-2 text-stone-500">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] font-light leading-snug">
                    {language === 'en' 
                      ? 'Airport Transfer guaranteed for all online bookings.' 
                      : 'በዋትስአፕ ለሚያስይዙ በሙሉ ነጻ የአየር ማረፊያ መኪና ይመደብላቸዋል።'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
