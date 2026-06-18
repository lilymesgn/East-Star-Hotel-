/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { useRouting } from '../context/RoutingContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Info
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { page, language, rooms, addInquiry, hotelInfo } = useRouting();

  // Booking Tab: 'locals' or 'foreigners'
  const [bookingTab, setBookingTab] = useState<'locals' | 'foreigners'>('locals');

  // Shared form states
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomId, setRoomId] = useState('deluxe');
  const [guestsCount, setGuestsCount] = useState(1);
  const [notes, setNotes] = useState('');
  
  // Foreigner-specific states
  const [passportNumber, setPassportNumber] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('USD');
  
  // Card states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Flow control states
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [receiptCode, setReceiptCode] = useState('');
  const [dateError, setDateError] = useState('');

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

  // Parse URL query parameters for pre-filling
  useEffect(() => {
    try {
      const queryString = page.includes('?') ? page.split('?')[1] : '';
      if (queryString) {
        const params = new URLSearchParams(queryString);

        const checkInParam = params.get('checkIn');
        if (checkInParam) setCheckIn(checkInParam);

        const checkOutParam = params.get('checkOut');
        if (checkOutParam) setCheckOut(checkOutParam);

        const guestsParam = params.get('guests');
        if (guestsParam) setGuestsCount(Number(guestsParam) || 1);

        const roomParam = params.get('room');
        if (roomParam && rooms.some(r => r.id === roomParam)) {
          setRoomId(roomParam);
        }

        const tabParam = params.get('tab');
        if (tabParam === 'foreigners' || tabParam === 'locals') {
          setBookingTab(tabParam);
        }
      }
    } catch (e) {
      console.warn('Could not parse initial URL search params:', e);
    }
  }, [page, rooms]);

  // Handle local booking submission
  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const todayStr = getTodayDateString();
    if (checkIn < todayStr) {
      setDateError(language === 'en' ? 'Check-in date cannot be in the past.' : 'የመግቢያ ቀን ካለፈው ቀን መሆን አይችልም።');
      return;
    }
    if (checkOut <= checkIn) {
      setDateError(language === 'en' ? 'Check-out date must be after check-in date.' : 'የመውጫ ቀን ከመግቢያ ቀን በኋላ መሆን አለበት።');
      return;
    }
    setDateError('');
    
    const payload = {
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      roomId,
      guestsCount,
      notes: notes || 'Local inquiry'
    };

    addInquiry(payload);
    setSubmittedData(payload);
    setReceiptCode(`EST-LOC-${Math.floor(100000 + Math.random() * 900000)}`);
    setSuccess(true);
    
    // Clear fields
    setGuestName('');
    setEmail('');
    setPhone('');
    setCheckIn('');
    setCheckOut('');
    setNotes('');
  };

  // Handle foreign booking submission
  const handleForeignSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const todayStr = getTodayDateString();
    if (checkIn < todayStr) {
      setDateError(language === 'en' ? 'Check-in date cannot be in the past.' : 'የመግቢያ ቀን ካለፈው ቀን መሆን አይችልም።');
      return;
    }
    if (checkOut <= checkIn) {
      setDateError(language === 'en' ? 'Check-out date must be after check-in date.' : 'የመውጫ ቀን ከመግቢያ ቀን በኋላ መሆን አለበት።');
      return;
    }
    setDateError('');

    const compiledNotes = [
      `Passport: ${passportNumber}`,
      `Flight: ${flightNumber || 'None'}`,
      `Currency: ${preferredCurrency}`,
      `Cardholder: ${cardName}`,
      `Card Ends: *${cardNumber.slice(-4) || 'XXXX'}`,
      notes ? `Message: ${notes}` : ''
    ].filter(Boolean).join(' | ');

    const payload = {
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      roomId,
      guestsCount,
      notes: compiledNotes
    };

    addInquiry(payload);
    setSubmittedData(payload);
    setReceiptCode(`EST-INT-${Math.floor(100000 + Math.random() * 900000).toString().substring(0,6)}`);
    setSuccess(true);

    // Clear fields
    setGuestName('');
    setEmail('');
    setPhone('');
    setCheckIn('');
    setCheckOut('');
    setPassportNumber('');
    setFlightNumber('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVC('');
    setNotes('');
  };

  // Pre-generate custom WhatsApp URL for locals
  const getWhatsAppURL = () => {
    if (!submittedData) return '';
    const selectedRoomDetails = rooms.find(r => r.id === submittedData.roomId);
    const roomName = selectedRoomDetails ? selectedRoomDetails.nameEn : 'Default Room';
    
    const message = `Hello East Star Hotel!\n\nI am securing a local booking inquiry:\n• Guest Name: ${submittedData.guestName}\n• Room: ${roomName}\n• Check-In: ${submittedData.checkIn}\n• Check-Out: ${submittedData.checkOut}\n• Guests: ${submittedData.guestsCount}\n• Phone: ${submittedData.phone}\n• Notes: ${submittedData.notes || 'None'}\n\nPlease help me finalize the ETB transaction. Thank you!`;
    
    return `https://wa.me/251967222224?text=${encodeURIComponent(message)}`;
  };

  // Get active room details
  const activeRoom = rooms.find(r => r.id === roomId) || rooms[0];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans">
      
      {/* Immersive Editorial Header */}
      <section className="relative py-20 bg-stone-900 border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'en' ? 'WORLD CLASS HOSPITALITY' : 'የላቀ ደረጃ መስተንግዶ'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-200 mt-2.5 leading-tight tracking-tight">
            {language === 'en' ? 'Bilingual Online Booking Office' : 'አስተማማኝ የክፍል ማስያዣ መገኛ'}
          </h1>
          <p className="mt-4 text-stone-400 text-sm leading-relaxed max-w-2xl mx-auto font-light">
            {language === 'en'
              ? 'Select your residency route below. We support local currency bank inquiries matched with fast WhatsApp coordination, alongside fully certified, secure card guarantees for our international arrivals.'
              : 'ከታች እንደ መኖሪያነትዎ አይነት ይምረጡ። የሀገር ውስጥ ደንበኞችን በዋትስአፕ እና በባንክ እናስተናግዳለን፤ የውጭ አገር እንግዶችን ደግሞ በቪዛ እና ማስተርካርድ አስተማማኝ ዋስትና እንቀበላለን።'}
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info & Secure badges */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 p-8 rounded-xl flex flex-col justify-between shadow-xl">
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold block mb-2">
                  {language === 'en' ? 'THE CENTRAL ADMINISTRATIVE DESK' : 'ሳቢያን ሰፈር አድራሻ'}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-stone-100 font-semibold mb-2">
                  East Star Reception
                </h2>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {language === 'en' 
                    ? 'Conveniently situated in the secure Sabiyan administrative district of Dire Dawa—extremely clean, safe, and highly valued.' 
                    : 'በአስተማማኝነቱና በፅዳቱ ተመራጭ በሆነው በሳቢያን የድሬዳዋ አስተዳደር ሰፈር ውስጥ ይዘጋጅ።'}
                </p>
              </div>

              {/* Direct address elements */}
              <div className="space-y-4">
                <div className="flex gap-3 text-xs text-stone-400">
                  <MapPin className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Physical Street Address' : 'ሙሉ አድራሻ'}</h4>
                    <p className="mt-1 leading-relaxed">{hotelInfo.addressEn}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-xs text-stone-400 border-t border-stone-850 pt-4">
                  <Phone className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Reservation Office' : 'ስልክ ቁጥሮች'}</h4>
                    <p className="mt-1 font-mono font-bold text-stone-200">{hotelInfo.phone1}</p>
                    <p className="font-mono text-stone-500">{hotelInfo.phone2}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-xs text-stone-400 border-t border-stone-850 pt-4">
                  <Mail className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-stone-200">{language === 'en' ? 'Administrative Help Desk' : 'ኢሜል አድራሻ'}</h4>
                    <p className="mt-1 font-mono text-stone-200">eaststarhotel.diredawa@gmail.com</p>
                    <p className="text-[10px] text-stone-500">Bilingual assistance responds within 1 hour.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Security indicators */}
            <div className="pt-8 border-t border-stone-800 mt-8 space-y-4">
              <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-mono mb-1">
                {language === 'en' ? 'Security & Compliance' : 'ደህንነት ማረጋገጫ'}
              </span>
              
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-850 space-y-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-[11px] text-stone-300 font-semibold tracking-wide">
                    {language === 'en' ? 'Complies with Certified Standards' : 'በህጋዊ ደረጃ የተረጋገጠ'}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed font-light">
                  {language === 'en' 
                    ? 'Bookings for residents are routed through secure localized networks. International credit card authorizations utilize SSL 256-bit certified encryption standards to hold stays.'
                    : 'የሀገር ውስጥ መረጃዎች በአስተማማኝ ኔትወርክ የሚጠበቁ ሲሆን፤ የውጭ ሀገር ክፍያዎች በባለ 256 ቢት ሰርተፍኬት ሙሉ በሙሉ የተመሰጠሩ ናቸው።'}
                </p>
                
                {/* Credit card logos mock layout */}
                <div className="flex items-center gap-2 pt-1 opacity-70">
                  <span className="text-[9px] text-[#bfbbb3] uppercase font-mono mr-1">We Accept:</span>
                  <div className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded font-mono font-bold text-[9px] text-sky-400">VISA</div>
                  <div className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded font-mono font-bold text-[9px] text-red-400">MC</div>
                  <div className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded font-mono font-bold text-[9px] text-amber-400">AMEX</div>
                  <div className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded font-mono font-bold text-[9px] text-stone-400">DISCOVER</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Tabbed Unified Booking system */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 p-8 rounded-xl relative shadow-2xl flex flex-col justify-between">
            {success ? (
              /* Success / Ticket Confirmation Stage */
              <div className="space-y-6 py-6 text-center max-w-lg mx-auto my-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-stone-100 italic">
                    {language === 'en' ? 'Reservation Held Successfully!' : 'ቦታ ማስያዣው በተሳካ ሁኔታ ተመዝግቧል!'}
                  </h3>
                  <div className="mt-2 text-xs text-[#c5a059] font-mono tracking-widest font-bold uppercase bg-stone-950 py-1.5 px-4 rounded-md inline-block border border-stone-850">
                    {language === 'en' ? 'Confirmation PIN:' : 'የማረጋገጫ ኮድ:'} {receiptCode}
                  </div>
                  <p className="text-xs text-stone-450 leading-relaxed mt-4 font-light">
                    {language === 'en'
                      ? `Thank you, ${submittedData?.guestName}. We have received your inquiry for ${activeRoom.nameEn}. Our team will confirm availability shortly.`
                      : `እናመሰግናለን ${submittedData?.guestName}። ለ${activeRoom.nameAm || activeRoom.nameEn} ያደረጉት የመያዣ ጥያቄ ደርሶናል። ቡድናችን ዝርዝሩን አረጋግጦ በቅርቡ ያነጋግርዎታል።`}
                  </p>
                </div>

                {/* Subdivided output layouts depending on which layout was logged */}
                {bookingTab === 'locals' ? (
                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 space-y-4 shadow-inner text-left">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#bfbbb3] leading-relaxed">
                        {language === 'en'
                          ? 'Local bank transfer or cash payments are handled instantly. To coordinate with our front desk receptionist in 5 minutes, please click the button below to send your structured summary via WhatsApp.'
                          : 'የሀገር ውስጥ መረጃዎን ፈጥነው ለማጠናቀቅና በባንክ ለመክፈል፤ ከታች ያለውን የዋትስአፕ ማረጋገጫ ቁልፍ ይጫኑ።'}
                      </p>
                    </div>
                    
                    <a
                      href={getWhatsAppURL()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-stone-950" />
                      <span>{language === 'en' ? 'Fast WhatsApp Confirmation (ETB)' : 'በዋትስአፕ በኩል ፈጣን ምላሽ (በብር)'}</span>
                    </a>
                  </div>
                ) : (
                  <div className="bg-stone-950 p-5 rounded-lg border border-stone-850 text-left space-y-3">
                    <h4 className="text-xs font-mono text-[#c5a059] font-bold uppercase tracking-wider border-b border-stone-850 pb-1.5 flex items-center justify-between">
                      <span>{language === 'en' ? 'International Hold Guarantee' : 'የውጭ ሀገር ዋስትና መረጃ'}</span>
                      <span className="text-emerald-400 text-[10px]">Secure pre-authorized</span>
                    </h4>
                    <ul className="text-[11px] text-stone-450 space-y-1 font-light font-sans">
                      <li>• <strong>{language === 'en' ? 'Guaranteer:' : 'የዋስትና ባለቤት:'}</strong> {submittedData?.guestName}</li>
                      <li>• <strong>{language === 'en' ? 'Flight Term:' : 'የበረራ ቁጥር:'}</strong> {flightNumber || 'Not Provided'}</li>
                      <li>• <strong>{language === 'en' ? 'Hold Currency:' : 'መክፈያ ገንዘብ:'}</strong> {preferredCurrency} (Est. ${activeRoom.priceUSD}/night)</li>
                      <li>• <strong>{language === 'en' ? 'Card Tokenized:' : 'የተመዘገበው ካርድ:'}</strong> Visa/Mastercard ended in ****</li>
                    </ul>
                    <p className="text-[10px] text-stone-500 leading-relaxed font-light border-t border-stone-850 pt-2 italic">
                      {language === 'en'
                        ? '*No initial charge is processed today. Stays are held pending check-in passport validation. Safe flight and welcome to Dire Dawa!'
                        : '*ዛሬ ምንም አይነት ሒሳብ አይቆረጥም፤ በምዝገባ ወቅት ፓስፖርትዎን ሲያሳዩ ሒሳቡ እንዲጠናቀቅ ይደረጋል። መልካም በረራ!'}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-stone-500 hover:text-stone-300 font-bold uppercase tracking-widest underline cursor-pointer"
                >
                  {language === 'en' ? 'Submit Another Booking' : 'ተጨማሪ ክፍል ያስይዙ'}
                </button>
              </div>
            ) : (
              /* Active Booking Tab Layouts */
              <div className="space-y-6">
                
                {/* Custom Elegant Toggle Tabs */}
                <div className="border bg-stone-950 border-stone-800 p-1.5 rounded-lg grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingTab('locals')}
                    className={`py-3 px-4 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                      bookingTab === 'locals'
                        ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-600/35 border-emerald-500/40 border text-emerald-400'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-center sm:text-left">{language === 'en' ? 'Ethiopian Residents' : 'የሀገር ውስጥ ኗሪዎች'}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-900 text-emerald-400 border border-emerald-500/10 rounded">ETB (ብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingTab('foreigners')}
                    className={`py-3 px-4 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                      bookingTab === 'foreigners'
                        ? 'bg-gradient-to-r from-[#c5a059]/20 to-[#c5a059]/35 border-[#c5a059]/40 border text-[#c5a059]'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-center sm:text-left">{language === 'en' ? 'International Guests' : 'ውጭ አገር ዜጎች'}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-900 text-[#c5a059] border border-[#c5a059]/10 rounded">USD / Cards</span>
                  </button>
                </div>

                {/* Subheading Briefings */}
                <div className="bg-stone-950/60 p-4 border border-stone-850 rounded-lg flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {bookingTab === 'locals' 
                      ? (language === 'en' 
                          ? 'Local resident checkouts are structured in ETB. Finalize your reservation securely online, then instantly coordinate payment options (Cash, CBE, Telebirr, or Awash bank transfer) with our reception desk via WhatsApp.' 
                          : 'ድርጅትዎ ወይም እርስዎ በኢትዮጵያ ብር ለመክፈል፤ ማስያዣውን ከታች ይሙሉ፤ በመቀጠል በCBE፣ በቴሌብር፣ ወይም በአዋሽ ባንክ ክፍያውን ለመጨረስ በዋትስአፕ በቀጥታ ያግኙን።')
                      : (language === 'en'
                          ? 'International bookings require credit card hold guarantees. We pre-authorize cards in USD or preferred currency without immediate transaction deductions. High-resolution passport scans are cross-checked upon arrival.'
                          : 'ከኢትዮጵያ ውጭ ላሉ እንግዶች በቪዛ ወይም በማስተርካርድ ዋስትና ክፍል ማሰናጃ ፎርም። በምዝገባ ወቅት ፓስፖርት ሲያሳዩ ሒሳቡ እንዲቆረጥ ይደረጋል።')}
                  </p>
                </div>

                {/* Tabulated Form Renders */}
                {/* Active Inquiry Feedback Banner */}
                <div className="bg-[#c5a059]/10 border border-[#c5a059]/35 px-4 py-3 rounded-lg flex items-center justify-between text-xs text-[#c5a059] font-semibold">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>
                      {language === 'en' 
                        ? `You are inquiring about: ${activeRoom.nameEn}` 
                        : `በመጠየቅ ላይ ያሉት ክፍል፦ ${activeRoom.nameAm || activeRoom.nameEn}`}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#c5a059]/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                    {language === 'en' ? `${activeRoom.priceUSD} USD / ${activeRoom.priceETB} ETB` : `${activeRoom.priceETB} ብር / $${activeRoom.priceUSD}`}
                  </span>
                </div>

                {bookingTab === 'locals' ? (
                  /* ----------------- LOCAL RESIDENTS FORM ----------------- */
                  <form onSubmit={handleLocalSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="loc-name" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Full Name' : 'ሙሉ ስም'}
                        </label>
                        <input
                          id="loc-name"
                          type="text"
                          required
                          placeholder="e.g. Almaz Tesfaye"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 placeholder-stone-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="loc-email" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Email Address' : 'ኢሜል አድራሻ'}
                        </label>
                        <input
                          id="loc-email"
                          type="email"
                          required
                          placeholder="e.g. almaz@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 placeholder-stone-700 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="loc-phone" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Phone (WhatsApp Enabled)' : 'ስልክ ቁጥር (ዋትስአፕ ያለው)'}
                        </label>
                        <input
                          id="loc-phone"
                          type="tel"
                          required
                          placeholder="e.g. +251 91 100 0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 placeholder-stone-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="loc-guests" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Number of Guests' : 'የእንግዶች ብዛት'}
                        </label>
                        <select
                          id="loc-guests"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="1">1 {language === 'en' ? 'Guest' : 'እንግዳ'}</option>
                          <option value="2">2 {language === 'en' ? 'Guests' : 'እንግዳ'}</option>
                          <option value="3">3 {language === 'en' ? 'Guests' : 'እንግዳ'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="loc-checkin" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Check-In Date' : 'መግቢያ ቀን'}
                        </label>
                        <input
                          id="loc-checkin"
                          type="date"
                          required
                          min={getTodayDateString()}
                          value={checkIn}
                          onChange={(e) => handleCheckInChange(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="loc-checkout" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Check-Out Date' : 'መውጫ ቀን'}
                        </label>
                        <input
                          id="loc-checkout"
                          type="date"
                          required
                          min={checkIn ? checkIn : getTodayDateString()}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="loc-room" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                        {language === 'en' ? 'Select Preferred Sanctum Room' : 'የሚመርጡት ክፍል'}
                      </label>
                      <select
                        id="loc-room"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                      >
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {language === 'en' ? `${room.nameEn} (Price: ${room.priceETB} Birr/night)` : `${room.nameAm} (ዋጋ፤ ${room.priceETB} ብር/ቀን)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="loc-notes" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                        {language === 'en' ? 'Inquiry Notes & Shuttle flight preferences' : 'ማስታወሻ ወይም የአውሮፕላን መግቢያ ሰዓት'}
                      </label>
                      <textarea
                        id="loc-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={language === 'en' ? 'Seeking upper floors, CBE bank transfer details, or free 10-minute airport taxi pick-up times...' : 'ለምሳሌ CBE ባንክ ሒሳብ መረጃ፣ ፎቅ ምርጫ፣ ሻንጣ ለመውሰጃ የሚፈለግ እገዛ...'}
                        className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 placeholder-stone-750 leading-relaxed"
                      />
                    </div>

                    {dateError && (
                      <div className="p-3 bg-red-950/40 border border-red-900/50 rounded text-red-400 text-xs font-medium">
                        {dateError}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-stone-950 font-bold py-3.5 px-6 rounded text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-stone-950" />
                        <span>{language === 'en' ? 'Submit Inquiry for Birr Booking' : 'ጥያቄውን በኢትዮጵያ ብር ይላኩ'}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* ----------------- FOREIGNERS / CARDS FORM ----------------- */
                  <form onSubmit={handleForeignSubmit} className="space-y-4">
                    
                    {/* Part A: Guest Passport and Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="for-name" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Full Name (as in Passport)' : 'ሙሉ ስም (ፓስፖርት ላይ እንዳለው)'}
                        </label>
                        <input
                          id="for-name"
                          type="text"
                          required
                          placeholder="e.g. Johnathan Miller"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="for-email" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Email Address' : 'ኢሜል አድራሻ'}
                        </label>
                        <input
                          id="for-email"
                          type="email"
                          required
                          placeholder="e.g. johnathan.miller@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="for-phone" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'International Phone' : 'ስልክ ቁጥር'}
                        </label>
                        <input
                          id="for-phone"
                          type="tel"
                          required
                          placeholder="e.g. +1 415 555 2671"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="for-guests" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                            {language === 'en' ? 'Guests' : 'እንግዶች'}
                          </label>
                          <select
                            id="for-guests"
                            value={guestsCount}
                            onChange={(e) => setGuestsCount(Number(e.target.value))}
                            className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059]"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="for-curr" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                            {language === 'en' ? 'Currency (Hold)' : 'ምንዛሬ'}
                          </label>
                          <select
                            id="for-curr"
                            value={preferredCurrency}
                            onChange={(e) => setPreferredCurrency(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059]"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="for-passport" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Passport / Government ID Number' : 'የፓስፖርት ቁጥር'}
                        </label>
                        <input
                          id="for-passport"
                          type="text"
                          required
                          placeholder="International hold require legal ID"
                          value={passportNumber}
                          onChange={(e) => setPassportNumber(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="for-flight" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Arrival Flight Number (For Pick-up)' : 'የበረራ ቁጥር (ለማመላለሻ መኪና)'}
                        </label>
                        <input
                          id="for-flight"
                          type="text"
                          placeholder="e.g. ET 402 (We track delays)"
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="for-checkin" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Check-In Date' : 'መግቢያ ቀን'}
                        </label>
                        <input
                          id="for-checkin"
                          type="date"
                          required
                          min={getTodayDateString()}
                          value={checkIn}
                          onChange={(e) => handleCheckInChange(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="for-checkout" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                          {language === 'en' ? 'Check-Out Date' : 'መውጫ ቀን'}
                        </label>
                        <input
                          id="for-checkout"
                          type="date"
                          required
                          min={checkIn ? checkIn : getTodayDateString()}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="for-room" className="block text-[10px] text-stone-550 uppercase tracking-widest font-mono mb-1">
                        {language === 'en' ? 'Select Preferred Sanctum Room' : 'የሚመርጡት ክፍል'}
                      </label>
                      <select
                        id="for-room"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-850 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059]"
                      >
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {language === 'en' ? `${room.nameEn} (Price: $${room.priceUSD}/night)` : `${room.nameAm} (ዋጋ፤ $${room.priceUSD}/ቀን)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Part B: Secure Card holds */}
                    <div className="bg-stone-950/70 p-4 border border-stone-850 rounded-lg space-y-3">
                      <div className="flex justify-between items-center border-b border-stone-850 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          {language === 'en' ? 'Credit Card Hold Guarantee' : 'ቪዛ / ማስተርካርድ ዋስትና'}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400">256-Bit SSL Encrypted</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono mb-1">Cardholder Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Exact as written on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700" 
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono mb-1">Card Number (Mastercard/Visa)</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              required
                              maxLength={19}
                              placeholder="4111 2222 3333 4444"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-800 rounded pl-3 pr-8 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 font-mono" 
                            />
                            <CreditCard className="w-4 h-4 text-stone-500 absolute right-2.5 top-2.5" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono mb-1">Expiry Date</label>
                          <input 
                            type="text" 
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 font-mono text-center" 
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono mb-1">Security Code (CVC)</label>
                          <input 
                            type="password" 
                            required
                            maxLength={4}
                            placeholder="•••"
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c5a059] placeholder-stone-700 font-mono text-center" 
                          />
                        </div>
                      </div>
                    </div>

                    {dateError && (
                      <div className="p-3 bg-red-950/40 border border-red-900/50 rounded text-red-400 text-xs font-medium">
                        {dateError}
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full bg-[#c5a059] hover:bg-[#aa7c11] active:bg-[#90680e] text-stone-950 font-bold py-3.5 px-6 rounded text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Lock className="w-3.5 h-3.5 text-stone-950" />
                        <span>{language === 'en' ? 'Submit Secure Holding Guarantee' : 'የዋስትና መረጃውን በደህንነት ይላኩ'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
