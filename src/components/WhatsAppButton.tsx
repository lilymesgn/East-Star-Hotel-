/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouting } from '../context/RoutingContext';
import { MessageSquare, MessageCircle, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppButton: React.FC = () => {
  const { language, hotelInfo } = useRouting();
  const [isOpen, setIsOpen] = useState(false);

  // Clean raw phone number for WhatsApp URL
  const rawPhone = '251967222224';

  const defaultMessageEn = "Hello East Star Hotel, I would like to make a booking inquiry for a room.";
  const defaultMessageAm = "ሰላም ኢስት ስታር ሆቴል፣ ክፍል ለመያዝ ጠይቄ ነበር።";

  const message = language === 'en' ? defaultMessageEn : defaultMessageAm;
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end">
      {/* Floating Chat Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="mb-3 w-80 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl overflow-hidden"
          >
            {/* Widget Header */}
            <div className="bg-emerald-600 p-4 text-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-stone-950/20 flex items-center justify-center font-serif text-lg font-bold text-amber-400">
                  ES
                </div>
                <div>
                  <h4 className="font-semibold text-sm">East Star Hotel</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {language === 'en' ? 'Online Response' : 'ኦንላይን ምላሽ'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white hover:bg-emerald-700/50 p-1.5 rounded-full transition-colors"
                aria-label="Close Whatsapp chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Widget Body */}
            <div className="p-4 bg-stone-950 text-xs text-stone-400">
              <div className="bg-stone-900 rounded-lg p-3 border border-stone-800/80 max-w-[90%] mb-4">
                <p className="text-stone-300 leading-relaxed">
                  {language === 'en' 
                    ? 'Welcome to East Star! Send us a message on WhatsApp. We can help you book rooms, check availability, or arrange your free airport shuttle.'
                    : 'እንኳን በደህና መጡ! ዋትስአፕ ላይ ያግኙን። ክፍሎችን ለመያዝ፣ ዝግጁነት ለመፈተሽ ወይም የአውሮፕላን ማረፊያ ማመላለሻዎን ለማዘጋጀት እንረዳዎታለን።'}
                </p>
                <span className="block text-[10px] text-stone-500 mt-1 text-right font-mono">09:22 AM</span>
              </div>

              {/* Direct Link Anchor Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-md group"
              >
                <MessageSquare className="w-4.5 h-4.5 text-stone-950" />
                <span>{language === 'en' ? 'Open WhatsApp Chat' : 'ዋትስአፕ ክፈት'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating trigger button */}
      <div className="relative">
        {/* Highlight notification badge count if chat is closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 z-50 w-3 h-3 bg-red-500 rounded-full border border-stone-950 animate-bounce"></span>
        )}
        
        {/* Constant ambient pulse ring behind the button */}
        <span className="absolute inset-0 z-0 rounded-full bg-emerald-500/20 animate-ping duration-1600"></span>

        <button
          id="whatsapp-floating-button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 flex items-center justify-center shadow-xl hover:shadow-emerald-500/10 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label={language === 'en' ? 'Inquire via WhatsApp' : 'በዋትስአፕ ይጠይቁ'}
        >
          <MessageCircle className="w-7 h-7 stroke-[2.25]" />
        </button>
      </div>
    </div>
  );
};
