/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouting } from '../context/RoutingContext';
import { Wifi, Wind, Flame, ShieldAlert, Key, HelpCircle, RefreshCw, Compass, Car, Coffee } from 'lucide-react';

interface Amenity {
  titleEn: string;
  titleAm: string;
  descEn: string;
  descAm: string;
  icon: React.ReactNode;
}

export const Amenities: React.FC = () => {
  const { navigate, language } = useRouting();

  const amenityList: Amenity[] = [
    {
      titleEn: 'Complimentary Airport Shuttles',
      titleAm: 'የአየር ማረፊያ በነጻ ማመላለሻ',
      descEn: 'Avoid transfer hassles. We pick you up from Dire Dawa International Airport (10 mins away) in a comfortable private vehicle.',
      descAm: 'የጉዞ ውጥረትን ያስወግዱ። ከድሬዳዋ አለም አቀፍ ኤርፖርት (በ10 ደቂቃ ርቀት) በምቹ መኪና በነጻ እንወስድዎታለን።',
      icon: <Compass className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: 'Powerful Inverter Air-Conditioning',
      titleAm: 'ኃይለኛ የአየር ማቀዝቀዣ (ኤሲ)',
      descEn: 'Escape Dire Dawas high midday sun. Our quiet dual invertersplit units let you set the room to your exact preferred temperature.',
      descAm: 'የድሬዳዋን ፀሐይ ይከላከሉ። ጸጥተኛ ባለ ኢንቨርተር ኤሲ ክፍሉን ወደ ፈለጉት ቅዝቃዜ እንዲያስተካክሉ ያስችልዎታል።',
      icon: <Wind className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: 'Free High-Speed Fiber WiFi',
      titleAm: 'ፈጣን ነጻ የፋይበር ዋይፋይ',
      descEn: 'Dedicated fiber channel suitable for remote corporate duties, streaming, and lag-free video calls across all bedrooms.',
      descAm: 'በሁሉም ክፍሎች ውስጥ ለቪዲዮ ጥሪዎች፣ ፊልሞችና ለስራ የሚስማማ እጅግ ፈጣን ዋይፋይ ተዘጋጅቷል።',
      icon: <Wifi className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: 'Soothing Hot Tub Accessibility',
      titleAm: 'የሙቅ ገንዳ መታጠቢያ (ጃኩዚ)',
      descEn: 'Relax and recharge after travel inside our premium hot tub spa with customizable target jets.',
      descAm: 'ከረጅም ጉዞ ወይም ከድካም በኋላ በሙቅ ውሃ መታጠቢያ ጃኩዚያችን ውስጥ ዘና ይበሉና ድካምዎን ያርግፉ።',
      icon: <Flame className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: '24-Hour Gated Parking & Security',
      titleAm: 'የ24 ሰዓት ጥበቃና መኪና ማቆሚያ',
      descEn: 'Spacious on-site private concrete parking lot protected 24/7 by physical gate guards and CCTV cameras.',
      descAm: 'ሰፊና አስተማማኝ በሆነው በሆቴላችን ግቢ ውስጥ የመኪና ማቆሚያ፣ በ24 ሰዓት ጥበቃና በካሜራዎች የተጠበቀ።',
      icon: <Car className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: '24-Hour Reception Desk',
      titleAm: 'የ24 ሰዓት እንግዳ መቀበያ',
      descEn: 'Arrival after midnight? No problem. Our receptive and friendly receptionists are always present to help with luggage or requests.',
      descAm: 'ከእኩለ ሌሊት በኋላ መምጣት? ምንም ችግር የለም። የእኛ ተግባቢ የእንግዳ መቀበያ ሰራተኞች በማንኛውም ሰዓት እርስዎን ለመርዳት ዝግጁ ናቸው።',
      icon: <Key className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: 'Premium Laundry & Pressing',
      titleAm: 'የልብስ ማጠብና መተኮስ አገልግሎት',
      descEn: 'Keep your attire crisp. Same-day professional laundry and steam pressing options available at standard charges.',
      descAm: 'ልብሶችዎን ሁል ጊዜ ንፁህ ያድርጉ። በአንድ ቀን ውስጥ ታጥቦና ተተኩሶ የሚቀርብ የልብስ ማጠቢያ አገልግሎታችንን ይጠቀሙ።',
      icon: <RefreshCw className="w-6 h-6 text-amber-500" />
    },
    {
      titleEn: 'Complimentary Tea & Coffee',
      titleAm: 'የነጻ ሻይና ቡና ማዘጋጃ',
      descEn: 'In-room electric kettles with fine brand teabags, sugar, and organic ground coffee replenished every single morning.',
      descAm: 'በየቀኑ ጠዋት የሚታደሱ የሻይ፣ የስኳር እና የአገር ውስጥ ጣፋጭ የቡና አይነቶች ከነማፍያ ማሽን ጋር በክፍልዎ ውስጥ ይገኛሉ።',
      icon: <Coffee className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Editorial Header Section */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
            {language === 'en' ? 'EAST STAR CONVENIENCES' : 'የኢስት ስታር አገልግሎቶች'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-1.5 leading-tight">
            {language === 'en' ? 'Refined Comfort for High-End Lodging' : 'ለእንግዶች ምቾት የተዘጋጁ አገልግሎቶች'}
          </h1>
          <p className="mt-3 text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            {language === 'en'
              ? 'Our property offers meticulous layout specifications and logistical assistance to ensure a completely effortless travel stay.'
              : 'ከጉዞ ጀምሮ እስከ መቆየት ድረስ ያለ ምንም ጭንቀት እንዲያልፍ የሚያደርጉ ዘመናዊ መስተንግዶዎችን አሟልተናል።'}
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenityList.map((amen, idx) => (
            <div 
              key={idx}
              className="bg-stone-900/40 p-6 rounded-xl border border-stone-850 hover:border-stone-700/80 hover:bg-stone-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-stone-950 flex items-center justify-center border border-stone-800 mb-4">
                  {amen.icon}
                </div>
                
                <h3 className="font-serif text-sm font-semibold text-stone-200">
                  {language === 'en' ? amen.titleEn : amen.titleAm}
                </h3>
                
                <p className="text-[11px] text-stone-500 leading-relaxed mt-2 font-light">
                  {language === 'en' ? amen.descEn : amen.descAm}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-900 mt-4 flex items-center justify-between text-[9px] text-stone-600 font-mono uppercase tracking-wider">
                <span>Verified 4-Star</span>
                <span>Active 24/7</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust reassurance banner */}
      <section className="bg-stone-900 border-t border-stone-800 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <HelpCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h3 className="font-serif text-stone-200 text-lg">
            {language === 'en' ? 'Need Additional Logistics?' : 'ተጨማሪ ልዩ አገልግሎት ይፈልጋሉ?'}
          </h3>
          <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
            {language === 'en' 
              ? 'Do you require local SIM card configuration, currency exchanges, business document printing, or tour guides for Harar day trips? Contact our 24-hour Sabiyan desk. We assist at no premium markup.'
              : 'የአገር ውስጥ ሲም ካርድ መግዛት፣ የገንዘብ ምንዛሬ፣ ሰነድ ማተም ወይም ወደ ሐረር ለሚደረጉ ጉዞዎች አስጎብኚዎችን ይፈልጋሉ? የእኛን የ24 ሰዓት የእንግዳ መቀበያ ይጠይቁ፣ በፈገግታ እንረዳዎታለን።'}
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-6 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-2.5 px-6 rounded text-xs uppercase tracking-widest cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Get In Touch' : 'ያነጋግሩን'}
          </button>
        </div>
      </section>

    </div>
  );
};
