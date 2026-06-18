/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouting } from '../context/RoutingContext';
import { 
  ShieldCheck, LogIn, Calendar, Star, DollarSign, RefreshCw, 
  KeyRound, AlertTriangle, Trash2, Check, X, FileText, 
  LayoutList, Image as ImageIcon, Utensils, BookOpen, Percent, 
  Settings, MapPin, Sparkles, Plus, Edit, Send, CheckSquare,
  Mail, Phone, Info, Globe, Menu, ListPlus, ToggleLeft, ToggleRight
} from 'lucide-react';
import { Room, Review, DiningItem, BookingInquiry, PromotionOffer, MediaImage } from '../types';

export const Admin: React.FC = () => {
  const { 
    navigate, language, 
    rooms, updateRoom, addRoom, deleteRoom,
    reviews, addReviewFull, deleteReview,
    dining, addDiningItem, updateDiningItem, deleteDiningItem,
    inquiries, addManualBooking, updateInquiryStatus, deleteInquiry,
    headerConfig, updateHeaderConfig,
    heroConfig, updateHeroConfig,
    aboutConfig, updateAboutConfig,
    footerConfig, updateFooterConfig,
    contactMapConfig, updateContactMapConfig,
    seoConfig, updateSeoConfig,
    promotions, addPromotion, updatePromotion, deletePromotion,
    mediaImages, addMediaImage, deleteMediaImage,
    hotelInfo, updateHotelInfo
  } = useRouting();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State: tracks which of the 12 sections is currently active
  const [activeTab, setActiveTab] = useState<'header' | 'hero' | 'rooms' | 'dining' | 'about' | 'bookings' | 'gallery' | 'reviews' | 'promotions' | 'footer' | 'contact' | 'settings'>('bookings');

  // Success states for various managers
  const [successMsg, setSuccessMsg] = useState('');

  // --- LOCAL FORM STATES ---

  // 1. Header Manager
  const [headerLogoEn, setHeaderLogoEn] = useState(headerConfig?.logoTextEn || 'EAST STAR');
  const [headerLogoAm, setHeaderLogoAm] = useState(headerConfig?.logoTextAm || 'ኢስት ስታር');
  const [headerBtnEn, setHeaderBtnEn] = useState(headerConfig?.buttonTextEn || 'Book Now');
  const [headerBtnAm, setHeaderBtnAm] = useState(headerConfig?.buttonTextAm || 'አሁኑኑ ይያዙ');

  // 2. Hero Manager
  const [heroImg, setHeroImg] = useState(heroConfig?.image || '');
  const [heroHeadEn, setHeroHeadEn] = useState(heroConfig?.headlineEn || '');
  const [heroHeadAm, setHeroHeadAm] = useState(heroConfig?.headlineAm || '');
  const [heroSubEn, setHeroSubEn] = useState(heroConfig?.subtextEn || '');
  const [heroSubAm, setHeroSubAm] = useState(heroConfig?.subtextAm || '');
  const [heroCtaEn, setHeroCtaEn] = useState(heroConfig?.ctaTextEn || '');
  const [heroCtaAm, setHeroCtaAm] = useState(heroConfig?.ctaTextAm || '');

  // 3. Rooms Manager (for adding/editing rooms)
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomNameEn, setRoomNameEn] = useState('');
  const [roomNameAm, setRoomNameAm] = useState('');
  const [roomPriceUSD, setRoomPriceUSD] = useState(50);
  const [roomPriceETB, setRoomPriceETB] = useState(5500);
  const [roomDescEn, setRoomDescEn] = useState('');
  const [roomDescAm, setRoomDescAm] = useState('');
  const [roomAmenitiesEn, setRoomAmenitiesEn] = useState('');
  const [roomAmenitiesAm, setRoomAmenitiesAm] = useState('');
  const [roomMaxGuests, setRoomMaxGuests] = useState(2);
  const [roomBedEn, setRoomBedEn] = useState('');
  const [roomBedAm, setRoomBedAm] = useState('');
  const [roomSize, setRoomSize] = useState(30);
  const [roomImg, setRoomImg] = useState('');

  // 4. Dining Manager
  const [editingDiningId, setEditingDiningId] = useState<string | null>(null);
  const [diningNameEn, setDiningNameEn] = useState('');
  const [diningNameAm, setDiningNameAm] = useState('');
  const [diningTagEn, setDiningTagEn] = useState('');
  const [diningTagAm, setDiningTagAm] = useState('');
  const [diningHours, setDiningHours] = useState('');
  const [diningDescEn, setDiningDescEn] = useState('');
  const [diningDescAm, setDiningDescAm] = useState('');
  const [diningImg, setDiningImg] = useState('');

  // 5. About Us Manager
  const [aboutPara1En, setAboutPara1En] = useState(aboutConfig?.paragraph1En || '');
  const [aboutPara1Am, setAboutPara1Am] = useState(aboutConfig?.paragraph1Am || '');
  const [aboutPara2En, setAboutPara2En] = useState(aboutConfig?.paragraph2En || '');
  const [aboutPara2Am, setAboutPara2Am] = useState(aboutConfig?.paragraph2Am || '');
  const [aboutMissionEn, setAboutMissionEn] = useState(aboutConfig?.missionEn || '');
  const [aboutMissionAm, setAboutMissionAm] = useState(aboutConfig?.missionAm || '');
  const [aboutExtPic, setAboutExtPic] = useState(aboutConfig?.exteriorPic || '');
  const [aboutTerrPic, setAboutTerrPic] = useState(aboutConfig?.terracePic || '');
  const [aboutStaffEn, setAboutStaffEn] = useState(aboutConfig?.staffInfoEn || '');
  const [aboutStaffAm, setAboutStaffAm] = useState(aboutConfig?.staffInfoAm || '');

  // 6. Manual Booking Form States
  const [manName, setManName] = useState('');
  const [manEmail, setManEmail] = useState('');
  const [manPhone, setManPhone] = useState('');
  const [manCheckIn, setManCheckIn] = useState('');
  const [manCheckOut, setManCheckOut] = useState('');
  const [manRoomId, setManRoomId] = useState('deluxe');
  const [manGuests, setManGuests] = useState(2);
  const [manNotes, setManNotes] = useState('Manual booking added via Staff Portal.');

  // 7. Media Gallery Manager
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaName, setMediaName] = useState('');
  const [mediaCategory, setMediaCategory] = useState('Rooms');

  // 8. Custom Review Form States
  const [revAuthor, setRevAuthor] = useState('');
  const [revLocEn, setRevLocEn] = useState('Addis Ababa, Ethiopia');
  const [revLocAm, setRevLocAm] = useState('አዲስ አበባ ፣ ኢትዮጵያ');
  const [revRating, setRevRating] = useState(5);
  const [revTextEn, setRevTextEn] = useState('');
  const [revTextAm, setRevTextAm] = useState('');

  // 9. Promotions Form
  const [promoTitleEn, setPromoTitleEn] = useState('');
  const [promoTitleAm, setPromoTitleAm] = useState('');
  const [promoDescEn, setPromoDescEn] = useState('');
  const [promoDescAm, setPromoDescAm] = useState('');
  const [promoBadgeEn, setPromoBadgeEn] = useState('10% OFF');
  const [promoBadgeAm, setPromoBadgeAm] = useState('የ10% ቅናሽ');
  const [promoImg, setPromoImg] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoActive, setPromoActive] = useState(true);

  // 10. Footer Manager
  const [footEmail, setFootEmail] = useState(footerConfig?.email || 'yimefkr4@gmail.com');
  const [footPhone1, setFootPhone1] = useState(footerConfig?.phone1 || '+251 96 722 2224');
  const [footPhone2, setFootPhone2] = useState(footerConfig?.phone2 || '+251 96 162 3824');
  const [footAddressEn, setFootAddressEn] = useState(footerConfig?.addressEn || '');
  const [footAddressAm, setFootAddressAm] = useState(footerConfig?.addressAm || '');
  const [footFB, setFootFB] = useState(footerConfig?.facebookUrl || 'https://facebook.com');
  const [footCopyrightEn, setFootCopyrightEn] = useState(footerConfig?.copyrightEn || '');
  const [footCopyrightAm, setFootCopyrightAm] = useState(footerConfig?.copyrightAm || '');

  // 11. Contact & Map Manager
  const [conMapUrl, setConMapUrl] = useState(contactMapConfig?.mapEmbedUrl || '');
  const [conEmail, setConEmail] = useState(contactMapConfig?.contactEmail || 'yimefkr4@gmail.com');

  // 12. SEO & General Settings
  const [seoTitle, setSeoTitle] = useState(seoConfig?.siteTitle || '');
  const [seoDesc, setSeoDesc] = useState(seoConfig?.metaDescription || '');
  const [seoTags, setSeoTags] = useState(seoConfig?.seoTags || '');
  const [infoNameEn, setInfoNameEn] = useState(hotelInfo?.nameEn || 'East Star Hotel');
  const [infoNameAm, setInfoNameAm] = useState(hotelInfo?.nameAm || 'ኢስት ስታር ሆቴል');
  const [infoTagEn, setInfoTagEn] = useState(hotelInfo?.taglineEn || '');
  const [infoTagAm, setInfoTagAm] = useState(hotelInfo?.taglineAm || '');

  // Log in check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'eaststar2026') {
      setIsAuthenticated(true);
      setAuthError('');
      triggerToast('Welcome. System initialized.');
    } else {
      setAuthError('Invalid credentials. Hint: use username: admin & password: eaststar2026');
    }
  };

  const triggerToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Submission Handlers
  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeaderConfig({
      logoTextEn: headerLogoEn,
      logoTextAm: headerLogoAm,
      buttonTextEn: headerBtnEn,
      buttonTextAm: headerBtnAm,
      menuItems: headerConfig?.menuItems || []
    });
    triggerToast('Header configuration updated successfully!');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig({
      image: heroImg,
      headlineEn: heroHeadEn,
      headlineAm: heroHeadAm,
      subtextEn: heroSubEn,
      subtextAm: heroSubAm,
      ctaTextEn: heroCtaEn,
      ctaTextAm: heroCtaAm
    });
    triggerToast('Hero & brand banner updated successfully!');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutConfig({
      paragraph1En: aboutPara1En,
      paragraph1Am: aboutPara1Am,
      paragraph2En: aboutPara2En,
      paragraph2Am: aboutPara2Am,
      missionEn: aboutMissionEn,
      missionAm: aboutMissionAm,
      exteriorPic: aboutExtPic,
      terracePic: aboutTerrPic,
      staffInfoEn: aboutStaffEn,
      staffInfoAm: aboutStaffAm
    });
    triggerToast('About Us sections saved successfully!');
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooterConfig({
      email: footEmail,
      phone1: footPhone1,
      phone2: footPhone2,
      addressEn: footAddressEn,
      addressAm: footAddressAm,
      facebookUrl: footFB,
      instagramUrl: footerConfig?.instagramUrl || 'https://instagram.com',
      telegramUrl: footerConfig?.telegramUrl || 'https://telegram.org',
      copyrightEn: footCopyrightEn,
      copyrightAm: footCopyrightAm
    });
    triggerToast('Footer contact and legal terms updated!');
  };

  const handleSaveContactMap = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactMapConfig({
      mapEmbedUrl: conMapUrl,
      contactEmail: conEmail
    });
    triggerToast('Map Embed URL and contact email refreshed!');
  };

  const handleSaveSeoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoConfig({
      siteTitle: seoTitle,
      metaDescription: seoDesc,
      seoTags: seoTags
    });
    updateHotelInfo({
      ...hotelInfo,
      nameEn: infoNameEn,
      nameAm: infoNameAm,
      taglineEn: infoTagEn,
      taglineAm: infoTagAm
    });
    triggerToast('SEO Tags and Core Hotel Meta Info published!');
  };

  // Room additions & edits
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const amEnList = roomAmenitiesEn.split(',').map(s => s.trim()).filter(Boolean);
    const amAmList = roomAmenitiesAm.split(',').map(s => s.trim()).filter(Boolean);

    const roomPayload: Room = {
      id: editingRoomId || `room_${Date.now()}`,
      nameEn: roomNameEn,
      nameAm: roomNameAm,
      priceUSD: Number(roomPriceUSD),
      priceETB: Number(roomPriceETB),
      descriptionEn: roomDescEn,
      descriptionAm: roomDescAm,
      amenitiesEn: amEnList.length ? amEnList : ['A/C', 'WiFi', 'Tv'],
      amenitiesAm: amAmList.length ? amAmList : ['ዋይፋይ', 'ቴሌቪዥን'],
      maxGuests: Number(roomMaxGuests),
      bedTypeEn: roomBedEn || '1 King Bed',
      bedTypeAm: roomBedAm || '1 ኪንግ አልጋ',
      sizeSqM: Number(roomSize),
      image: roomImg || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
      rating: 4.8
    };

    if (editingRoomId) {
      updateRoom(roomPayload);
      triggerToast(`Room '${roomNameEn}' updated!`);
    } else {
      addRoom(roomPayload);
      triggerToast(`New room '${roomNameEn}' added!`);
    }

    // Reset Form
    setEditingRoomId(null);
    setRoomNameEn('');
    setRoomNameAm('');
    setRoomDescEn('');
    setRoomDescAm('');
    setRoomAmenitiesEn('');
    setRoomAmenitiesAm('');
    setRoomBedEn('');
    setRoomBedAm('');
    setRoomImg('');
  };

  // Dining Highlight additions & edits
  const handleSaveDining = (e: React.FormEvent) => {
    e.preventDefault();
    const diningPayload: DiningItem = {
      id: editingDiningId || `dining_${Date.now()}`,
      nameEn: diningNameEn,
      nameAm: diningNameAm,
      tagEn: diningTagEn || 'Complimentary',
      tagAm: diningTagAm || 'በነጻ የሚቀርብ',
      descriptionEn: diningDescEn,
      descriptionAm: diningDescAm,
      image: diningImg || '/src/assets/images/east_star_dining_1780046617416.png',
      hours: diningHours || '6:30 AM - 10:00 AM'
    };

    if (editingDiningId) {
      updateDiningItem(diningPayload);
      triggerToast(`Dining highlighting '${diningNameEn}' updated!`);
    } else {
      addDiningItem(diningPayload);
      triggerToast(`New dining outlet '${diningNameEn}' added!`);
    }

    setEditingDiningId(null);
    setDiningNameEn('');
    setDiningNameAm('');
    setDiningTagEn('');
    setDiningTagAm('');
    setDiningHours('');
    setDiningDescEn('');
    setDiningDescAm('');
    setDiningImg('');
  };

  // Manual Guest Booking Inquiry
  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoomDetails = rooms.find(r => r.id === manRoomId);
    
    const manualObject: BookingInquiry = {
      id: `inq_man_${Date.now()}`,
      guestName: manName,
      email: manEmail || 'manual@staff.com',
      phone: manPhone,
      checkIn: manCheckIn,
      checkOut: manCheckOut,
      roomId: manRoomId,
      roomNameEn: selectedRoomDetails ? selectedRoomDetails.nameEn : 'Standard Room',
      guestsCount: Number(manGuests),
      notes: manNotes,
      status: 'Confirmed', // Manual bookings default to confirmed
      dateSubmitted: new Date().toISOString(),
      isManual: true
    };

    addManualBooking(manualObject);
    triggerToast(`Booking for ${manName} logged in table!`);

    // Reset
    setManName('');
    setManEmail('');
    setManPhone('');
    setManCheckIn('');
    setManCheckOut('');
    setManNotes('');
  };

  // Add Promotion
  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromo: PromotionOffer = {
      id: `promo_${Date.now()}`,
      titleEn: promoTitleEn,
      titleAm: promoTitleAm,
      descriptionEn: promoDescEn,
      descriptionAm: promoDescAm,
      discountBadgeEn: promoBadgeEn,
      discountBadgeAm: promoBadgeAm,
      image: promoImg || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
      code: promoCode || 'EAST2026',
      isActive: promoActive
    };

    addPromotion(newPromo);
    triggerToast(`Promo offer '${promoTitleEn}' added securely!`);

    setPromoTitleEn('');
    setPromoTitleAm('');
    setPromoDescEn('');
    setPromoDescAm('');
    setPromoCode('');
  };

  // Add Testimonial Review
  const handleAddReviewForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newFullReview: Review = {
      id: `rev_man_${Date.now()}`,
      author: revAuthor,
      locationEn: revLocEn,
      locationAm: revLocAm,
      rating: Number(revRating),
      textEn: revTextEn,
      textAm: revTextAm,
      date: new Date().toISOString().split('T')[0]
    };
    addReviewFull(newFullReview);
    triggerToast(`Review by ${revAuthor} published!`);

    setRevAuthor('');
    setRevTextEn('');
    setRevTextAm('');
  };

  // Add Media Image
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;

    const newMedia: MediaImage = {
      id: `media_${Date.now()}`,
      url: mediaUrl,
      category: mediaCategory,
      name: mediaName || 'Unlabeled Asset'
    };

    addMediaImage(newMedia);
    triggerToast('New photo registered inside media workspace!');

    setMediaUrl('');
    setMediaName('');
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans pb-24">
      
      {!isAuthenticated ? (
        /* Credential Access Checkpoint Form */
        <div className="max-w-md mx-auto bg-stone-900 border border-stone-800 rounded-xl p-8 shadow-2xl mt-16 md:mt-24">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-amber-600/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-500 mb-3">
              <KeyRound className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-100">East Star hotel</h1>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest font-mono">Staff administrative console</p>
          </div>

          {authError && (
            <div className="bg-red-950/80 border border-red-800/80 p-3 rounded text-[11px] text-red-400 flex items-center gap-1.5 mb-4 font-medium">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="adm-user-login" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                Admin Username
              </label>
              <input
                id="adm-user-login"
                type="text"
                required
                placeholder="e.g., admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label htmlFor="adm-pass-login" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                Security Password
              </label>
              <input
                id="adm-pass-login"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="bg-stone-950 border border-stone-850 rounded p-3 text-[11px] text-stone-400 space-y-1">
              <span className="font-bold text-amber-500 uppercase font-mono tracking-wider text-[10px]">Staff Demo Passphrase:</span>
              <p>Username: <code className="text-stone-300 font-mono">admin</code></p>
              <p>Password: <code className="text-stone-300 font-mono">eaststar2026</code></p>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-2.5 px-4 rounded text-xs uppercase tracking-widest transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-stone-950" />
              <span>Sign In to controls</span>
            </button>
          </form>
        </div>
      ) : (
        /* MASTER UNIFIED 12-TABS ADMIN LAYOUT */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Header Dashboard Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-stone-900 border border-stone-850 rounded-xl gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-600/10 border border-amber-500/20 rounded-lg text-amber-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] bg-amber-600/10 border border-amber-500/30 text-amber-500 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                  Secure Administrative Console
                </span>
                <h1 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                  East Star Staff Portal
                </h1>
                <p className="text-xs text-stone-400 font-mono">Configure Site Settings & Reservations • Sabiyan Area</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="bg-transparent border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs py-2 px-4 rounded font-mono transition-colors"
              >
                Go to Public Site
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-amber-600 text-stone-950 hover:bg-amber-500 text-xs font-bold py-2 px-4 rounded uppercase tracking-wider font-mono transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Toast Msg */}
          {successMsg && (
            <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-800 text-emerald-400 px-5 py-3 rounded-lg shadow-2xl text-xs font-medium flex items-center gap-2 animate-bounce">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TWO-COLUMN SIDEBAR CONTROLS LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Clean Simple Side Navigation (All 12 tabs) */}
            <div className="lg:col-span-3 space-y-2">
              <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono px-3 mb-2">CONTROL MANAGERS ({12})</p>
              
              <nav className="flex flex-col gap-1">
                {[
                  { id: 'bookings', label: 'Booking & Reserv.', icon: <Calendar className="w-4 h-4" /> },
                  { id: 'rooms', label: 'Rooms Manager', icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'dining', label: 'Dining Manager', icon: <Utensils className="w-4 h-4" /> },
                  { id: 'header', label: 'Header Manager', icon: <LayoutList className="w-4 h-4" /> },
                  { id: 'hero', label: 'Hero/Banner Mgr', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'about', label: 'About Us Manager', icon: <Info className="w-4 h-4" /> },
                  { id: 'gallery', label: 'Image Gallery/Media', icon: <ImageIcon className="w-4 h-4" /> },
                  { id: 'reviews', label: 'Review Moderation', icon: <Star className="w-4 h-4" /> },
                  { id: 'promotions', label: 'Promotions & Offers', icon: <Percent className="w-4 h-4" /> },
                  { id: 'footer', label: 'Footer Manager', icon: <FileText className="w-4 h-4" /> },
                  { id: 'contact', label: 'Contact & Map Mgr', icon: <MapPin className="w-4 h-4" /> },
                  { id: 'settings', label: 'SEO & Site Settings', icon: <Settings className="w-4 h-4" /> },
                ].map((tab) => {
                  const isCurrent = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setEditingRoomId(null);
                        setEditingDiningId(null);
                      }}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-xs leading-none transition-all cursor-pointer font-medium ${
                        isCurrent 
                          ? 'bg-amber-600 text-stone-950 font-bold border-l-4 border-amber-900 shadow-md' 
                          : 'bg-stone-900/60 text-stone-400 border-l-4 border-transparent hover:bg-stone-900/90 hover:text-stone-200'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT COLUMN: Selected Tab Content */}
            <div className="lg:col-span-9 bg-stone-900/60 border border-stone-850 p-6 md:p-8 rounded-xl space-y-6">
              
              {/* --- 1. TICKET RESERVATIONS/BOOKINGS --- */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span>Guest Reservation and Check-In Registry ({inquiries.length})</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Moderation log for incoming public booking inquiries and manual desk walk-ins. Check status logs and set guest checkout logs.
                    </p>
                  </div>

                  {/* Manual Walk-In creator form */}
                  <form onSubmit={handleCreateManualBooking} className="bg-stone-950 p-5 rounded-lg border border-stone-850/80 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono block">
                      📁 Fast Registration: Log Manual Walk-In Guest
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="man-name" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Guest Name</label>
                        <input id="man-name" type="text" required placeholder="E.g. Almaz Bekele" value={manName} onChange={(e)=>setManName(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="man-phone" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Guest Phone</label>
                        <input id="man-phone" type="text" required placeholder="+251 9... or 09..." value={manPhone} onChange={(e)=>setManPhone(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="man-email" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Contact Email</label>
                        <input id="man-email" type="email" placeholder="Optional" value={manEmail} onChange={(e)=>setManEmail(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label htmlFor="man-roomtype" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Room Type</label>
                        <select id="man-roomtype" value={manRoomId} onChange={(e)=>setManRoomId(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200">
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.nameEn}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="man-ci" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Check In Date</label>
                        <input id="man-ci" type="date" required value={manCheckIn} onChange={(e)=>setManCheckIn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 text-stone-400" />
                      </div>
                      <div>
                        <label htmlFor="man-co" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Check Out Date</label>
                        <input id="man-co" type="date" required value={manCheckOut} onChange={(e)=>setManCheckOut(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 text-stone-400" />
                      </div>
                      <div>
                        <label htmlFor="man-guests-ct" className="block text-[9px] text-stone-550 uppercase tracking-wider font-mono">Total Guests</label>
                        <input id="man-guests-ct" type="number" value={manGuests} onChange={(e)=>setManGuests(Number(e.target.value))} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-1.5 px-4 rounded text-xs uppercase tracking-wider cursor-pointer">
                      + Register Walk-In Guest Log
                    </button>
                  </form>

                  {/* Table List of Inquiries */}
                  {inquiries.length === 0 ? (
                    <div className="text-center font-mono py-8 bg-stone-950/40 rounded border border-stone-850 text-xs text-stone-500">
                      No Reservation logs found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="bg-stone-950/80 p-5 rounded-lg border border-stone-850 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-stone-900 pb-2.5 gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-stone-150 text-sm">{inq.guestName}</h4>
                                {inq.isManual && <span className="text-[8px] bg-sky-950 text-sky-400 border border-sky-800/40 px-1.5 py-0.2 rounded font-mono">WALK-IN</span>}
                              </div>
                              <p className="text-xs text-stone-450 mt-0.5">{inq.phone} • {inq.email}</p>
                            </div>

                            {/* Status Pills */}
                            <div className="flex items-center gap-2">
                              {inq.status === 'Pending' && <span className="text-[10px] uppercase font-mono bg-amber-950 text-amber-500 border border-amber-900/50 px-2 py-0.5 rounded leading-none font-bold">Pending Review</span>}
                              {inq.status === 'Confirmed' && <span className="text-[10px] uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded leading-none font-bold">Confirmed ✓</span>}
                              {inq.status === 'Cancelled' && <span className="text-[10px] uppercase font-mono bg-red-950 text-red-500 border border-red-900/50 px-2 py-0.5 rounded leading-none font-bold">Declined ✗</span>}
                              {inq.status === 'CheckedIn' && <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded leading-none font-bold">Checked In ●</span>}
                              {inq.status === 'CheckedOut' && <span className="text-[10px] uppercase font-mono bg-stone-900 text-stone-500 border border-stone-800 px-2 py-0.5 rounded leading-none font-bold">Checked Out ⃝</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-stone-900/50 p-2.5 rounded border border-stone-900 text-[11px]">
                            <div><span className="text-stone-550 block text-[9px] uppercase font-mono">Room Option</span><strong>{inq.roomNameEn}</strong></div>
                            <div><span className="text-stone-550 block text-[9px] uppercase font-mono">Check In</span>{inq.checkIn}</div>
                            <div><span className="text-stone-550 block text-[9px] uppercase font-mono">Check Out</span>{inq.checkOut}</div>
                            <div><span className="text-stone-550 block text-[9px] uppercase font-mono">Guests Count</span>{inq.guestsCount} Guest(s)</div>
                          </div>

                          {inq.notes && <p className="text-xs text-stone-400 italic bg-stone-900/30 p-2.5 rounded leading-relaxed">"{inq.notes}"</p>}

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-stone-900 gap-3">
                            <span className="text-[9px] font-mono text-stone-550">Registered: {new Date(inq.dateSubmitted).toLocaleString()}</span>
                            
                            <div className="flex items-center gap-2">
                              {inq.status === 'Pending' && (
                                <>
                                  <button onClick={()=>updateInquiryStatus(inq.id, 'Confirmed')} className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-1 px-3 rounded text-[10px] uppercase tracking-wider cursor-pointer">Confirm</button>
                                  <button onClick={()=>updateInquiryStatus(inq.id, 'Cancelled')} className="border border-red-900/50 text-red-400 hover:bg-red-950 text-[10px] py-1 px-3 rounded uppercase tracking-wider cursor-pointer">Decline</button>
                                </>
                              )}
                              
                              {inq.status === 'Confirmed' && (
                                <button onClick={()=>updateInquiryStatus(inq.id, 'CheckedIn')} className="bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold py-1 px-3 rounded text-[10px] uppercase tracking-wider cursor-pointer">Check In Guest</button>
                              )}

                              {inq.status === 'CheckedIn' && (
                                <button onClick={()=>updateInquiryStatus(inq.id, 'CheckedOut')} className="bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold py-1 px-3 rounded text-[10px] uppercase tracking-wider cursor-pointer border border-stone-700">Check Out Guest</button>
                              )}

                              <button 
                                onClick={()=>{ if (confirm('Purge reservation?')) deleteInquiry(inq.id); }} 
                                className="bg-stone-900 border border-stone-800 text-stone-500 hover:text-red-400 p-1.5 rounded ml-2 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- 2. ROOMS MANAGER --- */}
              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-500" />
                      <span>Sanctuary Rooms Manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Create new listings, edit nightly prices in USD & local ETB, and customize description paragraph blocks.
                    </p>
                  </div>

                  {/* Room Form */}
                  <form onSubmit={handleSaveRoom} className="bg-stone-950 p-6 rounded-lg border border-stone-850 space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono block">
                      {editingRoomId ? '📝 Mode: Edit Existing Hotel Sanctuary' : '➕ Mode: Add New Hotel Sanctuary'}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="room-name-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Room Name (English)</label>
                        <input id="room-name-en" type="text" required placeholder="Deluxe Double Room" value={roomNameEn} onChange={(e)=>setRoomNameEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="room-name-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Room Name (Amharic)</label>
                        <input id="room-name-am" type="text" required placeholder="ዴሉክስ ባለ ሁለት አልጋ ክፍል" value={roomNameAm} onChange={(e)=>setRoomNameAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label htmlFor="room-p-usd" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Price (USD / Night)</label>
                        <input id="room-p-usd" type="number" required value={roomPriceUSD} onChange={(e)=>setRoomPriceUSD(Number(e.target.value))} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 font-mono" />
                      </div>
                      <div>
                        <label htmlFor="room-p-etb" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Price (ETB / Night)</label>
                        <input id="room-p-etb" type="number" required value={roomPriceETB} onChange={(e)=>setRoomPriceETB(Number(e.target.value))} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 font-mono" />
                      </div>
                      <div>
                        <label htmlFor="room-bed-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Bed Configuration (EN)</label>
                        <input id="room-bed-en" type="text" placeholder="1 King Bed" value={roomBedEn} onChange={(e)=>setRoomBedEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="room-size-sqm" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Room Size (SqM)</label>
                        <input id="room-size-sqm" type="number" value={roomSize} onChange={(e)=>setRoomSize(Number(e.target.value))} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="room-desc-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Description (English)</label>
                        <textarea id="room-desc-en" required rows={3} placeholder="Room detailed overview..." value={roomDescEn} onChange={(e)=>setRoomDescEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="room-desc-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Description (Amharic)</label>
                        <textarea id="room-desc-am" required rows={3} placeholder="በክፍሉ ውስጥ የሚገኙ አገልግሎቶች ዝርዝር መግለጫ..." value={roomDescAm} onChange={(e)=>setRoomDescAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200/90" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="room-amenities-en" className="block text-[11px] text-stone-400 font-semibold mb-1">Amenities (English, Comma Separated)</label>
                        <input id="room-amenities-en" type="text" placeholder="AC, Private Balcony, High-Speed WiFi, City View" value={roomAmenitiesEn} onChange={(e)=>setRoomAmenitiesEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="room-amenities-am" className="block text-[11px] text-stone-400 font-semibold mb-1">Amenities (Amharic, Comma Separated)</label>
                        <input id="room-amenities-am" type="text" placeholder="የአየር ማቀዝቀዣ, ፈጣን ዋይፋይ, የከተማ እይታ, ሻወር" value={roomAmenitiesAm} onChange={(e)=>setRoomAmenitiesAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="room-image-src" className="block text-[11px] text-stone-400 font-semibold mb-1">Main Cover Photo URL</label>
                      <input id="room-image-src" type="text" placeholder="https://unsplash.com/room-photo-url" value={roomImg} onChange={(e)=>setRoomImg(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 font-mono" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      {editingRoomId && (
                        <button type="button" onClick={()=>{
                          setEditingRoomId(null);
                          setRoomNameEn('');
                          setRoomNameAm('');
                          setRoomDescEn('');
                          setRoomDescAm('');
                        }} className="border border-stone-800 text-stone-400 px-4 py-2 rounded text-xs">Cancel Edit</button>
                      )}
                      <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-widest cursor-pointer">
                        {editingRoomId ? 'Update Sanctuary' : '+ Create Sanctuary'}
                      </button>
                    </div>
                  </form>

                  {/* Room Lists */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold px-1">Registered Sanctuary listings</h3>
                    {rooms.map((room) => (
                      <div key={room.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-950 rounded-lg border border-stone-850 gap-4">
                        <div className="flex items-center gap-4">
                          <img src={room.image} alt={room.nameEn} className="w-16 h-12 object-cover rounded border border-stone-800 shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="font-bold text-xs text-stone-100">{room.nameEn} <span className="text-stone-500 font-mono text-[10px] ml-1">({room.id})</span></h4>
                            <p className="text-[10px] text-amber-500 font-mono font-bold mt-0.5">${room.priceUSD} / {room.priceETB} ETB per Night</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button onClick={()=>{
                            setEditingRoomId(room.id);
                            setRoomNameEn(room.nameEn);
                            setRoomNameAm(room.nameAm);
                            setRoomPriceUSD(room.priceUSD);
                            setRoomPriceETB(room.priceETB);
                            setRoomDescEn(room.descriptionEn);
                            setRoomDescAm(room.descriptionAm);
                            setRoomAmenitiesEn(room.amenitiesEn.join(', '));
                            setRoomAmenitiesAm(room.amenitiesAm.join(', '));
                            setRoomBedEn(room.bedTypeEn);
                            setRoomBedAm(room.bedTypeAm || '');
                            setRoomSize(room.sizeSqM);
                            setRoomImg(room.image);
                          }} className="bg-stone-900 border border-stone-800 text-stone-300 hover:text-white p-2 rounded cursor-pointer" title="Edit room content"><Edit className="w-3.5 h-3.5" /></button>
                          
                          <button onClick={()=>{
                            if (confirm(`Completely delete the room '${room.nameEn}'?`)) {
                              deleteRoom(room.id);
                              triggerToast('Room listing removed!');
                            }
                          }} className="bg-stone-900 border border-stone-800 text-stone-500 hover:text-red-400 p-2 rounded cursor-pointer" title="Delete listing"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 3. DINING MANAGER --- */}
              {activeTab === 'dining' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-500" />
                      <span>Dining Outlet & Menu highlight Manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize gourmet spreads, traditional Jebena coffee settings, or sunset lounge hours and backgrounds.
                    </p>
                  </div>

                  <form onSubmit={handleSaveDining} className="bg-stone-950 p-6 rounded-lg border border-stone-850 space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono block">
                      {editingDiningId ? '📝 Edit Cuisine Highlight' : '➕ Register Cuisine highlight'}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="din-name-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Cuisine Option (EN)</label>
                        <input id="din-name-en" type="text" required placeholder="Gourmet Buffet Breakfast" value={diningNameEn} onChange={(e)=>setDiningNameEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="din-name-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Cuisine Option (AM)</label>
                        <input id="din-name-am" type="text" required placeholder="ልዩ የቡፌ ቁርስ" value={diningNameAm} onChange={(e)=>setDiningNameAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="din-tag-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Promo Tag (EN)</label>
                        <input id="din-tag-en" type="text" placeholder="Complimentary for Guests" value={diningTagEn} onChange={(e)=>setDiningTagEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="din-tag-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Promo Tag (AM)</label>
                        <input id="din-tag-am" type="text" placeholder="ለእንግዶች በነጻ" value={diningTagAm} onChange={(e)=>setDiningTagAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="din-hours" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Service Hours</label>
                        <input id="din-hours" type="text" placeholder="6:30 AM - 10:00 AM" value={diningHours} onChange={(e)=>setDiningHours(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="din-desc-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Intro (English)</label>
                        <textarea id="din-desc-en" required rows={3} placeholder="Slices of local fresh delicacies..." value={diningDescEn} onChange={(e)=>setDiningDescEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="din-desc-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Intro (Amharic)</label>
                        <textarea id="din-desc-am" required rows={3} placeholder="በባህላዊ መንገድ የተዘጋጁ..." value={diningDescAm} onChange={(e)=>setDiningDescAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="din-img-src" className="block text-[11px] text-stone-400 font-semibold mb-1">Backdrop Image URL</label>
                      <input id="din-img-src" type="text" placeholder="Url to high resolution photo" value={diningImg} onChange={(e)=>setDiningImg(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 font-mono" />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-6 py-2 rounded text-xs uppercase tracking-wider font-extrabold cursor-pointer">
                        {editingDiningId ? 'Save Changes' : '+ Add Cuisine Highlight'}
                      </button>
                    </div>
                  </form>

                  {/* Dining listing list */}
                  <div className="space-y-3">
                    {dining.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-950 rounded-lg border border-stone-850 gap-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.nameEn} className="w-16 h-12 object-cover rounded border border-stone-800 shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <span className="text-[10px] font-mono text-amber-500 uppercase font-semibold block">{item.hours}</span>
                            <h4 className="font-bold text-xs text-stone-150">{item.nameEn}</h4>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button onClick={()=>{
                            setEditingDiningId(item.id);
                            setDiningNameEn(item.nameEn);
                            setDiningNameAm(item.nameAm);
                            setDiningTagEn(item.tagEn);
                            setDiningTagAm(item.tagAm || '');
                            setDiningHours(item.hours);
                            setDiningDescEn(item.descriptionEn);
                            setDiningDescAm(item.descriptionAm);
                            setDiningImg(item.image);
                          }} className="bg-stone-900 border border-stone-800 text-stone-300 hover:text-white p-2 rounded cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                          
                          <button onClick={()=>{ if(confirm('Delete cuisine?')) deleteDiningItem(item.id); }} className="bg-stone-900 border border-stone-800 text-stone-500 hover:text-red-400 p-2 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 4. HEADER MANAGER --- */}
              {activeTab === 'header' && (
                <form onSubmit={handleSaveHeader} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <LayoutList className="w-5 h-5 text-amber-500" />
                      <span>Header Configurations & Logo Manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize dynamic logo text translations, menu items routing labels, and book call-to-actions instantly.
                    </p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 block">Navigation Titles</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hdr-logo-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Logo Label (English)</label>
                        <input id="hdr-logo-en" type="text" required value={headerLogoEn} onChange={(e)=>setHeaderLogoEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="hdr-logo-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Logo Label (Amharic)</label>
                        <input id="hdr-logo-am" type="text" required value={headerLogoAm} onChange={(e)=>setHeaderLogoAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hdr-btn-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Primary Booking CTA Button (EN)</label>
                        <input id="hdr-btn-en" type="text" required value={headerBtnEn} onChange={(e)=>setHeaderBtnEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="hdr-btn-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Primary Booking CTA Button (AM)</label>
                        <input id="hdr-btn-am" type="text" required value={headerBtnAm} onChange={(e)=>setHeaderBtnAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer">
                    Save Header Elements
                  </button>
                </form>
              )}

              {/* --- 5. HERO MANAGER --- */}
              {activeTab === 'hero' && (
                <form onSubmit={handleSaveHero} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>Hero & Welcome Banner Editor</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize top headlines, sub-copy descriptions, background hero illustrations, and explore triggers.
                    </p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4 font-mono text-xs">
                    <div>
                      <label htmlFor="her-img" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Parallax Hero Image Backdrop source</label>
                      <input id="her-img" type="text" required value={heroImg} onChange={(e)=>setHeroImg(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 font-mono text-xs" />
                      <span className="text-[10px] text-stone-600 mt-1 block">Default fallback is east star facade daytime image.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="her-head-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Main Headline (EN)</label>
                        <input id="her-head-en" type="text" required value={heroHeadEn} onChange={(e)=>setHeroHeadEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="her-head-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Main Headline (AM)</label>
                        <input id="her-head-am" type="text" required value={heroHeadAm} onChange={(e)=>setHeroHeadAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="her-sub-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Subtitle Overview Paragraph (EN)</label>
                        <textarea id="her-sub-en" rows={3} required value={heroSubEn} onChange={(e)=>setHeroSubEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="her-sub-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Subtitle Overview Paragraph (AM)</label>
                        <textarea id="her-sub-am" rows={3} required value={heroSubAm} onChange={(e)=>setHeroSubAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="her-cta-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Explore Rooms Button Text (EN)</label>
                        <input id="her-cta-en" type="text" required value={heroCtaEn} onChange={(e)=>setHeroCtaEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="her-cta-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Explore Rooms Button Text (AM)</label>
                        <input id="her-cta-am" type="text" required value={heroCtaAm} onChange={(e)=>setHeroCtaAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer">
                    Publish Hero Updates
                  </button>
                </form>
              )}

              {/* --- 6. ABOUT US MANAGER --- */}
              {activeTab === 'about' && (
                <form onSubmit={handleSaveAbout} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Info className="w-5 h-5 text-amber-500" />
                      <span>About Us text and image manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize mission statements, staff parameters, and dynamic landscape photography offsets.
                    </p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4 text-xs font-mono">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="abt-p1-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Primary Paragraph Block (EN)</label>
                        <textarea id="abt-p1-en" required rows={4} value={aboutPara1En} onChange={(e)=>setAboutPara1En(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="abt-p1-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Primary Paragraph Block (AM)</label>
                        <textarea id="abt-p1-am" required rows={4} value={aboutPara1Am} onChange={(e)=>setAboutPara1Am(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="abt-p2-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Secondary Paragraph Block (EN)</label>
                        <textarea id="abt-p2-en" required rows={3} value={aboutPara2En} onChange={(e)=>setAboutPara2En(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="abt-p2-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Secondary Paragraph Block (AM)</label>
                        <textarea id="abt-p2-am" required rows={3} value={aboutPara2Am} onChange={(e)=>setAboutPara2Am(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="abt-m-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Mission Statement (EN)</label>
                        <input id="abt-m-en" type="text" required value={aboutMissionEn} onChange={(e)=>setAboutMissionEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="abt-m-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Mission Statement (AM)</label>
                        <input id="abt-m-am" type="text" required value={aboutMissionAm} onChange={(e)=>setAboutMissionAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="abt-staff-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Staff details (EN)</label>
                        <input id="abt-staff-en" type="text" required value={aboutStaffEn} onChange={(e)=>setAboutStaffEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="abt-staff-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Staff details (AM)</label>
                        <input id="abt-staff-am" type="text" required value={aboutStaffAm} onChange={(e)=>setAboutStaffAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="abt-ext" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Exterior Collage Photo URL</label>
                        <input id="abt-ext" type="text" required value={aboutExtPic} onChange={(e)=>setAboutExtPic(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 font-mono text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="abt-terr" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Terrace Collage Photo URL</label>
                        <input id="abt-terr" type="text" required value={aboutTerrPic} onChange={(e)=>setAboutTerrPic(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 font-mono text-xs text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer font-sans">
                    Publish About Us Paragraphs
                  </button>
                </form>
              )}

              {/* --- 7. IMAGE GALLERY & MEDIA MANAGER --- */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-amber-500" />
                      <span>Image Gallery and digital asset manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Register dynamic visual graphics (like rooms, meals, terraces) with their category and copy-friendly local URLs.
                    </p>
                  </div>

                  {/* Add media */}
                  <form onSubmit={handleAddMedia} className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-3 font-mono text-xs">
                    <span className="text-[10px] font-bold text-amber-500 uppercase font-mono block">📁 Register New Graphic Asset</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label htmlFor="med-url" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Image Direct Link URL</label>
                        <input id="med-url" type="text" required placeholder="Https://images.unsplash.com/..." value={mediaUrl} onChange={(e)=>setMediaUrl(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="med-cat" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Scope Category</label>
                        <select id="med-cat" value={mediaCategory} onChange={(e)=>setMediaCategory(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200">
                          <option value="Rooms">Rooms Manager</option>
                          <option value="Dining">Dining Manager</option>
                          <option value="Hero">Hero Layout</option>
                          <option value="About">About Us Section</option>
                          <option value="Logo">Official Logo</option>
                          <option value="Other">Standard Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="med-label" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Brief Description / Short Asset Name</label>
                      <input id="med-label" type="text" placeholder="E.g. Penthouse bathroom tub closeup" value={mediaName} onChange={(e)=>setMediaName(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                    </div>

                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-1.5 rounded font-extrabold uppercase text-[10px] tracking-wider cursor-pointer font-sans">
                      Add Media Asset
                    </button>
                  </form>

                  {/* Registered Asset collection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaImages.map((img) => (
                      <div key={img.id} className="bg-stone-950 p-3 rounded-lg border border-stone-850 flex items-start gap-3">
                        {img.url ? (
                          <img src={img.url} alt={img.name} className="w-14 h-14 object-cover rounded border border-stone-800 shrink-0" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-14 h-14 bg-stone-900 border border-stone-800 rounded flex items-center justify-center shrink-0 font-mono text-stone-600 text-[10px]">Empty</div>
                        )}
                        <div className="space-y-1 overflow-hidden w-full">
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[8px] uppercase tracking-wider bg-amber-600/10 text-amber-500 px-1.5 py-0.2 rounded font-mono font-bold">{img.category}</span>
                            <button onClick={()=>deleteMediaImage(img.id)} className="text-stone-600 hover:text-red-400 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                          <h4 className="font-bold text-[11px] text-stone-200 truncate">{img.name}</h4>
                          <span 
                            onClick={()=>{
                              navigator.clipboard.writeText(img.url);
                              triggerToast('Linked workspace image URL copied to clipboard!');
                            }}
                            className="text-[9px] font-mono text-stone-500 cursor-pointer block truncate hover:underline"
                            title="Click to copy asset link"
                          >
                            🔗 {img.url || 'None / Empty'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 8. REVIEW MODERATION --- */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-100 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span>Testimonials & Review Moderation Panel</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Audit guest ratings in English and Amharic. Dismiss inappropriate entries, or publish real testimonials manually.
                    </p>
                  </div>

                  {/* Manual Testimony creation form */}
                  <form onSubmit={handleAddReviewForm} className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-3 text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 block">➕ Add Custom Client Testimony</span>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <label htmlFor="rev-auth" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Client Name</label>
                        <input id="rev-auth" type="text" required placeholder="E.g. Sven Lindqvist" value={revAuthor} onChange={(e)=>setRevAuthor(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="rev-rat" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Rating (1-5 Star)</label>
                        <select id="rev-rat" value={revRating} onChange={(e)=>setRevRating(Number(e.target.value))} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200">
                          <option value="5">5 Stars ★★★★★</option>
                          <option value="4">4 Stars ★★★★</option>
                          <option value="3">3 Stars ★★★</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="rev-loc-en" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Location (EN)</label>
                        <input id="rev-loc-en" type="text" value={revLocEn} onChange={(e)=>setRevLocEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="rev-loc-am" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Location (AM)</label>
                        <input id="rev-loc-am" type="text" value={revLocAm} onChange={(e)=>setRevLocAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="rev-body-en" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Review Text (English)</label>
                        <textarea id="rev-body-en" required rows={2} value={revTextEn} onChange={(e)=>setRevTextEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="rev-body-am" className="block text-[9px] text-stone-500 uppercase tracking-wider font-mono">Review Text (Amharic)</label>
                        <textarea id="rev-body-am" required rows={2} value={revTextAm} onChange={(e)=>setRevTextAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                    </div>

                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-4 py-1.5 rounded uppercase tracking-wider text-[10px] cursor-pointer">
                      Save Client Testimony
                    </button>
                  </form>

                  {/* testimony list */}
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="bg-stone-950 p-4 rounded-lg border border-stone-850 flex justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs text-stone-150">{rev.author}</h4>
                            <span className="text-[10px] font-mono text-amber-500">{rev.rating} ★ Rating</span>
                          </div>
                          <span className="text-[9px] text-stone-550 block font-mono">Location: {rev.locationEn}</span>
                          <p className="text-xs text-stone-400 italic font-light">"{rev.textEn}"</p>
                        </div>

                        <button onClick={()=>{ if (confirm('Purge testimonial?')) deleteReview(rev.id); }} className="text-stone-600 hover:text-red-400 self-center border border-stone-900 p-2 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 9. PROMOTIONS MANAGER --- */}
              {activeTab === 'promotions' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Percent className="w-5 h-5 text-amber-500" />
                      <span>Promotions, Coupons & Offers Manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize dynamic discount campaign banner badges, active/inactive switches, and promo voucher codes.
                    </p>
                  </div>

                  <form onSubmit={handleSavePromo} className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4 text-xs font-mono">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 block">➕ Raise New Campaign Campaign</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="prm-t-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Campaign Headline (EN)</label>
                        <input id="prm-t-en" type="text" required placeholder="Double Night Get Complimentary Breakfast" value={promoTitleEn} onChange={(e)=>setPromoTitleEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="prm-t-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Campaign Headline (AM)</label>
                        <input id="prm-t-am" type="text" required placeholder="ይቆዩ... ይደሰቱ" value={promoTitleAm} onChange={(e)=>setPromoTitleAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <div>
                        <label htmlFor="prm-d-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Detailed Description (EN)</label>
                        <textarea id="prm-d-en" required rows={2} value={promoDescEn} onChange={(e)=>setPromoDescEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                      <div>
                        <label htmlFor="prm-d-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Detailed Description (AM)</label>
                        <textarea id="prm-d-am" required rows={2} value={promoDescAm} onChange={(e)=>setPromoDescAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-xs">
                      <div>
                        <label htmlFor="prm-c" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Coupon code</label>
                        <input id="prm-c" type="text" placeholder="EAST2026" value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 font-mono text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="prm-b-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Badge label (EN)</label>
                        <input id="prm-b-en" type="text" value={promoBadgeEn} onChange={(e)=>setPromoBadgeEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="prm-b-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Badge label (AM)</label>
                        <input id="prm-b-am" type="text" value={promoBadgeAm} onChange={(e)=>setPromoBadgeAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-500 uppercase font-mono mb-1.5">Active State</span>
                        <button type="button" onClick={()=>setPromoActive(!promoActive)} className="flex items-center gap-1.5 text-[#bfbbb3]">
                          {promoActive ? <ToggleRight className="w-8 h-8 text-amber-500 cursor-pointer" /> : <ToggleLeft className="w-8 h-8 text-stone-600 cursor-pointer" />}
                          <span className="text-xs uppercase font-mono font-bold">{promoActive ? 'Active' : 'Off'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="font-sans">
                      <label htmlFor="prm-pic-src" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Promo cover url</label>
                      <input id="prm-pic-src" type="text" placeholder="Url to landscape cover image" value={promoImg} onChange={(e)=>setPromoImg(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100 font-mono" />
                    </div>

                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer font-sans">
                      Publish Coupon Campaign
                    </button>
                  </form>

                  {/* Promotion Campaign Table */}
                  <div className="space-y-3">
                    {promotions.map((promo) => (
                      <div key={promo.id} className="bg-stone-950 p-4 rounded-lg border border-stone-850 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={promo.image} alt={promo.titleEn} className="w-16 h-12 object-cover rounded border border-stone-800 shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs text-stone-200">{promo.titleEn}</h4>
                              <span className="text-[8px] uppercase font-mono tracking-wider font-bold bg-amber-600/10 text-amber-500 px-1.5 py-0.2 rounded">{promo.discountBadgeEn}</span>
                            </div>
                            <p className="text-[10px] text-stone-500 font-mono">Code: {promo.code} • Status: {promo.isActive ? '🟢 Active' : '🔴 Suspended'}</p>
                          </div>
                        </div>

                        <button onClick={()=>{ if(confirm('Delete promo?')) deletePromotion(promo.id); }} className="text-stone-600 hover:text-red-400 p-2 border border-stone-900 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 10. FOOTER MANAGER --- */}
              {activeTab === 'footer' && (
                <form onSubmit={handleSaveFooter} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-500" />
                      <span>Footer General Info & Legal Manager</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Customize dynamic receptionist phone lines, shared corporate email, Facebook linkages, and copyright assertions.
                    </p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="ft-office-email" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Office Contact Email</label>
                        <input id="ft-office-email" type="email" required value={footEmail} onChange={(e)=>setFootEmail(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200 font-mono" />
                      </div>
                      <div>
                        <label htmlFor="ft-phone1" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Receptionist Phone 1</label>
                        <input id="ft-phone1" type="text" required value={footPhone1} onChange={(e)=>setFootPhone1(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200 font-mono" />
                      </div>
                      <div>
                        <label htmlFor="ft-phone2" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Receptionist Phone 2</label>
                        <input id="ft-phone2" type="text" required value={footPhone2} onChange={(e)=>setFootPhone2(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200 font-mono" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ft-addr-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Mailing Address (EN)</label>
                        <input id="ft-addr-en" type="text" required value={footAddressEn} onChange={(e)=>setFootAddressEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="ft-addr-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Mailing Address (AM)</label>
                        <input id="ft-addr-am" type="text" required value={footAddressAm} onChange={(e)=>setFootAddressAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-[#bfbbb3]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ft-fb-url" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Facebook Handle Profile URL</label>
                        <input id="ft-fb-url" type="text" required value={footFB} onChange={(e)=>setFootFB(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200 font-mono" />
                      </div>
                      <div>
                        <label htmlFor="ft-instagram-url" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Proximity Airport drive text</label>
                        <input id="ft-instagram-url" type="text" value="Under 10 minutes drive from Dire Dawa International Airport (ABA)." disabled className="w-full bg-stone-950 border border-stone-850 rounded px-2.5 py-2 text-xs text-stone-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ft-copy-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Legal Copyright Text (EN)</label>
                        <input id="ft-copy-en" type="text" required value={footCopyrightEn} onChange={(e)=>setFootCopyrightEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="ft-copy-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Legal Copyright Text (AM)</label>
                        <input id="ft-copy-am" type="text" required value={footCopyrightAm} onChange={(e)=>setFootCopyrightAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer">
                    Publish Footer configuration Settings
                  </button>
                </form>
              )}

              {/* --- 11. CONTACT & MAP MANAGER --- */}
              {activeTab === 'contact' && (
                <form onSubmit={handleSaveContactMap} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span>Contact settings and dynamic Map Embed editor</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Audit map section destination offsets without placing intrusive inline frames inside headers. Change operational emails.
                    </p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4 text-xs font-mono">
                    <div>
                      <label htmlFor="map-iframe-url" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1.5">Google Maps iframe Embed Source URL</label>
                      <textarea id="map-iframe-url" rows={4} required value={conMapUrl} onChange={(e)=>setConMapUrl(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded p-2.5 text-stone-100 font-mono text-[10.5px]" />
                      <span className="text-[10px] text-stone-600 mt-1 block leading-relaxed">Ensure you isolate the 'src' attribute inside Google Maps' standard iframe sharing parameters. Correct URL must lead with: https://www.google.com/maps/embed?...</span>
                    </div>

                    <div>
                      <label htmlFor="map-contact-email" className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">Core public booking inquiries recipient email</label>
                      <input id="map-contact-email" type="email" required value={conEmail} onChange={(e)=>setConEmail(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-mono" />
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer">
                    Save Location Map Settings
                  </button>
                </form>
              )}

              {/* --- 12. GENERAL SETTINGS & SEO --- */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSeoSettings} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-amber-500" />
                      <span>SEO Configurations & General Settings</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-normal font-light">
                      Configure dynamic browser window titles, indexing keyword tags, metadata, and core localized brand attributes.
                    </p>
                  </div>

                  {/* SEO details */}
                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block font-mono">Standard SEO Parameters</span>
                    
                    <div>
                      <label htmlFor="seo-site-title" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Default Browser tab Title (leads dynamically)</label>
                      <input id="seo-site-title" type="text" required value={seoTitle} onChange={(e)=>setSeoTitle(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="seo-meta-desc" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Index Meta Search description</label>
                      <textarea id="seo-meta-desc" required rows={2} value={seoDesc} onChange={(e)=>setSeoDesc(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                    </div>

                    <div>
                      <label htmlFor="seo-tags-csv" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">SEO Search engine Keywords tags (Comma Separated)</label>
                      <input id="seo-tags-csv" type="text" required value={seoTags} onChange={(e)=>setSeoTags(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                    </div>
                  </div>

                  {/* Locally Managed Brand parameters */}
                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block font-mono">Core hotel Metadata</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="set-h-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Hotel brand Name (EN)</label>
                        <input id="set-h-en" type="text" required value={infoNameEn} onChange={(e)=>setInfoNameEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="set-h-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Hotel brand Name (AM)</label>
                        <input id="set-h-am" type="text" required value={infoNameAm} onChange={(e)=>setInfoNameAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="set-tag-en" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Official Tagline / Focus Enounce (EN)</label>
                        <input id="set-tag-en" type="text" required value={infoTagEn} onChange={(e)=>setInfoTagEn(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                      <div>
                        <label htmlFor="set-tag-am" className="block text-[10px] text-stone-500 uppercase font-mono mb-1">Official Tagline / Focus Enounce (AM)</label>
                        <input id="set-tag-am" type="text" required value={infoTagAm} onChange={(e)=>setInfoTagAm(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-2 rounded text-xs uppercase tracking-wider cursor-pointer">
                    Publish Metadata
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
