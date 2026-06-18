/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Room, 
  Review, 
  DiningItem, 
  BookingInquiry, 
  Language, 
  HotelInfo,
  HeaderConfig,
  HeroConfig,
  AboutConfig,
  FooterConfig,
  ContactMapConfig,
  SeoConfig,
  PromotionOffer,
  MediaImage
} from '../types';

interface RoutingContextType {
  page: string;
  navigate: (path: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Rooms Manager
  rooms: Room[];
  updateRoom: (room: Room) => void;
  addRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  
  // Reviews Manager
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addReviewFull: (review: Review) => void;
  deleteReview: (id: string) => void;
  
  // Dining Manager
  dining: DiningItem[];
  addDiningItem: (item: DiningItem) => void;
  updateDiningItem: (item: DiningItem) => void;
  deleteDiningItem: (id: string) => void;
  
  // Booking/Reservations Manager
  inquiries: BookingInquiry[];
  addInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'status' | 'dateSubmitted'>) => void;
  addManualBooking: (inquiry: BookingInquiry) => void;
  updateInquiryStatus: (id: string, status: 'Pending' | 'Confirmed' | 'Cancelled' | 'CheckedIn' | 'CheckedOut') => void;
  deleteInquiry: (id: string) => void;
  
  // Dynamic settings mapping the 12 administrative managers
  headerConfig: HeaderConfig;
  updateHeaderConfig: (config: HeaderConfig) => void;
  
  heroConfig: HeroConfig;
  updateHeroConfig: (config: HeroConfig) => void;
  
  aboutConfig: AboutConfig;
  updateAboutConfig: (config: AboutConfig) => void;
  
  footerConfig: FooterConfig;
  updateFooterConfig: (config: FooterConfig) => void;
  
  contactMapConfig: ContactMapConfig;
  updateContactMapConfig: (config: ContactMapConfig) => void;
  
  seoConfig: SeoConfig;
  updateSeoConfig: (config: SeoConfig) => void;
  
  promotions: PromotionOffer[];
  addPromotion: (promo: PromotionOffer) => void;
  updatePromotion: (promo: PromotionOffer) => void;
  deletePromotion: (id: string) => void;
  
  mediaImages: MediaImage[];
  addMediaImage: (img: MediaImage) => void;
  deleteMediaImage: (id: string) => void;
  
  hotelInfo: HotelInfo;
  updateHotelInfo: (info: HotelInfo) => void;
}

const RoutingContext = createContext<RoutingContextType | undefined>(undefined);

const DEFAULT_IMAGES = {
  exterior: '/src/assets/images/east_star_exterior_1780046580471.png',
  suite: '/src/assets/images/east_star_suite_1780046599778.png',
  dining: '/src/assets/images/east_star_dining_1780046617416.png',
  terrace: '/src/assets/images/east_star_terrace_1780046634963.png',
  standardRoom: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
  twinRoom: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
};

