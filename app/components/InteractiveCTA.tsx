'use client';
import { useState, useEffect } from 'react';
import { sportsbooks, filterSportsbooks, Sportsbook } from '../data/sportsbooks';

interface Alternative {
  name: string;
  odds: number;
}

interface InteractiveCTAProps {
  question: string;
  marketOdds: number;
  candidate: string;
  alternatives: Alternative[];
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

export default function InteractiveCTA({ 
  question, 
  marketOdds, 
  candidate,
  alternatives 
}: InteractiveCTAProps) {
  const [userOdds, setUserOdds] = useState(marketOdds);
  const [submitted, setSubmitted] = useState(false);
  const [book, setBook] = useState<Sportsbook | null>(null);
  const [expanded, setExpanded] = useState(false);

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

        const { results: available } = filterSportsbooks(sportsbooks, country, state);

        if (available.length > 0) {
          const ranked = available.sort((a, b) => {
            const avgA = (a.ratings.bonusValue + a.ratings.payoutSpeed + a.ratings.oddsQuality + a.ratings.appExperience) / 4;
            const avgB = (b.ratings.bonusValue + b.ratings.payoutSpeed + b.ratings.oddsQuality + b.ratings.appExperience) / 4;
            return avgB - avgA;
          });
          setBook(ranked[0]);
        }
      } catch (error) {
        const globalBook = sportsbooks.find(b => b.global);
        if (globalBook) setBook(globalBook);
      }
    }

    detectAndSelectBook();
  }, []);

  const getVerdict = () => {
    const diff = userOdds - marketOdds;
    const multiplier = Math.round(100 / marketOdds);
    
    if (diff < -2) {
      const topAlt = alternatives[0];
      return {
        tone: 'bearish',
        headline: `You're more bearish than the market.`,
        subhead: `If not ${candidate}, then who? ${topAlt.name} leads at ${topAlt.odds}%.`,
        buttonText: `Bet on ${topAlt.name}`,
      };
    } else if (diff > 2) {
      return {
        tone: 'bullish',
        headline: `You see something the market doesn't.`,
        subhead: `${candidate} at ${multiplier}x could be your edge.`,
        buttonText: `Bet on ${candidate}`,
      };
    } else {
      return {
        tone: 'neutral',
        headline: `You agree with the market.`,
        subhead: `No edge here. The value might be elsewhere.`,
        buttonText: `Explore markets`,
      };
    }
  };

  const avgRating = book ? Math.round(
    (book.ratings.bonusValue + book.ratings.payoutSpeed + book.ratings.oddsQuality + book.ratings.appExperience) / 4
  ) : 0;

  /// State 1: The Question
if (!submitted) {
  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
      <div className="text-white font-bold text-xl sm:text-2xl mb-6">
        {question}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-neutral-400 text-sm">Your view</span>
          <span className="text-amber-400 font-bold text-2xl">{userOdds}%</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={userOdds}
            onChange={(e) => setUserOdds(parseInt(e.target.value))}
            onMouseUp={() => setSubmitted(true)}
            onTouchEnd={() => setSubmitted(true)}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          
          <div 
            className="absolute top-6 flex flex-col items-center"
            style={{ left: `${marketOdds}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-neutral-500"></div>
            <span className="text-neutral-500 text-xs mt-1">Market: {marketOdds}%</span>
          </div>
        </div>

        <div className="flex justify-between mt-8 text-neutral-600 text-xs">
          <span>0%</span>
          <span>No chance</span>
          <span>Coin flip</span>
          <span>Likely</span>
          <span>100%</span>
        </div>
      </div>

      <div className="text-neutral-500 text-sm text-center">
        Drag and release to lock in your view
      </div>
    </div>
  );
}
  // State 2: The Response
  const verdict = getVerdict();

  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
      {/* Comparison */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-neutral-400 text-xs uppercase tracking-wide mb-1">You</div>
          <div className="text-white font-bold text-4xl">{userOdds}%</div>
        </div>
        <div className="text-neutral-600 text-2xl self-center">vs</div>
        <div className="text-center">
          <div className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Market</div>
          <div className="text-amber-400 font-bold text-4xl">{marketOdds}%</div>
        </div>
      </div>

      {/* Verdict */}
      <div className="text-center mb-6 pb-6 border-b border-neutral-800">
        <div className="text-white font-bold text-xl mb-2">
          {verdict.headline}
        </div>
        <div className="text-neutral-400 text-sm">
          {verdict.subhead}
        </div>
      </div>

      {/* Sportsbook CTA */}
      {book && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
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
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm sm:text-base px-5 py-2.5 rounded transition-all hover:scale-105 text-center"
            >
              {verdict.buttonText} →
            </a>
          </div>

          <div className="pt-3 border-t border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <span>18+</span>
              <span>|</span>
              <span>Play responsibly</span>
              <span>|</span>
              <a 
                href={book.responsibleGambling.helpUrl}
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
            {expanded && (
              <div className="mt-2 text-neutral-500 text-xs leading-relaxed">
                {book.termsAndConditions}
              </div>
            )}
          </div>
        </>
      )}

      {/* Reset */}
      <button
        onClick={() => setSubmitted(false)}
        className="w-full text-neutral-500 hover:text-neutral-300 text-sm mt-4 transition-colors"
      >
        ← Try again
      </button>
    </div>
  );
}