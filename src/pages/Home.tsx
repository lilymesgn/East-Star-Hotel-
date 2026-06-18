/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { useRouting } from '../context/RoutingContext';
import { 
  Calendar, 
  Star, 
  Compass, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Lightbox } from '../components/Lightbox';
import { LazyImage } from '../components/LazyImage';

export const Home: React.FC = () => {
  const { navigate, language, rooms, reviews, hotelInfo, heroConfig } = useRouting();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

  // Real-time Parallax background translate value
  const [scrollY, setScrollY] = useState(0);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick reservation states
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [selectedRoom, setSelectedRoom] = useState('deluxe');

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (checkOut && val >= checkOut) {
      setCheckOut('');
    }
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/contact?in=true&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&room=${selectedRoom}`);
  };

  const handleOpenLightbox = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setLightboxOpen(true);
  };

  const heroImage = heroConfig?.image || '/src/assets/images/east_star_exterior_1780046580471.png';
  const topReview = reviews[0] || { author: 'Guest', rating: 5, textEn: 'Wonderful neat stay.' };

  // Common motion specs for smooth, elegant rise & fade in
  const animateOnScroll = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-stone-950 text-stone-100 font-sans min-h-screen overflow-x-hidden">
      
      {/* 1. HERO BANNER SECTION (Immersive luxury feel with parallax background) */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="East Star Hotel Exterior"
            className="w-full h-full object-cover select-none will-change-transform"
            style={{ transform: `scale(1.1) translateY(${scrollY * 0.25}px)` }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12211b]/98 via-[#12211b]/55 to-[#12211b]/80 z-10" />
        </div>

        {/* Hero Title and elegant intro rising with delayed animation */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#c5a059]/15 border border-[#c5a059]/40 rounded-full text-[11px] font-extrabold uppercase tracking-widest leading-none text-[#c5a059] shadow-sm">
              ★ ★ ★ ★ {language === 'en' ? 'Classified 4-Star Comfort' : 'የ 4-ኮከብ ደረጃ ምቾት'}
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tight text-white leading-[1.1]">
              {language === 'en' ? (heroConfig?.headlineEn || 'Modern Luxury in Dire Dawa') : (heroConfig?.headlineAm || 'ለየት ያሉ ክፍሎችና ምቹ መስተንግዶ')}
            </h1>

            <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide font-light md:px-6" style={{ color: '#e5e1d8' }}>
              {language === 'en' 
                ? (heroConfig?.subtextEn || 'Welcome to East Star Hotel – Immaculate room cleanliness, contemporary AC suites, free airport shuttles, and premier hospitality in Dire Dawa\'s tranquil Sabiyan quarter.')
                : (heroConfig?.subtextAm || 'ወደ ኢስት ስታር ሆቴል በደህና መጡ – ልዩ የክፍሎች ፅዳት፣ አየር ማቀዝቀዣ፣ በነጻ የሚመላለስ የአየር ማረፊያ መኪና እና ልዩ መስተንግዶ በድሬዳዋ ውቧ ሳቢያን ሰፈር ያግኙ።')}
            </p>

            {/* CTAs with upscale smooth hover scale + lift animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => {
                  const roomsSection = document.getElementById('featured-rooms');
                  if (roomsSection) {
                    roomsSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/rooms');
                  }
                }}
                className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#b08945] text-[#12211b] font-black py-4 px-9 rounded-lg text-xs tracking-widest uppercase shadow-2xl scale-[1] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                {language === 'en' ? 'Inquire Room' : 'ክፍል ለመጠየቅ'}
              </button>
              
              <button
                onClick={() => {
                  window.open("https://wa.me/251967222224?text=Hello%20East%20Star%20Hotel,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20deluxe%20room.", "_blank");
                }}
                className="w-full sm:w-auto bg-stone-950/90 hover:bg-stone-900 border border-stone-800 text-stone-100 hover:text-white font-bold py-4 px-9 rounded-lg text-xs tracking-widest uppercase scale-[1] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>{language === 'en' ? 'Book via WhatsApp' : 'በዋትስአፕ ያነጋግሩን'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. RECEPTIVE BOOKING QUICK BAR (Smooth Entrance Transition) */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-16 md:-mt-24 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="bg-stone-900 border border-stone-800 p-6 md:p-8 rounded-xl shadow-2xl hover:border-stone-750 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-4 flex items-center gap-2 font-mono">
            <Calendar className="w-4 h-4 text-[#c5a059]" />
            {language === 'en' ? 'Check Booking Availability' : 'ቀጥታ ቦታ ያስይዙ'}
          </h3>
          
          <form onSubmit={handleQuickInquiry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="home-checkin" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Check-In Date' : 'መግቢያ ቀን'}
              </label>
              <input
                id="home-checkin"
                type="date"
                required
                min={getTodayDateString()}
                value={checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] font-mono"
              />
            </div>

            <div>
              <label htmlFor="home-checkout" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Check-Out Date' : 'መውጫ ቀን'}
              </label>
              <input
                id="home-checkout"
                type="date"
                required
                min={checkIn ? checkIn : getTodayDateString()}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] font-mono"
              />
            </div>

            <div>
              <label htmlFor="home-guests" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Number of Guests' : 'የእንግዶች ብዛት'}
              </label>
              <select
                id="home-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059]"
              >
                <option value="1">1 {language === 'en' ? 'Guest' : 'እንግዳ'}</option>
                <option value="2">2 {language === 'en' ? 'Guests' : 'እንግዳ'}</option>
                <option value="3">3 {language === 'en' ? 'Guests' : 'እንግዳ'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="home-room" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Preferred Sanctuary' : 'የሚመርጡት ክፍል'}
              </label>
              <select
                id="home-room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059]"
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {language === 'en' ? r.nameEn : r.nameAm}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#c5a059] hover:bg-[#b08945] text-stone-950 font-black py-3 px-4 rounded text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{language === 'en' ? 'Inquire Now' : 'ይጠይቁ'}</span>
                <span className="font-mono">→</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* 3. CORE HIGHLIGHTS SECTION (Cleanliness, Value, Location) with rising Scroll effects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          {...animateOnScroll}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-extrabold">
            {language === 'en' ? 'East Star Core Values' : 'ኢስት ስታር አድናቆት'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-2 tracking-tight">
            {language === 'en' 
              ? 'Why Guests Rate Us #1 in Dire Dawa' 
              : 'እንግዶች በድሬዳዋ አንደኛ የሚያደርጉን ለምንድ ነው?'}
          </h2>
          <div className="w-12 h-1.5 bg-[#c5a059] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              titleEn: 'Immaculate Room Cleanliness',
              titleAm: 'ፍፁም የክፍሎች ፅዳት',
              descEn: 'Outstanding ratings emphasizing pristine hygiene. Fresh crisp white linens, scrubbed tiles, sanitized AC units, and contemporary private bathrooms.',
              descAm: 'በየቀኑ ልዩ ፅዳት ይደረጋል። ንፁህ ነጭ አንሶላዎች፣ ዘመናዊ መታጠቢያ ቤቶች እና የተሟላ ንፅህና ለእርስዎ ምቾት ይዘጋጃሉ።',
              icon: <CheckCircle className="w-8 h-8 text-[#c5a059]" />
            },
            {
              titleEn: 'Exceptional 4-Star Value',
              titleAm: 'በጣም ተመጣጣኝ ዋጋ',
              descEn: 'Premium AC comfort suite, inclusive high-speed internet, and complimentary round-trip airport taxi transfers – without the high luxury pricing.',
              descAm: 'ባለ 4 ኮከብ ሆቴል አገልግሎቶች፣ ፈጣን ኢንተርኔት፣ የነጻ አውሮፕላን ማረፊያ ማመላለሻ እና ምቹ ክፍሎችን ባልተጋነነ ተመጣጣኝ ዋጋ ያግኙ።',
              icon: <Star className="w-8 h-8 text-[#c5a059]" />
            },
            {
              titleEn: 'Convenient Sabiyan Location',
              titleAm: 'ሳቢያን ሰፈር ምቹ አድራሻ',
              descEn: 'Nestled safely inside Dire Dawa\'s neat administrative street. Wonderfully serene at night, and conveniently 10 minutes from the terminal gates.',
              descAm: 'ድሬዳዋ ውብ፣ ፀጥተኛና አስተማማኝ በሆነው በሳቢያን ሰፈር ውስጥ የሚገኝ፣ ከድሬዳዋ ዓለም አቀፍ አውሮፕላን ማረፊያ በ10 ደቂቃ ርቀት በቀላሉ ይገኛል።',
              icon: <Compass className="w-8 h-8 text-[#c5a059]" />
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="bg-stone-900/60 border border-stone-800/80 p-8 rounded-xl hover:border-[#c5a059]/40 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-lg"
            >
              <div className="mb-5 bg-stone-950 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-200">
                {language === 'en' ? item.titleEn : item.titleAm}
              </h3>
              <p className="text-xs text-stone-450 mt-3 leading-relaxed font-light">
                {language === 'en' ? item.descEn : item.descAm}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED ROOM SUITES WITH SCROLL & HOVER LIFTS */}
      <section id="featured-rooms" className="bg-stone-900 border-y border-stone-800 py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            {...animateOnScroll}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-4"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold">
                {language === 'en' ? 'OUR RESERVED SANCTUARIES' : 'የእንግዳ ማረፊያዎች'}
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-2 tracking-tight">
                {language === 'en' ? 'Featured Premier Rooms' : 'ተለይተው የቀረቡ ክፍሎች'}
              </h2>
            </div>
            
            <button
              onClick={() => navigate('/rooms')}
              className="group text-xs text-[#c5a059] font-bold uppercase tracking-widest flex items-center gap-2 border-b border-[#c5a059]/10 hover:border-[#c5a059] pb-1 cursor-pointer transition-all hover:translate-x-1"
            >
              <span>{language === 'en' ? 'View All Rooms & Pricing' : 'ሁሉንም ክፍሎችና ዋጋዎችን ይመልከቱ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.slice(0, 2).map((room, idx) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                className="bg-stone-950 border border-stone-800/80 rounded-xl overflow-hidden hover:border-[#c5a059]/30 transition-all duration-300 flex flex-col group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl"
              >
                <div 
                  className="relative h-64 overflow-hidden cursor-zoom-in"
                  onClick={() => handleOpenLightbox(room.image, language === 'en' ? room.nameEn : room.nameAm)}
                >
                  <LazyImage
                    src={room.image}
                    alt={language === 'en' ? room.nameEn : room.nameAm}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    wrapperClassName="w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur border border-stone-800 px-3.5 py-1.5 rounded text-xs font-mono font-bold text-[#c5a059]">
                    {language === 'en' ? `$${room.priceUSD}/night` : `${room.priceETB} ብር/ቀን`}
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-xl font-serif font-bold text-stone-250">
                      {language === 'en' ? room.nameEn : room.nameAm}
                    </h3>
                    <span className="text-xs text-stone-500 font-mono">
                      {room.sizeSqM} m²
                    </span>
                  </div>
                  
                  <p className="text-xs text-stone-400 leading-relaxed mb-6 line-clamp-2 font-light">
                    {language === 'en' ? room.descriptionEn : room.descriptionAm}
                  </p>

                  <div className="mt-auto pt-5 border-t border-stone-900 flex justify-between items-center">
                    <span className="text-xs text-stone-500 font-mono">
                      Max {room.maxGuests} {language === 'en' ? 'Guests' : 'እንግዶች'}
                    </span>
                    <button
                      onClick={() => navigate(`/contact?in=true&room=${room.id}`)}
                      className="bg-stone-900 border border-stone-800 hover:border-[#c5a059]/40 text-stone-200 hover:text-white px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all hover:scale-[1.05] cursor-pointer"
                    >
                      {language === 'en' ? 'Inquire This Room' : 'ይጠይቁ'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. GUEST REVIEWS WITH DELIGHTFUL TRANSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div 
          {...animateOnScroll}
          className="max-w-3xl mx-auto bg-stone-900/40 border border-stone-800/80 p-8 md:p-14 rounded-2xl relative shadow-xl hover:border-stone-750 transition-colors"
        >
          <div className="text-[#c5a059] font-serif text-7xl leading-none absolute top-4 left-8 select-none opacity-30">“</div>
          
          <div className="flex justify-center mb-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-[#c5a059] fill-[#c5a059] shrink-0" />
            ))}
          </div>
          
          <p className="text-lg md:text-xl font-serif text-stone-250 leading-relaxed italic mb-8 font-light max-w-2xl mx-auto">
            "{language === 'en' ? topReview.textEn : topReview.textAm}"
          </p>
          
          <div>
            <h4 className="font-extrabold text-sm text-stone-100 uppercase tracking-wider">{topReview.author}</h4>
            <p className="text-xs text-stone-500 font-mono mt-1">
              {language === 'en' ? topReview.locationEn : topReview.locationAm} • Tripadvisor Verified
            </p>
          </div>

          <button
            onClick={() => navigate('/reviews')}
            className="mt-8 text-xs text-[#c5a059] hover:text-[#e0bb7d] font-bold uppercase tracking-widest block mx-auto underline cursor-pointer duration-200"
          >
            {language === 'en' ? 'Read More Guest Reviews' : 'ሁሉንም አስተያየቶች ይመልከቱ'}
          </button>
        </motion.div>
      </section>

      {/* 6. REAL-TIME MAP SCROLL ANCHOR WITH LIGHTWEIGHT LAZY GENERATOR */}
      <section id="map-scroll-section" className="bg-stone-900 border-t border-stone-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            {...animateOnScroll}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold block">
              {language === 'en' ? 'OUR GEOGRAPHIC COORDINATES' : 'የሆቴሉ አድራሻ'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-2.5 tracking-tight">
              {language === 'en' ? 'Tranquil Sabiyan Quarter' : 'በድሬዳዋ ውቧ ሳቢያን ሰፈር'}
            </h2>
            <div className="w-12 h-1 bg-[#c5a059] mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Dynamic Map Frame. Keeps the initial index loading lightweight */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 rounded-xl overflow-hidden border border-stone-800 bg-stone-950 min-h-[350px] relative flex flex-col justify-center items-center p-8 group transition-all"
            >
              {loadMap ? (
                <iframe
                  title="East Star Hotel Map View"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15738.995932599763!2d41.8492025701!3d9.6105051996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163101eb20eb07fd%3A0xe84ad1f4f5fcdbbf!2sDire%20Dawa!5e0!3m2!1sen!2set!4v1716972210000!5m2!1sen!2set"
                  className="absolute inset-0 w-full h-full border-0 select-none grayscale invert"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#12211b] border border-[#c5a059]/30 flex items-center justify-center mx-auto text-[#c5a059] group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 px-4">
                    <h3 className="font-serif font-bold text-stone-200">
                      {language === 'en' ? 'Interactive Google Map' : 'የጉግል ካርታ ማሳያ'}
                    </h3>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                      {language === 'en' 
                        ? 'Click below to load the interactive Google Map. This keeps initial page load fast and efficient.' 
                        : 'የድረ-ገጹን መጫን ፍጥነት ለመጨመር ካርታው ዝግ ሆኗል። ለማየት ከታች ያለውን ቁልፍ ይጫኑ።'}
                    </p>
                  </div>
                  <button
                    onClick={() => setLoadMap(true)}
                    className="bg-[#c5a059] hover:bg-[#b08945] text-stone-950 font-extrabold py-3 px-7 rounded text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                  >
                    {language === 'en' ? 'Load Interactive Map' : 'ካርታውን ክፈት'}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Address copy card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 bg-stone-950 border border-stone-800 p-8 rounded-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold block">
                  {language === 'en' ? 'DIRECTIONS BRIEFING' : 'የአድራሻ ዝርዝር'}
                </span>
                
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-[#c5a059] shrink-0" />
                  <div>
                    <h3 className="font-serif font-bold text-stone-200">
                      {language === 'en' ? 'Premium Sabiyan Street' : 'ሳቢያን ህንፃ ሰፈር'}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed mt-1 font-light">
                      {hotelInfo.addressEn}
                    </p>
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-4 rounded space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium font-sans">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>{language === 'en' ? 'Estimated Drive Durations' : 'ለመድረስ የሚፈጅ የጉዞ ጊዜ'}</span>
                  </div>
                  
                  <ul className="text-stone-400 text-[11px] space-y-1.5 font-mono">
                    <li className="flex justify-between border-b border-stone-850 pb-1.5">
                      <span>{language === 'en' ? 'Dire Dawa Airport' : 'ድሬዳዋ አውሮፕላን ማረፊያ'}</span>
                      <span className="text-[#c5a059]">10 Mins (5.5 km)</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-850 pb-1.5">
                      <span>{language === 'en' ? 'Furi-Lebu Railway' : 'የምድር ባቡር ጣቢያ'}</span>
                      <span className="text-[#c5a059]">12 Mins (7.0 km)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{language === 'en' ? 'Ancient Harar City' : 'የሐረር ጀጎል ግንብ'}</span>
                      <span className="text-[#c5a059]">55 Mins (45.0 km)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-800/80 mt-6">
                <a 
                  href="https://maps.google.com/?q=Dire+Dawa+Ethiopia" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-center w-full bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-100 font-bold py-3 px-4 rounded text-xs uppercase tracking-widest cursor-pointer transition-colors"
                >
                  {language === 'en' ? 'Open in Google Maps' : 'በጉግል ካርታ ክፈት'}
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. DUAL OUTFLOW EMBED / DIRECT BOOKING PROMO OVERVIEW */}
      <section className="bg-[#c5a059] text-stone-950 py-20 px-4">
        <motion.div 
          {...animateOnScroll}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 leading-tight tracking-tight">
            {language === 'en' 
              ? 'Book Directly for the Best Rates and Complimentary Shuttle'
              : 'ቀጥታ ቦታ ያስይዙ፤ ምርጥ ዋጋና ነጻ መኪና ያግኙ'}
          </h2>
          <p className="max-w-2xl mx-auto text-stone-900 text-xs sm:text-sm mt-4 leading-relaxed font-light">
            {language === 'en'
              ? 'Our Sabiyan reception desk is active 24/7. Get instant confirmation and pre-arrange your free airport luxury transfers today.'
              : 'የሳቢያኑ የእንግዳ መቀበያ ጠረጴዛችን 24 ሰዓት በሰራተኛ የተሞላ ነው። በነጻ ለመውሰድ ፈጥነው ዛሬውኑ ያነጋግሩን።'}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-stone-900 hover:bg-stone-950 text-white font-extrabold py-4 px-9 rounded-lg text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.05] hover:shadow-xl cursor-pointer"
            >
              {language === 'en' ? 'Book Online Reservation' : 'ቦታ ያስይዙ'}
            </button>
            <a
              href="tel:+251967222224"
              className="w-full sm:w-auto bg-transparent border border-stone-900 text-stone-950 hover:bg-stone-900 hover:text-white font-bold py-4 px-9 rounded-lg text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.05] text-center inline-block"
            >
              {language === 'en' ? 'Call Office Desk' : 'ስልክ ቁጥር ይደውሉ'}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Lightbox widget */}
      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
        onClose={() => setLightboxOpen(false)}
      />

    </div>
  );
};
