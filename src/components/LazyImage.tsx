/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = 'w-full h-full',
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Graceful fallback for non-browser environments or unsupported browsers
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '120px 0px', // Start loading 120px before entering viewport for a seamless transition
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      {/* Classic elegant loader skeleton matching the Luxury Hotel brand */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-900/90 flex items-center justify-center animate-pulse z-10 border border-stone-850">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#c5a059]/30">
            East Star
          </span>
        </div>
      )}
      
      {/* Actual image rendered once in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 pointer-events-auto' 
              : 'opacity-0 scale-102 pointer-events-none'
          }`}
          style={style}
          {...props}
        />
      )}
    </div>
  );
};
