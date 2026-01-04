'use client';
import { useState, useEffect } from 'react';
import { sportsbooks, filterSportsbooks, Sportsbook } from '../data/sportsbooks';

interface SmartCTAProps {
  headline?: string;
  subhead?: string;
  buttonText?: string;
  buttonUrl?: string;
  disclaimer?: string;
  termsUrl?: string;
  overrideBookId?: string;
  size?: 'small' | 'large';
}

function RatingBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-amber-400 font-bold text-sm">{value}</span>
    </div>
  );
}

export default function SmartCTA({ 
  headline,
  subhead,
  buttonText = 'See live odds',
  buttonUrl,
  disclaimer = 'Gambling can be addictive. Please play responsibly.',
  termsUrl,
  overrideBookId,
  size = 'large'
}: SmartCTAProps) {
  const [book, setBook] = useState<Sportsbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    async function detectAndSelectBook() {
      try {
        const saved = localStorage.getItem('bbe-location');
        let country = 'US';
        let state = 'NJ';

        if (saved) {
          const parsed = JSON.parse(saved);
          country = parsed.country || 'US';
          state = parsed.state || '';
        } else {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          country = data.country_code || 'US';
          state = data.region_code || '';
          localStorage.setItem('bbe-location', JSON.stringify({ country, state }));
        }

        if (overrideBookId) {
          const overrideBook = sportsbooks.find(b => b.id === overrideBookId);
          if (overrideBook) {
            setBook(overrideBook);
            setLoading(false);
            return;
          }
        }

        const { results: available, isFallback: fallback } = filterSportsbooks(sportsbooks, country, state);
        setIsFallback(fallback);

        if (available.length === 0) {
          setLoading(false);
          return;
        }

        const ranked = available.sort((a, b) => {
          const avgA = (a.ratings.bonusValue + a.ratings.payoutSpeed + a.ratings.oddsQuality + a.ratings.appExperience) / 4;
          const avgB = (b.ratings.bonusValue + b.ratings.payoutSpeed + b.ratings.oddsQuality + b.ratings.appExperience) / 4;
          return avgB - avgA;
        });

        setBook(ranked[0]);
      } catch (error) {
        const globalBook = sportsbooks.find(b => b.global);
        if (globalBook) {
          setBook(globalBook);
          setIsFallback(true);
        }
      }
      setLoading(false);
    }

    detectAndSelectBook();
  }, [overrideBookId]);

  if (loading) {
    return (
      <div className="bg-neutral-900 border-2 border-neutral-700 rounded-lg p-5 animate-pulse">
        <div className="h-12 bg-neutral-800 rounded w-1/3"></div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  const avgRating = Math.round(
    (book.ratings.bonusValue + book.ratings.payoutSpeed + book.ratings.oddsQuality + book.ratings.appExperience) / 4
  );

  const finalButtonUrl = buttonUrl || book.url;
  const finalTermsUrl = termsUrl || book.responsibleGambling.helpUrl;

  if (size === 'large') {
    return (
      <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-5">
        {headline && (
          <div className="mb-4 pb-4 border-b border-neutral-800">
            <div className="text-white font-bold text-xl sm:text-2xl">
              {headline}
            </div>
            {subhead && (
              <div className="text-neutral-400 text-sm mt-1">
                {subhead}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <img 
                src={book.bannerImage} 
                alt={book.name}
                className="h-12 sm:h-14 w-auto object-contain rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-xs">Rating:</span>
                <RatingBar value={avgRating} />
              </div>
            </div>
          </div>
          
          <a
            href={finalButtonUrl}
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
            <span>{disclaimer}</span>
            <span>|</span>
            <a 
              href={finalTermsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-300 underline"
            >
              T&amp;C
            </a>
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-auto hover:text-neutral-300 transition-colors"
            >
              {expanded ? '▲' : '▼'}
            </button>
          </div>
          {isFallback && (
            <div className="mt-2 text-amber-400/70 text-xs">
              ⚠️ Availability may vary in your region
            </div>
          )}
          {expanded && (
            <div className="mt-2 text-neutral-500 text-xs leading-relaxed">
              {book.termsAndConditions}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-4">
      {headline && (
        <div className="mb-3 pb-3 border-b border-neutral-800">
          <div className="text-white font-bold text-base sm:text-lg">
            {headline}
          </div>
          {subhead && (
            <div className="text-neutral-400 text-xs mt-1">
              {subhead}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <img 
              src={book.bannerImage} 
              alt={book.name}
              className="h-10 sm:h-12 w-auto object-contain rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-xs">Rating:</span>
              <RatingBar value={avgRating} />
            </div>
          </div>
        </div>
        
        <a
          href={finalButtonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-4 py-2 rounded transition-all hover:scale-105 text-center"
        >
          {buttonText}
        </a>
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-800">
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <span>18+</span>
          <span>|</span>
          <span>{disclaimer}</span>
          <span>|</span>
          <a 
            href={finalTermsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-neutral-300 underline"
          >
            T&amp;C
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto hover:text-neutral-300 transition-colors"
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>
        {isFallback && (
          <div className="mt-2 text-amber-400/70 text-xs">
            ⚠️ Availability may vary in your region
          </div>
        )}
        {expanded && (
          <div className="mt-2 text-neutral-500 text-xs leading-relaxed">
            {book.termsAndConditions}
          </div>
        )}
      </div>
    </div>
  );
}