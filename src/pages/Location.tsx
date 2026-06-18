/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouting } from '../context/RoutingContext';
import { MapPin, Compass, Train, Clock, Plane, Compass as OutpostIcon, Footprints } from 'lucide-react';

interface Attraction {
  nameEn: string;
  nameAm: string;
  distanceEn: string;
  distanceAm: string;
  descEn: string;
  descAm: string;
  icon: React.ReactNode;
}

export const Location: React.FC = () => {
  const { language, hotelInfo } = useRouting();

  // Coordinates: Sabiyan, Dire Dawa, Ethiopia
  // Google maps embedding source for Dire Dawa
  const mapIframeUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15738.995932599763!2d41.8492025701!3d9.6105051996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163101eb20eb07fd%3A0xe84ad1f4f5fcdbbf!2sDire%20Dawa!5e0!3m2!1sen!2set!4v1716972210000!5m2!1sen!2set";

  const attractionList: Attraction[] = [
    {
      nameEn: 'Dire Dawa International Airport (ABA)',
      nameAm: 'ድሬዳዋ አውሮፕላን ማረፊያ (ABA)',
      distanceEn: '5.5 km • 10-Min Drive',
      distanceAm: '5.5 ኪ.ሜ • በ10 ደቂቃ መኪና',
      descEn: 'Connected via a beautiful smooth asphalt avenue. We monitor flights and provide complimentary chauffeured guest pickups.',
      descAm: 'በጥሩ አስፋልት መንገድ በቀጥታ የተገናኘ። ሆቴላችን የአውሮፕላን ጉዞዎን በመከታተል የነጻ አየር ማረፊያ መኪና ያዘጋጅልዎታል።',
      icon: <Plane className="w-5 h-5 text-amber-500" />
    },
    {
      nameEn: 'Historic Walled City of Harar Jugol',
      nameAm: 'ታሪካዊቷ የሐረር ጀጎል ግንብ ከተማ',
      distanceEn: '45 km • 55-Min Scenic Drive',
      distanceAm: '45 ኪ.ሜ • ባለ 55 ደቂቃ አስደናቂ ጉዞ',
      descEn: 'A breathtaking mountain drive to the UNESCO World Heritage site. Explore ancient mosques, deep alleyways, and the famous evening hyena feeding rituals.',
      descAm: 'በተራሮች ላይ መኪና እየነዱ የዩኔስኮ የዓለም ቅርስ የሆነችውን የሐረርን አሮጌ ከተማ፣ መስጊዶችንና በምሽት የሚደረገውን የጅብ መመገቢያ ስነስርዓት ይጎብኙ።',
      icon: <OutpostIcon className="w-5 h-5 text-amber-500" />
    },
    {
      nameEn: 'Kefira Traditional Open-Air Market',
      nameAm: 'የከፊራ ባህላዊ ክፍት የገበያ ቦታ',
      distanceEn: '3.0 km • 8-Min Drive',
      distanceAm: '3.0 ኪ.ሜ • በ8 ደቂቃ መኪና',
      descEn: 'Witness a buzzing local trading hub where Somali camel caravans, Oromo agricultural traders, and Afar merchants converge with exotic spices.',
      descAm: 'የሶማሊያ የግመል ተሳፋሪዎች፣ የኦሮሞ ገበሬዎች እና የአፋር ነጋዴዎች በተለያዩ የቅመማ ቅመሞች የሚገበያዩበትን ልዩ ድባብ ይመልከቱ።',
      icon: <Footprints className="w-5 h-5 text-amber-500" />
    },
    {
      nameEn: 'Taiwan Modern Electronics Market',
      nameAm: 'ታይዋን የኤሌክትሮኒክስ መጋዘን ገበያ',
      distanceEn: '2.5 km • 6-Min Drive',
      distanceAm: '2.5 ኪ.ሜ • በ6 ደቂቃ መኪና',
      descEn: 'A high-energy central commerce district in Dire Dawa packed with import boutiques, electronics, and authentic street-food stalls.',
      descAm: 'የአገር ውስጥና የማስመጫ ምርቶች፣ ኤሌክትሮኒክስና ባህላዊ የጎዳና ላይ ምግቦች በከፍተኛ ጉልበት የሚሸጡበት የከተማዋ እምብርት።',
      icon: <Compass className="w-5 h-5 text-amber-500" />
    },
    {
      nameEn: 'Historic Franco-Ethiopian Railway Station',
      nameAm: 'የቀድሞው የኢትዮ-ፈረንሳይ ምድር ባቡር ጣቢያ',
      distanceEn: '2.2 km • 5-Min Drive',
      distanceAm: '2.2 ኪ.ሜ • በ5 ደቂቃ መኪና',
      descEn: 'Constructed around 1913, these majestic European-style stations and train hangars define the rich architectural foundation of Dire Dawa.',
      descAm: 'በ1913 የተሰራውና የከተማዋን ውብ የስነ-ህንፃ መሰረት የጣለው የቀድሞው የፈረንሳይ-ኢትዮጵያ ታላቅ የምድር ባቡር ሃንጋር።',
      icon: <Train className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Editorial Header Section */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold">
            {language === 'en' ? 'EAST STAR COORDINATES' : 'የእኛ አድራሻ'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-1.5 leading-tight">
            {language === 'en' ? 'Tranquil Sabiyan Quarter' : 'በድሬዳዋ ውቧ ሳቢያን ሰፈር'}
          </h1>
          <p className="mt-3 text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            {language === 'en'
              ? 'Enjoy the secure, clean administrative sector of Dire Dawa—quiet after dark, yet only minutes from airport, train terminals, and cultural spots.'
              : 'ፀጥተኛና በፅዳቱ ተመራጭ በሆነው በሳቢያን አስተዳደር ሰፈር ውስጥ ይረፉ። ወደ አውሮፕላን ማረፊያ፣ የባቡር ጣቢያና ባህላዊ ገበያዎች በደቂቃዎች ይገናኛል።'}
          </p>
        </div>
      </section>

      {/* Map Embed and Proximity Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Iframe section */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-stone-800 bg-stone-900 h-[380px] lg:h-auto shadow-2xl flex flex-col justify-between">
            {/* Real responsive responsive Google Map Iframe */}
            <iframe
              title="East Star Hotel Location Map"
              src={mapIframeUrl}
              className="w-full h-full border-0 select-none grayscale invert"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Location copy card */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 p-8 rounded-xl flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block">
                {language === 'en' ? 'DIRECTIONS BRIEFING' : 'የአድራሻ ዝርዝር'}
              </span>
              
              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-stone-200">
                    {language === 'en' ? 'Premium Sabiyan Street' : 'ሳቢያን ህንፃ ሰፈር'}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mt-1 font-light">
                    {hotelInfo.addressEn}
                  </p>
                </div>
              </div>

              <div className="bg-stone-950 p-4 rounded border border-stone-850 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-medium font-sans">
                  <Clock className="w-4.5 h-4.5 text-amber-500" />
                  <span>{language === 'en' ? 'Estimated Drive Durations' : 'ለመድረስ የሚፈጅ የጉዞ ጊዜ'}</span>
                </div>
                
                <ul className="text-stone-500 text-[11px] space-y-1.5 font-mono">
                  <li className="flex justify-between">
                    <span>{language === 'en' ? 'Dire Dawa Airport' : 'ድሬዳዋ አውሮፕላን ማረፊያ'}</span>
                    <span className="text-amber-550">10 Mins (5.5 km)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{language === 'en' ? 'Furi-Lebu Railway Terminal' : 'የምድር ባቡር ጣቢያ'}</span>
                    <span className="text-amber-550">12 Mins (7.0 km)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{language === 'en' ? 'Ancient Harar Walled City' : 'የሐረር ጀጎል ግንብ'}</span>
                    <span className="text-amber-550">55 Mins (45.0 km)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800/80 mt-6 md:mt-0">
              <a 
                href="https://maps.google.com/?q=Dire+Dawa+Ethiopia" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3 px-4 rounded text-xs uppercase tracking-widest cursor-pointer transition-colors"
              >
                {language === 'en' ? 'Open in Google Maps App' : 'በጉግል ካርታ ክፈት'}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Attractions Listings to enrich stay */}
      <section className="bg-stone-900 border-t border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block">
              {language === 'en' ? 'LOCAL SIGHTSEEING' : 'የአካባቢ መጎብኛዎች'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-200 mt-1">
              {language === 'en' ? 'Popular Nearby Attractions' : 'ታዋቂ የድሬዳዋና አካባቢዋ መጎብኛዎች'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractionList.map((attr, idx) => (
              <div 
                key={idx}
                className="bg-stone-950 p-6 rounded-xl border border-stone-850 hover:border-stone-800 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-stone-900 border border-stone-850 flex items-center justify-center">
                      {attr.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-stone-200">
                        {language === 'en' ? attr.nameEn : attr.nameAm}
                      </h3>
                      <span className="text-[10px] text-amber-500/90 font-mono font-semibold">
                        {language === 'en' ? attr.distanceEn : attr.distanceAm}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                    {language === 'en' ? attr.descEn : attr.descAm}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