const DEFAULT_ROOMS: Room[] = [
  {
    id: 'deluxe',
    nameEn: 'Deluxe Balcony Suite',
    nameAm: 'ዴሉክስ የሰገነት ስዊት',
    priceUSD: 65,
    priceETB: 7500,
    descriptionEn: 'The pinnacle of comfort in Dire Dawa. Features a private glass-door balcony offering elegant views of the cityscape. Equipped with quiet dual-inverter AC, a deep king bed with local Habesha textile highlights, reading desk, rainfall shower, and flat screen Smart TV.',
    descriptionAm: 'ድሬዳዋ ውስጥ የመጨረሻው የቅንጦት መኖሪያ። የከተማዋን ውብ እይታዎች የሚያሳይ ሰፊ የብርጭቆ በረንዳ ያካትታል። ጸጥተኛ ባለሁለት ኢንቨርተር የአየር ማቀዝቀዣ፣ በጥራት የተሠራ ባለ ትልቅ (ኪንግ) አልጋ በሀበሻ ጥበብ ያጌጠ፣ የስራ ጠረጴዛ፣ ሻወር እና ስማርት ቲቪ አለው።',
    amenitiesEn: ['AC', 'Private Balcony', 'High-Speed WiFi', 'City View', 'Rainfall Shower', 'Minibar', 'Smart TV'],
    amenitiesAm: ['የአየር ማቀዝቀዣ', 'የግል በረንዳ', 'ፈጣን ዋይፋይ', 'የከተማ እይታ', 'ዘመናዊ ሻወር', 'ሚኒባር', 'ስማርት ቲቪ'],
    maxGuests: 2,
    bedTypeEn: '1 King Bed',
    bedTypeAm: '1 ባለ ትልቅ ኪንግ አልጋ',
    sizeSqM: 42,
    image: DEFAULT_IMAGES.suite,
    rating: 4.8,
  },
  {
    id: 'standard',
    nameEn: 'Standard Comfort King',
    nameAm: 'ስታንዳርድ ምቹ ኪንግ',
    priceUSD: 45,
    priceETB: 5200,
    descriptionEn: 'An exceptional value offering immaculate cleanliness and premium bedding. This air-conditioned retreat boasts a modern private workspace, high-speed WiFi, mini fridge, and beautiful contemporary design perfect for solo travelers or working executives.',
    descriptionAm: 'ለትክክለኛው ዋጋ የላቀ ፅዳት እና ምቹ አልጋ የሚሰጥ ልዩ ክፍል። ይህ የአየር ማቀዝቀዣ ያለው ክፍል ዘመናዊ የስራ ቦታ፣ ፈጣን ዋይፋይ፣ ሚኒ ፍሪጅ እና ዘመናዊ ዲዛይን አለው። ለቢዝነስ ተጓዦች እና ለጥንዶች እጅግ ተስማሚ ነው።',
    amenitiesEn: ['AC', 'High-Speed WiFi', 'Work Desk', 'Mini Fridge', 'Immaculate Cleanliness', 'Private Bathroom', 'Safe Box'],
    amenitiesAm: ['የአየር ማቀዝቀዣ', 'ፈጣን ዋይፋይ', 'የስራ ጠረጴዛ', 'ሚኒ ፍሪጅ', 'ፍፁም ፅዳት', 'የግል መታጠቢያ ቤት', 'የደህንነት ሳጥን'],
    maxGuests: 2,
    bedTypeEn: '1 Queen Bed',
    bedTypeAm: '1 ኩዊን ሲንግል አልጋ',
    sizeSqM: 28,
    image: DEFAULT_IMAGES.standardRoom,
    rating: 4.5,
  },
  {
    id: 'twin',
    nameEn: 'Executive Twin Room',
    nameAm: 'ኤክስኪውቲቭ ባለሁለት አልጋ ክፍል',
    priceUSD: 55,
    priceETB: 6400,
    descriptionEn: 'Perfect for business partners, colleagues, or families. This highly spacious room includes two custom comfortable twin beds, independent lighting, work area, free tea and coffee makers, and a bright and modern bathroom.',
    descriptionAm: 'ለስራ ባልደረቦች ወይም ለቤተሰብ እጅግ ተስማሚ። ይህ ሰፊ ክፍል ሁለት ምቹ አልጋዎችን፣ የየራሳቸው ማንበቢያ መብራቶች፣ የስራ ቦታ፣ የነጻ ሻይ እና ቡና ማብሰያ እና ዘመናዊ መታጠቢያ ቤት ያካትታል።',
    amenitiesEn: ['AC', 'Two Twin Beds', 'High-Speed WiFi', 'Tea/Coffee Station', 'Dedicated Work desk', 'Modern Shower'],
    amenitiesAm: ['የአየር ማቀዝቀዣ', '2 ባለአንድ ሰው አልጋዎች', 'ፈጣን ዋይፋይ', 'የሻይ/ቡና ማዘጋጃ', 'ልዩ የስራ ጠረጴዛ', 'ዘመናዊ መታጠቢያ ቤት'],
    maxGuests: 2,
    bedTypeEn: '2 Single Beds',
    bedTypeAm: '2 ባለ አንድ ሰው አልጋዎች',
    sizeSqM: 35,
    image: DEFAULT_IMAGES.twinRoom,
    rating: 4.6,
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sven Lindqvist',
    locationEn: 'Stockholm, Sweden',
    locationAm: 'ስቶክሆልም ፣ ስዊድን',
    rating: 5,
    textEn: 'Outstanding stay! The cleanliness level here exceeds many 5-star hotels I have been to. The staff are incredibly polite, and they provided a free airport transfer. Bed is comfortable with crisp AC that is absolutely critical in Dire Dawa. 100% recommend!',
    textAm: 'እጅግ አስደናቂ ቆይታ! የዚህ ሆቴል ፅዳት ደረጃ ከብዙ ባለ 5 ኮከብ ሆቴሎች ደረጃ ይበልጣል። ሰራተኞቹ በጣም ትሁት ናቸው፣ እና ነጻ የአየር ማረፊያ ማመላለሻ አቅርበውልናል። አልጋው ድሬዳዋ ውስጥ በጣም ወሳኝ ከሆነው ቀዝቃዛ አየር ማቀዝቀዣ ጋር በጥሩ ሁኔታ ይመሳሰላል። 100% እመክራለሁ!',
    date: '2026-05-18',
  },
  {
    id: '2',
    author: 'Selamawit Kebede',
    locationEn: 'Addis Ababa, Ethiopia',
    locationAm: 'አዲስ አበባ ፣ ኢትዮጵያ',
    rating: 5,
    textEn: 'East Star Hotel is the best value in Dire Dawa. The rooms feel fresh, new, and tidy. The Sabiyan area is very neat, and parking is plentiful and secure. The buffet breakfast offers delicious traditional Chechebsa and great coffee.',
    textAm: 'ኢስት ስታር ሆቴል በድሬዳዋ ውስጥ ምርጡን ዋጋ ይሰጣል። ክፍሎቹ ትኩስ፣ አዲስ እና ንፁህ ናቸው። ሳቢያን ሰፈር በጣም ፀጥ ያለ ሲሆን የመኪና ማቆሚያውም ሰፊና አስተማማኝ ነው። የቡፌ ቁርስ ጣፋጭ የባህል ጨጨብሳ እና ድንቅ ቡና ያቀርባል።',
    date: '2026-05-24',
  },
  {
    id: '3',
    author: 'Marcus Vance',
    locationEn: 'Atlanta, USA',
    locationAm: 'አትላንታ ፣ አሜሪካ',
    rating: 4,
    textEn: 'Very friendly front desk and efficient service. Clean rooms, nice hot water, and stable WiFi suited for my video calls. The rooftop terrace is a gorgeous place to decompress in the evenings under the breeze.',
    textAm: 'በአካባቢው ካሉ ሆቴሎች ምርጡ። ንፁህ ክፍሎች፣ ጥሩ ሙቅ ውሃ እና ለቪዲዮ ጥሪዎቼ የሚስማማ የተረጋጋ ዋይፋይ። የጣሪያው ሰገነት ምሽት ላይ በነፋስ ለመዝናናት አስደናቂ ቦታ ነው።',
    date: '2026-05-26',
  }
];

