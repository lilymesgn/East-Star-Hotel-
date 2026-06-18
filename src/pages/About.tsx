/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouting } from '../context/RoutingContext';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { LazyImage } from '../components/LazyImage';

export const About: React.FC = () => {
  const { navigate, language, hotelInfo, aboutConfig } = useRouting();

  const exteriorPic = aboutConfig?.exteriorPic || '/src/assets/images/east_star_exterior_1780046580471.png';
  const terracePic = aboutConfig?.terracePic || '/src/assets/images/east_star_terrace_1780046634963.png';

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Editorial Header Section */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
            {language === 'en' ? 'OUR HERITAGE & MISSION' : 'ታሪካችንና አላማችን'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-2 leading-tight">
            {language === 'en' 
              ? 'Premier Ethiopian Hospitality' 
              : 'እጅግ የላቀ መስተንግዶ በድሬዳዋ'}
          </h1>
          <p className="mt-4 text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            {language === 'en'
              ? 'East Star Hotel combines contemporary 4-star luxury with the warm, generous soul of traditional Ethiopian hospitality in the heart of Dire Dawa.'
              : 'ኢስት ስታር ሆቴል በድሬዳዋ እምብርት ውስጥ ዘመናዊ ባለ 4 ኮከብ የቅንጦት ሁኔታን እና ባህላዊውን ሞቅ ያለ የኢትዮጵያ መስተንግዶን በአንድነት ያጣምራል።'}
          </p>
        </div>
      </section>

      {/* Narrative grid with images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photos collage layout */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-xl overflow-hidden border border-stone-800">
                <LazyImage
                  src={exteriorPic}
                  alt="East Star Hotel Exterior photography"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  wrapperClassName="w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-amber-600/10 border border-amber-500/20 p-6 rounded-xl text-center">
                <span className="block text-4xl font-serif font-bold text-amber-500">4.4 / 5</span>
                <span className="block text-xs uppercase tracking-wider text-stone-400 mt-1 font-mono">Tripadvisor Rating</span>
              </div>
            </div>
            <div className="pt-8 sm:pt-4">
              <div className="h-80 rounded-xl overflow-hidden border border-stone-800">
                <LazyImage
                  src={terracePic}
                  alt="Rooftop terrace lounge at East Star"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  wrapperClassName="w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Copy section */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block">
              {language === 'en' ? 'ESTABLISHED COMFORT' : 'ምቹ መስተንግዶ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-100">
              {language === 'en' 
                ? 'A Sanctuary Refined for Corporate & Leisure Travelers'
                : 'ለቢዝነስና ለመዝናኛ ተጓዦች ምቹ ማረፊያ'}
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              {language === 'en' 
                ? (aboutConfig?.paragraph1En || 'Opened as a newer contemporary property, East Star Hotel has quickly earned top rankings for value, cleanliness, and helpful front desk service. Our rooms represent neat modern sanctuaries: each includes state-of-the-art whisper-quiet AC units, custom high-density orthopedic bedding, smart satellite television setups, and high-pressure rainfall water heaters.')
                : (aboutConfig?.paragraph1Am || 'ኢስት ስታር ሆቴል በድሬዳዋ ከተማ ውስጥ ለጥራት፣ ለካናማ ፅዳት እና ለረዳት የፊት ጠረጴዛ ሰራተኞች አገልግሎት በአጭር ጊዜ ውስጥ ከፍተኛ ደረጃን አግኝቷል። እያንዳንዱ ክፍል በጥንቃቄ የተሰሩ ናቸው፡ የአየር ማቀዝቀዣ፣ በጣም ምቹ የካናማ አልጋ፣ ስማርት ሳተላይት ቴሌቪዥን እና ዘመናዊ መታጠቢያ ቤቶችን ያካትታሉ።')}
            </p>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              {language === 'en'
                ? (aboutConfig?.paragraph2En || 'Perfectly situated in the pristine, upscale residential community of Sabiyan, our guests escape the heavy central commerce noise while staying key minutes from crucial landmarks. The Dire Dawa International Airport sits only 10 minutes away, making business commutes effortless.')
                : (aboutConfig?.paragraph2Am || 'በድሬዳዋ ውብና ፀጥተኛ በሆነው በሳቢያን ሰፈር ውስጥ የሚገኝ በመሆኑ እንግዶቻችን ከጩኸት የራቀ ምሽት ማግኘት ይችላሉ። ከድሬዳዋ አለም አቀፍ አውሮፕላን ማረፊያ በ10 ደቂቃ ርቀት ላይ የሚገኝ መሆኑ ለስራ ጉዳዮች እጅግ ምቹ ያደርገዋል።')}
            </p>

            {/* Micro value badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-900">
              <div className="flex gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Immaculate Hygiene' : 'ከፍተኛ የፅዳት ደረጃ'}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{language === 'en' ? 'Highest safety standard' : 'ዘመናዊ የንፅህና ጥበቃ'}</p>
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                <Heart className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Friendly Service' : 'ትሁት ሰራተኞች'}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{language === 'en' ? '24/7 client care' : 'የ24 ሰዓት ቀጣይ እንክብካቤ'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values / Service Promise Banner */}
      <section className="bg-stone-900 border-y border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-stone-950 border border-stone-800/80 p-8 rounded-xl max-w-3xl mx-auto mb-16 text-center shadow-lg">
            <span className="block text-xs uppercase tracking-widest text-amber-500 font-mono font-bold mb-2">Our Mission</span>
            <p className="text-base sm:text-lg font-serif italic text-stone-200">
              "{language === 'en' ? (aboutConfig?.missionEn || 'To define absolute cleanliness and premium hospitality value in Eastern Ethiopia, ensuring every guest enjoys a peaceful, tidy, and safe stay.') : (aboutConfig?.missionAm || 'በምስራቅ ኢትዮጵያ ውስጥ ፍፁም ንፅህናን እና የላቀ መስተንግዶን መግለፅ ፣ እያንዳንዱ እንግዳ ሰላማዊ ፣ ንፁህ እና ደህንነቱ የተጠበቀ ቆይታ እንዲደሰት ማድረግ።')}"
            </p>
            {aboutConfig?.staffInfoEn && (
              <p className="text-xs text-stone-400 mt-4 leading-relaxed max-w-xl mx-auto font-light">
                {language === 'en' ? aboutConfig.staffInfoEn : aboutConfig.staffInfoAm}
              </p>
            )}
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
              {language === 'en' ? 'THE EAST STAR STANDARD' : 'የኢስት ስታር የአግልግሎት ቃል'}
            </h3>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-200 mt-1">
              {language === 'en' ? 'Our Hospitality Commitments' : 'አገልግሎታችንን ልዩ የሚያደርጉ ማረጋገጫዎች'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              {
                titleEn: '100% Cotton Linens',
                titleAm: '100% ጥጥ አንሶላዎች',
                descEn: 'We sanitize all linens on high temperature cycles daily, ensuring a fresh luxury sleep experience.',
                descAm: 'ለሁለተኛ የማይደገም አዲስና ንፁህ እንቅልፍ እንዲያገኙ ሁሉንም አንሶላዎች በየቀኑ በከፍተኛ ሙቀት እናጥባለን።',
                icon: <Sparkles className="w-6 h-6 text-amber-500" />
              },
              {
                titleEn: 'Always Air-Conditioned',
                titleAm: 'አስተማማኝ የአየር ማቀዝቀዣ',
                descEn: 'Our modern noiseless dual-inverter split AC systems keep you refreshingly cool from Dire Dawas sun.',
                descAm: 'የድሬዳዋን ሞቃት የአየር ሁኔታ ለመቋቋም እያንዳንዱ ክፍል ላይ ድምፅ አልባ ዘመናዊ ኤሲ ተገጥሟል።',
                icon: <Award className="w-6 h-6 text-amber-500" />
              },
              {
                titleEn: 'Secure Parking & Desk',
                titleAm: 'የተጠበቀ የመኪና ማቆሚያ',
                descEn: 'Our gate features 24-hour physical security, spacious car lot, and receptive front desk.',
                descAm: 'የ24-ሰዓት ጥበቃ እና ሰፊ የመኪና ማቆሚያ ጨምሮ ሞቅ ያለ አቀባበል የሚያደርግ የእንግዳ መቀበያ አለን።',
                icon: <MapPin className="w-6 h-6 text-amber-500" />
              },
              {
                titleEn: 'Complimentary Pick-up',
                titleAm: 'ነጻ የአየር ማረፊያ መኪና',
                descEn: 'We coordinate seamless airport shuttles directly to our property to take away travel stress.',
                descAm: 'ከአውሮፕላን ማረፊያ በቀጥታ በእርጋታ ወደ ሆቴላችን የሚያደርስዎ መኪና በነጻ እናዘጋጃለን።',
                icon: <Compass className="w-6 h-6 text-amber-500" />
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-stone-950 p-6 rounded-lg border border-stone-800">
                <div className="mx-auto w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="font-serif text-sm font-semibold text-stone-200">
                  {language === 'en' ? value.titleEn : value.titleAm}
                </h4>
                <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                  {language === 'en' ? value.descEn : value.descAm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action Box */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h3 className="text-xl sm:text-2xl font-serif text-stone-100">
          {language === 'en' ? 'Experience East Star Hotel on Your Next Trip' : 'በቀጣይ ጉዞዎ የኢስት ስታርን መስተንግዶ ይፈትሹ'}
        </h3>
        <p className="text-xs text-stone-400 mt-2 leading-relaxed max-w-xl mx-auto">
          {language === 'en'
            ? 'Whether you are in Dire Dawa for specialized corporate business or a scenic cultural tour of Harar, we are ready to host you.'
            : 'ለቢዝነስ ጉዳይ ወይም በድሬዳዋ በኩል ወደ ሐረር ለምታደርጉት ጉዞ ሞቅ ያለ መስተንግዶዎን እኛ ዘንድ ያገኛሉ።'}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/rooms')}
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3 px-6 rounded-md text-xs uppercase tracking-widest cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Browse Guest Rooms' : 'ክፍሎችን ይመልከቱ'}
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="bg-transparent border border-stone-800 hover:bg-stone-900 text-stone-300 py-3 px-6 rounded-md text-xs uppercase tracking-widest cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Book Direct Proposal' : 'ቦታ ያስይዙ'}
          </button>
        </div>
      </section>

    </div>
  );
};
