/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouting } from '../context/RoutingContext';
import { Clock, Coffee, Sparkles, Utensils, Heart } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';

export const Dining: React.FC = () => {
  const { language, dining } = useRouting();

  // Reference the exact pre-generated asset filenames or dynamic admin configurations
  const breakfastImg = dining[0]?.image || '/src/assets/images/east_star_dining_1780046617416.png';
  const terraceImg = dining[1]?.image || '/src/assets/images/east_star_terrace_1780046634963.png';

  const menuTeasers = [
    { nameEn: 'Traditional Chechebsa', nameAm: 'ባህላዊ ጨጨብሳ', descEn: 'Torn flatbread fried with Ethiopian clarified spiced butter (Kibe) and berbere, served hot with yogurt and wild honey.', descAm: 'የተቆራረሰ ቂጣ ከንፁህ የቅመማ ቅመም ቅቤና ከበርበሬ ጋር ተቆልቶ፣ ከርጎና ከዱር ማር ጋር ትኩስ ሆኖ የሚቀርብ።', price: '250 ETB' },
    { nameEn: 'Organic Ful Medames', nameAm: 'ልዩ የድሬ ፉል', descEn: 'Slow-cooked fava beans cooked with fresh onions, hot peppers, tomatoes, feta cheese, and local spices with warm local bread.', descAm: 'በቀስታ የተቀቀለ ባቄላ ከአዲስ ሽንኩርት፣ ቃሪያ፣ ቲማቲም፣ ፊታ አይብ እና ቅመማ ቅመም ጋር በባህላዊ ዳቦ የሚቀርብ።', price: '220 ETB' },
    { nameEn: 'East Star Club Sandwich', nameAm: 'ኢስት ስታር ክለብ ሳንድዊች', descEn: 'Triple-decker toasted bread with grilled chicken breast, fried egg, crisp lettuce, cheese layers, served with hand-cut French fries.', descAm: 'ባለ ሶስት ፎቅ የተጠበሰ ዳቦ ከተጠበሰ የዶሮ ስጋ፣ እንቁላል፣ ሰላጣና አይብ ጋር፣ ከድንች ጥብስ ጋር የሚቀርብ።', price: '380 ETB' },
    { nameEn: 'Gourmet Macchiato', nameAm: 'ልዩ ማኪያቶ', descEn: 'Rich local espresso shot layered perfectly with steamed local organic milk, crafted by professional baristas.', descAm: 'በአገር በቀል የቡና ፍሬዎች ተዘጋጅቶ በባለሙያዎች የተመረተ ጣፋጭ ማኪያቶ።', price: '60 ETB' },
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Editorial Header Section */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
            {language === 'en' ? 'EAST STAR FLAVORS' : 'ኢስት ስታር ጣዕሞች'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-1.5 leading-tight">
            {language === 'en' ? 'Authentic Ethiopian & Continental Dining' : 'የባህልና ዘመናዊ የምግብ ዝግጅቶች'}
          </h1>
          <p className="mt-3 text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            {language === 'en'
              ? 'Taste pristine ingredients sourced directly from local visual farms, alongside our famous organic coffee ceremony and refreshing sky terrace.'
              : 'ከአካባቢው ገበሬዎች በቀጥታ የተገዙ አትክልቶችና ፍራፍሬዎችን፣ ከተወዳጁ የባህል ቡና ሥነ-ስርዓት እና ክፍት የጣራ ባር ጋር ያጣጥሙ።'}
          </p>
        </div>
      </section>

      {/* Culinary highlights sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          
          {/* Highlight 1: Gourmet Buffet Breakfast */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative h-96">
              <LazyImage
                src={breakfastImg}
                alt="East Star Hotel Gourmet Buffet Breakfast"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-[4000ms] ease-out select-none"
                wrapperClassName="w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-amber-600 text-stone-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                {language === 'en' ? 'Included for Guests' : 'ለእንግዶች በነጻ'}
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block">
                {dining[0] ? (language === 'en' ? dining[0].tagEn : dining[0].tagAm) : 'Daily Service'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-100">
                {dining[0] ? (language === 'en' ? dining[0].nameEn : dining[0].nameAm) : 'Gourmet Buffet Breakfast'}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Hours: {dining[0] ? dining[0].hours : '6:30 AM - 10:00 AM'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                {dining[0] ? (language === 'en' ? dining[0].descriptionEn : dining[0].descriptionAm) : ''}
              </p>
              
              <div className="pt-4 border-t border-stone-900 flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-stone-900 border border-stone-800 text-amber-500">
                  <Coffee className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Traditional Jebena Coffee Ceremony' : 'በባህላዊ ጄበና የሚፈላ የቡና አቀራረብ'}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'en' ? 'Freshly roasted daily from organic Harar forest beans.' : 'በየቀኑ ከንፁህ የሐረር ጥሬ ቡና ፍሬዎች ተዘጋጅቶ በባህል የሚቀርብ።'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight 2: Sunset terrace escape */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative h-96">
              <LazyImage
                src={terraceImg}
                alt="East Star Hotel Rooftop Terrace Sunset View"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-[4000ms] ease-out select-none"
                wrapperClassName="w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur border border-stone-800 px-3 py-1 rounded text-xs text-amber-500 font-bold font-mono">
                {language === 'en' ? 'Receptive Guest Service' : 'አገልግሎት ለማዘዝ'}
              </div>
            </div>

            <div className="lg:w-1/2 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block">
                {dining[1] ? (language === 'en' ? dining[1].tagEn : dining[1].tagAm) : 'Evening Breeze Lounge'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-100">
                {dining[1] ? (language === 'en' ? dining[1].nameEn : dining[1].nameAm) : 'East Star Terrace & Bar'}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Hours: {dining[1] ? dining[1].hours : '12:00 PM - 11:30 PM'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                {dining[1] ? (language === 'en' ? dining[1].descriptionEn : dining[1].descriptionAm) : ''}
              </p>

              <div className="pt-4 border-t border-stone-900 flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-stone-900 border border-stone-800 text-amber-500">
                  <Utensils className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Fresh Cocktails & Local Beers' : 'ቀዝቃዛ የአገር ውስጥ መቅመሞችና ቢራዎች'}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'en' ? 'Complementary snacks served alongside cold draft options.' : 'ከሰገነቱ ላይ ሆነው ቀዝቃዛ ቢራዎችን ከቀለል ያሉ ምግቦች ጋር ይደሰቱ።'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Breakfast Menu Teaser sections */}
      <section className="bg-stone-900 border-y border-stone-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
              {language === 'en' ? 'REST EVALUATION' : 'የምግብ ዝርዝር'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-200 mt-1">
              {language === 'en' ? 'Popular Local Specials' : 'የተወደዱ የአካባቢ ምግቦች'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuTeasers.map((item, idx) => (
              <div 
                key={idx}
                className="bg-stone-950 p-6 rounded-xl border border-stone-850 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-sm text-stone-200">
                      {language === 'en' ? item.nameEn : item.nameAm}
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-500 shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed font-light">
                    {language === 'en' ? item.descEn : item.descAm}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-900 flex justify-between items-center text-[10px] text-stone-600 uppercase font-mono tracking-wider">
                  <span>★ Top Favorite</span>
                  <span>Organic Sourcing</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