const DEFAULT_DINING: DiningItem[] = [
  {
    id: 'breakfast',
    nameEn: 'Gourmet Buffet Breakfast',
    nameAm: 'ልዩ የቡፌ ቁርስ',
    tagEn: 'Complimentary for Guests',
    tagAm: 'ለእንግዶች በነጻ የሚቀርብ',
    descriptionEn: 'Start your morning with our highly complimented buffet, combining classic continental recipes with delicious traditional Ethiopian favorites like Chechebsa, Ful Medames, and freshly ground Ethiopian coffee brewed to perfection.',
    descriptionAm: 'ያለንን ተወዳጅ የቡፌ ቁርስ በመመገብ ቀኑን ይጀምሩ። አገራዊ እና አህጉራዊ ምግቦችን፣ እንደ ጨጨብሳ፣ ፉል እና አዲስ የተፈጨ ባህላዊ የኢትዮጵያ ቡና በጥራት ያዋህዳል።',
    image: DEFAULT_IMAGES.dining,
    hours: '6:30 AM - 10:00 AM'
  },
  {
    id: 'terrace-lounge',
    nameEn: 'East Star Terrace & Bar',
    nameAm: 'ኢስት ስታር ሰገነት እና ባር',
    tagEn: 'Sunset Panoramic View',
    tagAm: 'የፀሐይ መግቢያ ውብ እይታ',
    descriptionEn: 'Our rooftop lounge is the most refreshing escape in Dire Dawa. Relax in cozy seating under the cool evening breeze, enjoying local beers, spirits, refreshing soft drinks, and light continental snacks while taking in the sunset sky.',
    descriptionAm: 'የእኛ የጣሪያ ላይ ሰገነት ለድሬዳዋ አየር እጅግ ተስማሚ ማምለጫ ነው። ቀዝቃዛው የምሽት ነፋስ በሚነፍስበት ምቹ መቀመጫ ላይ የአገር ውስጥ መጠጦችን፣ ኮክቴሎችን፣ ፈሳሽ ነገሮችን እና ቀለል ያሉ ምግቦችን እየተዝናኑ በፀሐይ መግቢያ ውበት ይደሰቱ።',
    image: DEFAULT_IMAGES.terrace,
    hours: '12:00 PM - 11:30 PM'
  }
];

