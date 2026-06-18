/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  // Bind Escape key event listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          {/* Close button on top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-200 hover:text-white hover:bg-stone-800/80 transition-all z-50 cursor-pointer"
            aria-label="Close image popup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Expanded photo container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-stone-900"
              referrerPolicy="no-referrer"
            />
            
            {/* Description label footer */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <p className="text-stone-300 font-sans text-sm tracking-wide font-medium">
                {imageAlt}
              </p>
              <p className="text-stone-500 text-[11px] mt-1 uppercase tracking-wider font-mono">
                East Star Experience • Press ESC to exit
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
