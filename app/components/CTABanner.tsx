'use client';
import { useState } from 'react';

interface CTABannerProps {
  logo: string;
  headline: string;
  subhead: string;
  buttonText: string;
  buttonUrl: string;
  disclaimer: string;
  termsUrl?: string;
}

export default function CTABanner({ 
  logo, 
  headline, 
  subhead, 
  buttonText, 
  buttonUrl, 
  disclaimer,
  termsUrl 
}: CTABannerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="" 
              className="h-12 sm:h-14 w-auto object-contain rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-base sm:text-lg">
              {headline}
            </div>
            <div className="text-amber-400 text-sm sm:text-base">
              {subhead}
            </div>
          </div>
        </div>
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm sm:text-base px-5 py-2.5 rounded transition-all hover:scale-105 text-center"
        >
          {buttonText}
        </a>
      </div>
      <div className="mt-3 pt-3 border-t border-neutral-800">
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <span>18+</span>
          <span>|</span>
          <span>Play responsibly</span>
          {termsUrl && (
            <>
              <span>|</span>
              <a 
                href={termsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-300 underline"
              >
                T&amp;C
              </a>
            </>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto hover:text-neutral-300 transition-colors"
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>
        {expanded && (
          <div className="mt-2 text-neutral-500 text-xs leading-relaxed">
            {disclaimer}
          </div>
        )}
      </div>
    </div>
  );
}