const DEFAULT_INQUIRIES: BookingInquiry[] = [
  {
    id: 'inq_1',
    guestName: 'Johnathan Miller',
    email: 'johnathan.miller@gmail.com',
    phone: '+1 (415) 392-1082',
    checkIn: '2026-06-12',
    checkOut: '2026-06-18',
    roomId: 'deluxe',
    roomNameEn: 'Deluxe Balcony Suite',
    guestsCount: 2,
    notes: 'Please arrange the complimentary airport pick-up. Flight ET 402 arriving at 4:30 PM.',
    status: 'Pending',
    dateSubmitted: '2026-05-28T14:22:10Z',
  },
  {
    id: 'inq_2',
    guestName: 'Lidya Tekle',
    email: 'lidya.t@yahoo.com',
    phone: '+251 91 145 6789',
    checkIn: '2026-06-15',
    checkOut: '2026-06-17',
    roomId: 'standard',
    roomNameEn: 'Standard Comfort King',
    guestsCount: 1,
    notes: 'I need a room with a study desk and silent AC as I will be working during my stay.',
    status: 'Confirmed',
    dateSubmitted: '2026-05-29T08:15:30Z',
  }
];

const DEFAULT_HOTEL_INFO: HotelInfo = {
  nameEn: 'East Star Hotel',
  nameAm: 'ኢስት ስታር ሆቴል',
  taglineEn: 'Immaculate cleanliness, quiet comfort, and premium Dire Dawa value in the elegant Sabiyan area.',
  taglineAm: 'ፍፁም ፅዳት፣ ፀጥ ያለ ምቾት እና ታላቅ ዋጋ በድሬዳዋ ውቧ ሳቢያን ሰፈር ያግኙ።',
  phone1: '+251 96 722 2224',
  phone2: '+251 96 162 3824',
  locationEn: 'Sabiyan, Dire Dawa, Ethiopia',
  locationAm: 'ሳቢያን ፣ ድሬዳዋ ፣ ኢትዮጵያ',
  addressEn: 'Directly in the tranquil Sabiyan quarter, conveniently 10 minutes from Dire Dawa International Airport (ABA). Safe, neat administrative district of Dire Dawa.',
  addressAm: 'በድሬዳዋ ውብና ፀጥተኛ በሆነው የሳቢያን ሰፈር ውስጥ የሚገኝ፣ ከድሬዳዋ ዓለም አቀፍ አውሮፕላን ማረፊያ (ABA) በ10 ደቂቃ ርቀት በቀላሉ ይገኛል። አስተማማኝና ፅዱ ሰፈር።',
};

const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  logoTextEn: 'EAST STAR',
  logoTextAm: 'ኢስት ስታር',
  buttonTextEn: 'Book Now',
  buttonTextAm: 'አሁኑኑ ይያዙ',
  menuItems: [
    { id: '1', nameEn: 'Home', nameAm: 'መነሻ', path: '/' },
    { id: '2', nameEn: 'Rooms', nameAm: 'ክፍሎች', path: '/rooms' },
    { id: '3', nameEn: 'Dining', nameAm: 'ምግብና መጠጥ', path: '/dining' },
    { id: '4', nameEn: 'Amenities', nameAm: 'አገልግሎቶች', path: '/amenities' },
    { id: '5', nameEn: 'About Us', nameAm: 'ስለ እኛ', path: '/about' },
    { id: '6', nameEn: 'Map', nameAm: 'ካርታ', path: '#map-scroll-section' },
    { id: '7', nameEn: 'Reviews', nameAm: 'አስተያየቶች', path: '/reviews' },
    { id: '8', nameEn: 'Contact', nameAm: 'ግንኙነት', path: '/contact' },
  ],
};

const DEFAULT_HERO_CONFIG: HeroConfig = {
  image: '/src/assets/images/east_star_exterior_1780046580471.png',
  headlineEn: 'Modern Luxury in Dire Dawa',
  headlineAm: 'ለየት ያሉ ክፍሎችና ምቹ መስተንግዶ',
  subtextEn: 'Welcome to East Star Hotel – Immaculate room cleanliness, contemporary AC suites, free airport shuttles, and premier hospitality in Dire Dawa\'s tranquil Sabiyan quarter.',
  subtextAm: 'ወደ ኢስት ስታር ሆቴል በደህና መጡ – ልዩ የክፍሎች ፅዳት፣ አየር ማቀዝቀዣ፣ በነጻ የሚመላለስ የአየር ማረፊያ መኪና እና ልዩ መስተንግዶ በድሬዳዋ ውቧ ሳቢያን ሰፈር ያግኙ።',
  ctaTextEn: 'Explore Guest Rooms',
  ctaTextAm: 'ክፍሎችን ይመልከቱ',
};

