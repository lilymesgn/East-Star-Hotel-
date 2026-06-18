/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouting } from '../context/RoutingContext';
import { Star, MessageSquareCode, Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Reviews: React.FC = () => {
  const { language, reviews, addReview, deleteReview } = useRouting();

  // Form block states
  const [guestName, setGuestName] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState('');

  // Handle local dynamic review addition
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !reviewText) {
      alert('Please fill out your name and review details.');
      return;
    }

    // Since we handle bilingual entry in this simple demo, populate both text fields with user text
    // for immediate, symmetric rendering.
    addReview({
      author: guestName,
      locationEn: cityCountry || 'Guest Review',
      locationAm: cityCountry || 'የእንግዳ አስተያየት',
      rating,
      textEn: reviewText,
      textAm: reviewText,
    });

    // Reset fields & set notification message
    setGuestName('');
    setCityCountry('');
    setRating(5);
    setReviewText('');
    setMessage(language === 'en' ? 'Thank you! Your verified review has been published.' : 'እናመሰግናለን! የእርስዎ ግብረ-መልስ በተሳካ ሁኔታ ቀርቧል።');

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Editorial Header Section */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
            {language === 'en' ? 'GUEST PERSPECTIVES' : 'የእንግዶች ምስክርነት'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-1.5 leading-tight">
            {language === 'en' ? 'Reviews Reflecting Immaculate Standards' : 'ፅዱ፣ ቁጥብና ምቹ መስተንግዶ'}
          </h1>
          <p className="mt-3 text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            {language === 'en'
              ? 'Our property scores exceptionally high on verified TripAdvisor channels. Read about guest sleep comfort, hot tub relaxation, and customer care.'
              : 'ኢስት ስታር ሆቴል በድሬዳዋ ከተማ በተሟላ የጽዳትና የስራ ስነ-ምግባሩ ከእንግዶች የላቀ አድናቆት አትርፏል።'}
          </p>
        </div>
      </section>

      {/* TripAdvisor Verified Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-stone-900 border border-stone-800 p-8 rounded-2xl mb-16">
          <div className="text-center md:border-r md:border-stone-850 py-4">
            <span className="text-5xl font-serif font-bold text-amber-500 block">4.4</span>
            <div className="flex justify-center my-1.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="text-stone-400 text-xs tracking-wider uppercase font-mono font-semibold">
              {language === 'en' ? 'TripAdvisor Ranking' : 'የአድናቆት ደረጃ'}
            </p>
          </div>

          <div className="col-span-2 px-0 md:px-8 space-y-4">
            <h3 className="font-serif font-semibold text-lg text-stone-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
              <span>{language === 'en' ? 'A Top Cleanliness & Value Score Winner' : 'ግብረ-መልስ ለአገልግሎት ደረጃችን ምስክር ነው'}</span>
            </h3>
            
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {language === 'en'
                ? 'We take tremendous pride in keeping bathrooms, sheets, dust-free tiles, and lounge utilities perfectly sanitary. With free airport transfers and dual-inverter ACs, our value index remains unmatched in Sabiyan.'
                : 'የመታጠቢያ ቤቶችን፣ የአንሶላዎችን እና የሰገነት እቃዎችን ፅዳት በጥብቅ እንጠብቃለን። የአውሮፕላን ማረፊያ ነጻ መኪናን ጨምሮ በሳቢያን ጥራት ያለው ምርጥ ዋጋችንን ያረጋግጡ።'}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-stone-500 uppercase tracking-wider pt-2">
              <div className="bg-stone-950 p-2 rounded">Cleanliness: 4.8/5</div>
              <div className="bg-stone-950 p-2 rounded">Staff Service: 4.7/5</div>
              <div className="bg-stone-950 p-2 rounded">Sleep Comfort: 4.6/5</div>
            </div>
          </div>
        </div>

        {/* Existing customer reviews feed with staggered grids */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-stone-850 pb-3">
            <h3 className="font-serif text-lg font-bold text-stone-250">
              {language === 'en' ? 'Guest Feed' : 'የእንግዶች አስተያየቶች'} ({reviews.length})
            </h3>
            <span className="text-[10px] text-stone-500 uppercase font-mono tracking-widest leading-none">
              Verified • 100% Real
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {reviews.map((rev) => (
                <motion.div 
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="bg-stone-900/40 p-6 rounded-xl border border-stone-850 hover:bg-stone-900/60 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-stone-200">{rev.author}</h4>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {language === 'en' ? rev.locationEn : rev.locationAm}
                        </span>
                      </div>
                      
                      <div className="flex shrink-0">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      "{language === 'en' ? rev.textEn : rev.textAm}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-900 mt-4 flex justify-between items-center text-[10px] text-stone-500 font-mono">
                    <span>Verified Guest</span>
                    <span>{rev.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Interactive 'Write a Review' Form Box */}
        <div id="write-review-section" className="mt-20 max-w-2xl mx-auto bg-stone-900 border border-stone-800 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-4 border-b border-stone-800 pb-3">
            <MessageSquareCode className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif text-lg text-stone-100">
              {language === 'en' ? 'Share Your Verified Experience' : 'የእርስዎን ምስክርነት ይተውልን'}
            </h3>
          </div>

          {/* Success toast inside */}
          {message && (
            <div className="bg-emerald-950 border border-emerald-800 text-emerald-400 p-4 rounded-lg text-xs leading-none mb-6 animate-pulse">
              ✓ {message}
            </div>
          )}

          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rev-name" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                  {language === 'en' ? 'Full Name' : 'ሙሉ ስም'}
                </label>
                <input
                  id="rev-name"
                  type="text"
                  required
                  placeholder='e.g., Almaz Tesfaye'
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                />
              </div>

              <div>
                <label htmlFor="rev-location" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                  {language === 'en' ? 'Your Location' : 'የመጡበት ሀገር/ክፍለ ሀገር'}
                </label>
                <input
                  id="rev-location"
                  type="text"
                  placeholder='e.g., Addis Ababa, Ethiopia'
                  value={cityCountry}
                  onChange={(e) => setCityCountry(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                />
              </div>
            </div>

            <div>
              <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1.5">
                {language === 'en' ? 'Guest Rating Score' : 'የእርሶ ደረጃ ስሌት'}
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => {
                  const isGold = s <= rating;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                      aria-label={`Rate ${s} stars`}
                    >
                      <Star className={`w-6 h-6 shrink-0 ${isGold ? 'text-amber-500 fill-amber-500' : 'text-stone-700'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="rev-text" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Your Guest Review Text' : 'የአስተያየትዎ ዝርዝር'}
              </label>
              <textarea
                id="rev-text"
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={language === 'en' ? 'How was your stay? How clean was the room? How courteous was the airport pickup?' : 'የእርስዎ ቆይታ እንዴት ነበር? ክፍሉ ምን ያህል ንፁህ ነበር? የአየር ማረፊያ መኪና መስተንግዶስ?'}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 placeholder-stone-600 leading-relaxed"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 font-bold py-3 px-6 rounded text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Submit Approved Review' : 'አስተያየት ይላኩ'}
              </button>
            </div>
          </form>
        </div>

      </section>

    </div>
  );
};
