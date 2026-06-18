/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useRouting } from '../context/RoutingContext';
import { Mail, Phone, MapPin, Facebook, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, language, hotelInfo, footerConfig } = useRouting();

  // Dynamically inject schema.org JSON-LD structured data for Google SEO
  useEffect(() => {
    // Hotel Schema definition
    const hotelSchema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": "East Star Hotel Dire Dawa",
      "alternateName": "ኢስት ስታር ሆቴል",
      "description": "Premium 4-star lodging in Dire Dawa, Ethiopia featuring clean air-conditioned rooms, free airport transfer, gourmet breakfast, and rooftop terrace.",
      "image": [
        "https://ais-pre-lcbxgj4nx3v6fmaqzlsdgq-324701257443.europe-west1.run.app/src/assets/images/east_star_exterior_1780046580471.png",
        "https://ais-pre-lcbxgj4nx3v6fmaqzlsdgq-324701257443.europe-west1.run.app/src/assets/images/east_star_suite_1780046599778.png"
      ],
      "telephone": "+251967222224",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sabiyan Street",
        "addressLocality": "Dire Dawa",
        "addressRegion": "Dire Dawa",
        "addressCountry": "ET"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 9.6105,
        "longitude": 41.8592
      },
      "url": "https://ais-pre-lcbxgj4nx3v6fmaqzlsdgq-324701257443.europe-west1.run.app",
      "starRating": {
        "@type": "Rating",
        "ratingValue": 4
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 38,
        "bestRating": 5
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Free High-Speed WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Dual Inverter AC", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Complimentary Airport shuttle", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free private parking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Rooftop terrace and lounge", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Hot Tub", "value": true }
      ]
    };

    const scriptId = 'schema-hotel-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(hotelSchema);

    return () => {
      // Clean up script on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#1a2e26] text-[#dfded9] border-t border-[#e5e1d8]/10 pt-16 pb-8 font-sans shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission section */}
          <div>
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-lg font-serif font-bold text-amber-500 tracking-wider">EAST STAR</span>
              <span className="text-[#fdfcf8] font-serif font-light text-sm">HOTEL</span>
            </div>
            <p className="text-xs text-[#bfbbb3] leading-relaxed mb-6">
              {language === 'en' 
                ? 'Delivering standard-setting hospitality, immaculate room cleanliness, and responsive service. Situated in Dire Dawa’s premier administrative and residential street, Sabiyan.'
                : 'ለየት ያለ መስተንግዶን፣ ፍፁም የክፍሎች ፅዳት እና ፈጣን አገልግሎትን እናቀርባለን። በድሬዳዋ ውብ፣ ፀጥተኛና አስተማማኝ በሆነው በሳቢያን ሰፈር ውስጥ ይገኛል።'}
            </p>
            <div className="flex gap-4">
              <a 
                href={footerConfig?.facebookUrl || "https://facebook.com/eaststarhotel.dd"} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12211b] border border-[#23352d] flex items-center justify-center hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-200 cursor-pointer"
                aria-label="Follow East Star Hotel on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <div className="text-[#8c867a] text-xs flex items-center">
                Facebook Official
              </div>
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div>
            <h3 className="text-[#fdfcf8] font-bold text-xs uppercase tracking-widest border-s-2 border-amber-500 ps-2 mb-4">
              {language === 'en' ? 'EXPLORE' : 'አገናኞች'}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { nameEn: 'Guest Rooms & Suites', nameAm: 'እንግዳ ክፍሎችና ስዊቶች', path: '/rooms' },
                { nameEn: 'Dining & Rooftop Lounge', nameAm: 'ምግብ ሰገነት እና ባር', path: '/dining' },
                { nameEn: 'Premium Amenities', nameAm: 'ልዩ አገልግሎቶች', path: '/amenities' },
                { nameEn: 'Our Location & Map', nameAm: 'አድራሻችንና ካርታ', path: '/location' },
                { nameEn: 'About Our Hotel', nameAm: 'ስለ ሆቴላችን', path: '/about' },
                { nameEn: 'Customer Reviews', nameAm: 'የደንበኞች ምስክርነት', path: '/reviews' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.path)}
                    className="hover:text-amber-500 transition-colors text-[#dfded9] hover:underline text-left cursor-pointer"
                  >
                    • {language === 'en' ? link.nameEn : link.nameAm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Address & Proximity */}
          <div>
            <h3 className="text-[#fdfcf8] font-bold text-xs uppercase tracking-widest border-s-2 border-amber-500 ps-2 mb-4">
              {language === 'en' ? 'LOCATION' : 'አድራሻ'}
            </h3>
            <div className="space-y-4 text-xs text-[#dfded9]">
              <div className="flex gap-2.5">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-[#fdfcf8]">
                    {language === 'en' ? 'Sabiyan Quarter' : 'ሳቢያን ሰፈር'}
                  </p>
                  <p className="mt-0.5 leading-relaxed text-[#bfbbb3]">
                    {language === 'en' ? (footerConfig?.addressEn || hotelInfo.addressEn) : (footerConfig?.addressAm || hotelInfo.addressAm || hotelInfo.addressEn)}
                  </p>
                </div>
              </div>
              
              <div className="bg-[#12211b] border border-[#23352d] p-3 rounded-md">
                <p className="text-[11px] font-bold text-amber-500 mb-1 flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Airport Proximity' : 'ከአውሮፕላን ማረፊያ'}
                </p>
                <p className="text-[11px] leading-relaxed text-[#bfbbb3]">
                  {language === 'en' 
                    ? 'Only 5.5 km (10-minute drive) from Dire Dawa International Airport (ABA). Complimentary shuttle provided.'
                    : 'ከድሬዳዋ ዓለም አቀፍ አውሮፕላን ማረፊያ (ABA) 5.5 ኪ.ሜ (በ10 ደቂቃ ብቻ)። በነጻ የሚመላለስ ማመላለሻ ተዘጋጅቷል።'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact and Booking details */}
          <div>
            <h3 className="text-[#fdfcf8] font-bold text-xs uppercase tracking-widest border-s-2 border-amber-500 ps-2 mb-4">
              {language === 'en' ? 'BOOKINGS' : 'ቦታ ማስያዣ'}
            </h3>
            <div className="space-y-3 text-xs">
              <p className="text-[#bfbbb3] leading-relaxed mb-2 font-light">
                {language === 'en'
                  ? 'Contact our 24-hour reception desk directly or send a WhatsApp message to book with the best guaranteed rates.'
                  : 'የ24-ሰዓት አቀባበል ጠረጴዛችንን በቀጥታ ያግኙ ወይም በምርጥ ዋጋ ዋስትና ለመያዝ የዋትስአፕ መልዕክት ይላኩ።'}
              </p>
              
              <a 
                href={`tel:${(footerConfig?.phone1 || hotelInfo.phone1).replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-[#dfded9] hover:text-amber-500 transition-colors"
                aria-label="Call reservation line 1"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-mono font-medium">{footerConfig?.phone1 || hotelInfo.phone1}</span>
              </a>

              <a 
                href={`tel:${(footerConfig?.phone2 || hotelInfo.phone2).replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-[#dfded9] hover:text-amber-500 transition-colors"
                aria-label="Call reservation line 2"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-mono font-medium">{footerConfig?.phone2 || hotelInfo.phone2}</span>
              </a>

              <div className="flex items-center gap-2 text-[#dfded9]">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[11px]">{footerConfig?.email || 'eaststarhotel.diredawa@gmail.com'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer micro elements */}
        <div className="pt-8 border-t border-[#23352d] flex flex-col md:flex-row justify-between items-center text-xs text-[#8c867a] gap-4">
          <div className="flex items-center gap-1.5 order-2 md:order-1 font-light">
            <span>
              {language === 'en' 
                ? (footerConfig?.copyrightEn || `© ${new Date().getFullYear()} East Star Hotel. All rights reserved.`)
                : (footerConfig?.copyrightAm || `© ${new Date().getFullYear()} ኢስት ስታር ሆቴል ። መብቱ በህግ የተጠበቀ ነው።`)}
            </span>
          </div>
          
          <div className="flex items-center gap-6 order-1 md:order-2 text-[#bfbbb3]">
            <span className="flex items-center gap-1 text-[11px] font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'en' ? 'Classified 4-Star Standard' : 'ባለ 4 ኮከብ ደረጃ ደረጃ'}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'en' ? 'Top Cleanliness Score 2026' : 'ምርጥ የፅዳት ደረጃ 2026'}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