const DEFAULT_ABOUT_CONFIG: AboutConfig = {
  paragraph1En: 'Located directly within the clean, secure Sabiyan quarters of Dire Dawa, East Star Hotel stands as a sanctuary of exceptional hospitality. Our focus is delivering pristine room cleanliness alongside quiet comfort at a premium value.',
  paragraph1Am: 'በድሬዳዋ ፅዱ እና አስተማማኝ በሆነው የሳቢያን ሰፈር ውስጥ የሚገኘው ኢስት ስታር ሆቴል ልዩ መስተንግዶን ይዞ ቆሟል። ዋናው ትኩረታችን ፍጹም የክፍል ንጽህናን ከጸጥታ ጋር በጥሩ ዋጋ ማቅረብ ነው።',
  paragraph2En: 'We provide complementary airport pickup services, fully air-conditioned rooms with smart TVs, silent dual-inverter speed controllers, and robust high-speed mesh WiFi suitable for remote business executives.',
  paragraph2Am: 'ነጻ የአየር ማረፊያ ማመላለሻ፣ ሙሉ በሙሉ አየር ማቀዝቀዣ እና ስማርት ቲቪ ያላቸው ክፍሎች፣ እና ለስራ የሚሆን ፈጣን ዋይፋይ እናቀርባለን።',
  missionEn: 'To define absolute cleanliness and premium hospitality value in Eastern Ethiopia, ensuring every guest enjoys a peaceful, tidy, and safe stay.',
  missionAm: 'በምስራቅ ኢትዮጵያ ውስጥ ፍፁም ንፅህናን እና የላቀ መስተንግዶን መግለፅ ፣ እያንዳንዱ እንግዳ ሰላማዊ ፣ ንፁህ እና ደህንነቱ የተጠበቀ ቆይታ እንዲደሰት ማድረግ።',
  exteriorPic: '/src/assets/images/east_star_exterior_1780046580471.png',
  terracePic: '/src/assets/images/east_star_terrace_1780046634963.png',
  staffInfoEn: 'Our staff are professionally trained in hygiene, traditional Habesha hospitality, and high-efficiency technical workflows.',
  staffInfoAm: 'የእኛ ሰራተኞች በንጽህና አጠባበቅ፣ በባህላዊ የሀበሻ ጨዋነት እና በከፍተኛ የስራ ቅልጥፍና የሰለጠኑ ናቸው።',
};

const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  email: 'yimefkr4@gmail.com',
  phone1: '+251 96 722 2224',
  phone2: '+251 96 162 3824',
  addressEn: 'Sabiyan Quarter, near Dire Dawa International Airport, Ethiopia',
  addressAm: 'ድሬዳዋ ሳቢያን ሰፈር፣ ከድሬዳዋ ዓለም አቀፍ አውሮፕላን ማረፊያ አጠገብ፣ ኢትዮጵያ',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  telegramUrl: 'https://telegram.org',
  copyrightEn: '© 2026 East Star Hotel. All Rights Reserved.',
  copyrightAm: '© 2026 ኢስት ስታር ሆቴል ። መብቱ በህግ የተጠበቀ ነው።',
};

const DEFAULT_CONTACT_MAP_CONFIG: ContactMapConfig = {
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.4735393510524!2d41.85409228795744!3d9.610537021570763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163ec4dfb38e0bd9%3A0xe54260aa26a9f07a!2sSabiyan%2C%20Dire%20Dawa!5e0!3m2!1sen!2set!4v1717320000000!5m2!1sen!2set',
  contactEmail: 'yimefkr4@gmail.com',
};

const DEFAULT_SEO_CONFIG: SeoConfig = {
  siteTitle: 'East Star Hotel - Immaculate Luxury in Dire Dawa',
  metaDescription: 'Discover East Star Hotel in Sabiyan, Dire Dawa. Features quiet air-conditioned suites, high-speed WiFi, free airport picker, and traditional hospitality.',
  seoTags: 'east star hotel, hotels in dire dawa, dire dawa accommodation, sabiyan hotel, ethiopia hotel',
};

const DEFAULT_PROMOTIONS: PromotionOffer[] = [
  {
    id: 'promo_1',
    titleEn: 'Complimentary Traditional Breakfast',
    titleAm: 'ነጻ የባህል ቁርስ ጨጨብሳ',
    descriptionEn: 'Stay of 2 nights or more rewards you with a complimentary choice of traditional Ethiopian Chechebsa and organic Harrar coffee on our cozy terrace top.',
    descriptionAm: 'ለ2 ሌሊት እና ከዚያ በላይ የሚቆዩ እንግዶች የጣሪያችን ሰገነት ላይ ነጻ ባህላዊ ጨጨብሳ እና የሐረር ቡና ይቀርብላቸዋል።',
    discountBadgeEn: 'FREE BREAKFAST',
    discountBadgeAm: 'ነጻ ቁርስ',
    image: '/src/assets/images/east_star_dining_1780046617416.png',
    code: 'EASTBREAKFAST',
    isActive: true,
  },
  {
    id: 'promo_2',
    titleEn: '10% Multi-Day Executive Discount',
    titleAm: 'የ 10% የብዙ ቀናት ቅናሽ',
    descriptionEn: 'Enjoy 10% off of all Standard and Twin rooms when booking for 5 consecutive nights or more. Perfect for business travelers.',
    descriptionAm: 'ለ 5 ተከታታይ ቀናት ወይም ከዚያ በላይ ቦታ ሲያስይዙ ከሁሉም ክፍሎች 10% ቅናሽ ያግኙ። ለቢዝነስ ተጓዦች እጅግ ተስማሚ።',
    discountBadgeEn: '10% SAVINGS',
    discountBadgeAm: 'የ 10% ቅናሽ',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    code: 'EXECUTIVE10',
    isActive: true,
  }
];

const DEFAULT_MEDIA_IMAGES: MediaImage[] = [
  { id: 'img_logo', url: '', category: 'Logo', name: 'Hotel Official Logo Star E' },
  { id: 'img_ext1', url: '/src/assets/images/east_star_exterior_1780046580471.png', category: 'Hero', name: 'Exterior Facade Daytime' },
  { id: 'img_suite1', url: '/src/assets/images/east_star_suite_1780046599778.png', category: 'Rooms', name: 'Premium Deluxe Suite Interior' },
  { id: 'img_dining1', url: '/src/assets/images/east_star_dining_1780046617416.png', category: 'Dining', name: 'Breakfast Spread' },
  { id: 'img_terr1', url: '/src/assets/images/east_star_terrace_1780046634963.png', category: 'About', name: 'Rooftop Terrace Lounge Area' },
  { id: 'img_std1', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop', category: 'Rooms', name: 'Standard Room King Bed' },
  { id: 'img_twin1', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop', category: 'Rooms', name: 'Executive Twin Beds Room' }
];

export const RoutingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for routing matching window path
  const [page, setPageState] = useState<string>('/');
  const [language, setLanguageState] = useState<Language>('en');

  // Dynamic state hooks loaded from localStorage or falling back to premium defaults
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(DEFAULT_INQUIRIES);
  const [dining, setDining] = useState<DiningItem[]>(DEFAULT_DINING);
  const [hotelInfo, setHotelInfoState] = useState<HotelInfo>(DEFAULT_HOTEL_INFO);
  
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(DEFAULT_HEADER_CONFIG);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(DEFAULT_ABOUT_CONFIG);
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(DEFAULT_FOOTER_CONFIG);
  const [contactMapConfig, setContactMapConfig] = useState<ContactMapConfig>(DEFAULT_CONTACT_MAP_CONFIG);
  const [seoConfig, setSeoConfig] = useState<SeoConfig>(DEFAULT_SEO_CONFIG);
  const [promotions, setPromotions] = useState<PromotionOffer[]>(DEFAULT_PROMOTIONS);
  const [mediaImages, setMediaImages] = useState<MediaImage[]>(DEFAULT_MEDIA_IMAGES);

  // Sync state initially from outer path and localStorage
  useEffect(() => {
    // 1. Initial route tracking
    const currentPath = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    const normalizedPage = currentPath === '' ? '/' : currentPath;
    setPageState(normalizedPage);

    // 2. Local Storage Sync
    try {
      const storedRooms = localStorage.getItem('eaststar_rooms');
      if (storedRooms) setRooms(JSON.parse(storedRooms));

      const storedReviews = localStorage.getItem('eaststar_reviews');
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedInquiries = localStorage.getItem('eaststar_inquiries');
      if (storedInquiries) setInquiries(JSON.parse(storedInquiries));

      const storedDining = localStorage.getItem('eaststar_dining');
      if (storedDining) setDining(JSON.parse(storedDining));

      const storedHotelInfo = localStorage.getItem('eaststar_hotel_info');
      if (storedHotelInfo) setHotelInfoState(JSON.parse(storedHotelInfo));

      const storedHeaderConfig = localStorage.getItem('eaststar_header_config');
      if (storedHeaderConfig) setHeaderConfig(JSON.parse(storedHeaderConfig));

      const storedHeroConfig = localStorage.getItem('eaststar_hero_config');
      if (storedHeroConfig) setHeroConfig(JSON.parse(storedHeroConfig));

      const storedAboutConfig = localStorage.getItem('eaststar_about_config');
      if (storedAboutConfig) setAboutConfig(JSON.parse(storedAboutConfig));

      const storedFooterConfig = localStorage.getItem('eaststar_footer_config');
      if (storedFooterConfig) setFooterConfig(JSON.parse(storedFooterConfig));

      const storedContactMap = localStorage.getItem('eaststar_contact_map_config');
      if (storedContactMap) setContactMapConfig(JSON.parse(storedContactMap));

      const storedSeo = localStorage.getItem('eaststar_seo_config');
      if (storedSeo) setSeoConfig(JSON.parse(storedSeo));

      const storedPromotions = localStorage.getItem('eaststar_promotions');
      if (storedPromotions) setPromotions(JSON.parse(storedPromotions));

      const storedMedia = localStorage.getItem('eaststar_media_images');
      if (storedMedia) setMediaImages(JSON.parse(storedMedia));

      const storedLang = localStorage.getItem('eaststar_lang');
      if (storedLang === 'en' || storedLang === 'am') setLanguageState(storedLang as Language);
    } catch (e) {
      console.error('Error reading localStorage data:', e);
    }

    // Set up standard popstate handling to make browser back/forward buttons work perfectly!
    const handlePopState = () => {
      const pathChecked = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
      setPageState(pathChecked === '' ? '/' : pathChecked);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync state changes with Title dynamically if SEO is updated
  useEffect(() => {
    if (seoConfig && seoConfig.siteTitle) {
      document.title = seoConfig.siteTitle;
    }
  }, [seoConfig]);

  // Standard elegant client navigation wrapper
  const navigate = (path: string) => {
    setPageState(path);
    window.location.hash = path;
    window.history.pushState(null, '', `/#${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eaststar_lang', lang);
  };

  // Rooms Helpers
  const updateRoom = (updatedRoom: Room) => {
    const updated = rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r);
    setRooms(updated);
    localStorage.setItem('eaststar_rooms', JSON.stringify(updated));
  };

  const addRoom = (newRoom: Room) => {
    const updated = [...rooms, newRoom];
    setRooms(updated);
    localStorage.setItem('eaststar_rooms', JSON.stringify(updated));
  };

  const deleteRoom = (id: string) => {
    const updated = rooms.filter(r => r.id !== id);
    setRooms(updated);
    localStorage.setItem('eaststar_rooms', JSON.stringify(updated));
  };

  // Reviews Helpers
  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const freshReview: Review = {
      ...newReview,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [freshReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('eaststar_reviews', JSON.stringify(updated));
  };

  const addReviewFull = (newReview: Review) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('eaststar_reviews', JSON.stringify(updated));
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('eaststar_reviews', JSON.stringify(updated));
  };

  // Dining Helpers
  const addDiningItem = (newItem: DiningItem) => {
    const updated = [...dining, newItem];
    setDining(updated);
    localStorage.setItem('eaststar_dining', JSON.stringify(updated));
  };

  const updateDiningItem = (updatedItem: DiningItem) => {
    const updated = dining.map(item => item.id === updatedItem.id ? updatedItem : item);
    setDining(updated);
    localStorage.setItem('eaststar_dining', JSON.stringify(updated));
  };

  const deleteDiningItem = (id: string) => {
    const updated = dining.filter(item => item.id !== id);
    setDining(updated);
    localStorage.setItem('eaststar_dining', JSON.stringify(updated));
  };

  // Inquiries Helpers
  const addInquiry = (newInq: Omit<BookingInquiry, 'id' | 'status' | 'dateSubmitted'>) => {
    const roomInQuestion = rooms.find(r => r.id === newInq.roomId);
    const freshInq: BookingInquiry = {
      ...newInq,
      id: `inq_${Date.now()}`,
      roomNameEn: roomInQuestion ? roomInQuestion.nameEn : 'General Inquiry',
      status: 'Pending',
      dateSubmitted: new Date().toISOString()
    };
    const updated = [freshInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('eaststar_inquiries', JSON.stringify(updated));
  };

  const addManualBooking = (manualInq: BookingInquiry) => {
    const updated = [manualInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('eaststar_inquiries', JSON.stringify(updated));
  };

  const updateInquiryStatus = (id: string, status: 'Pending' | 'Confirmed' | 'Cancelled' | 'CheckedIn' | 'CheckedOut') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    setInquiries(updated);
    localStorage.setItem('eaststar_inquiries', JSON.stringify(updated));
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('eaststar_inquiries', JSON.stringify(updated));
  };

  // Site Configurations Update Helpers
  const updateHeaderConfig = (config: HeaderConfig) => {
    setHeaderConfig(config);
    localStorage.setItem('eaststar_header_config', JSON.stringify(config));
  };

  const updateHeroConfig = (config: HeroConfig) => {
    setHeroConfig(config);
    localStorage.setItem('eaststar_hero_config', JSON.stringify(config));
  };

  const updateAboutConfig = (config: AboutConfig) => {
    setAboutConfig(config);
    localStorage.setItem('eaststar_about_config', JSON.stringify(config));
  };

  const updateFooterConfig = (config: FooterConfig) => {
    setFooterConfig(config);
    localStorage.setItem('eaststar_footer_config', JSON.stringify(config));
  };

  const updateContactMapConfig = (config: ContactMapConfig) => {
    setContactMapConfig(config);
    localStorage.setItem('eaststar_contact_map_config', JSON.stringify(config));
  };

  const updateSeoConfig = (config: SeoConfig) => {
    setSeoConfig(config);
    localStorage.setItem('eaststar_seo_config', JSON.stringify(config));
  };

  const updateHotelInfo = (info: HotelInfo) => {
    setHotelInfoState(info);
    localStorage.setItem('eaststar_hotel_info', JSON.stringify(info));
  };

  // Promotions Helpers
  const addPromotion = (promo: PromotionOffer) => {
    const updated = [...promotions, promo];
    setPromotions(updated);
    localStorage.setItem('eaststar_promotions', JSON.stringify(updated));
  };

  const updatePromotion = (updatedPromo: PromotionOffer) => {
    const updated = promotions.map(p => p.id === updatedPromo.id ? updatedPromo : p);
    setPromotions(updated);
    localStorage.setItem('eaststar_promotions', JSON.stringify(updated));
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.filter(p => p.id !== id);
    setPromotions(updated);
    localStorage.setItem('eaststar_promotions', JSON.stringify(updated));
  };

  // Media Gallery Helpers
  const addMediaImage = (newImg: MediaImage) => {
    const updated = [...mediaImages, newImg];
    setMediaImages(updated);
    localStorage.setItem('eaststar_media_images', JSON.stringify(updated));
  };

  const deleteMediaImage = (id: string) => {
    const updated = mediaImages.filter(img => img.id !== id);
    setMediaImages(updated);
    localStorage.setItem('eaststar_media_images', JSON.stringify(updated));
  };

  return (
    <RoutingContext.Provider value={{
      page,
      navigate,
      language,
      setLanguage,
      
      rooms,
      updateRoom,
      addRoom,
      deleteRoom,
      
      reviews,
      addReview,
      addReviewFull,
      deleteReview,
      
      dining,
      addDiningItem,
      updateDiningItem,
      deleteDiningItem,
      
      inquiries,
      addInquiry,
      addManualBooking,
      updateInquiryStatus,
      deleteInquiry,
      
      headerConfig,
      updateHeaderConfig,
      
      heroConfig,
      updateHeroConfig,
      
      aboutConfig,
      updateAboutConfig,
      
      footerConfig,
      updateFooterConfig,
      
      contactMapConfig,
      updateContactMapConfig,
      
      seoConfig,
      updateSeoConfig,
      
      promotions,
      addPromotion,
      updatePromotion,
      deletePromotion,
      
      mediaImages,
      addMediaImage,
      deleteMediaImage,
      
      hotelInfo,
      updateHotelInfo
    }}>
      {children}
    </RoutingContext.Provider>
  );
};

export const useRouting = () => {
  const context = useContext(RoutingContext);
  if (!context) {
    throw new Error('useRouting must be used within a RoutingProvider');
  }
  return context;
};
