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

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-500 text-xs w-16">{label}</span>
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-neutral-500 text-xs w-8">{value}</span>
    </div>
  );
}

function TermsDropdown({ terms }: { terms: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-neutral-500 text-xs hover:text-neutral-400 transition flex items-center gap-1"
      >
        <span>T&Cs</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="text-neutral-600 text-xs mt-2 leading-relaxed">
          {terms}
        </p>
      )}
    </div>
  );
}

function SportsbookCard({ book, badge, highlighted }: { book: Sportsbook; badge: string; highlighted: boolean }) {
  return (
    <div className={`bg-black rounded-xl overflow-visible relative mt-4 max-w-[350px] ${highlighted ? 'border-2 border-amber-400' : 'border border-neutral-800'}`}>
      {/* Badge */}
      <div className="absolute -top-3 left-4 bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500 shadow-lg z-10">
        {badge}
      </div>

      {/* Banner Image */}
      <div className="rounded-t-xl overflow-hidden">
        <img
          src={book.bannerImage}
          alt={book.name}
          className="w-full h-24 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-neutral-400 text-sm mb-4">{book.tagline}</p>

        {/* Ratings */}
        <div className="space-y-2 mb-4">
          <RatingBar label="Bonus" value={book.ratings.bonusValue} />
          <RatingBar label="Payouts" value={book.ratings.payoutSpeed} />
          <RatingBar label="Odds" value={book.ratings.oddsQuality} />
          <RatingBar label="App" value={book.ratings.appExperience} />
        </div>

        {/* CTA - Gold */}
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-center py-3 rounded-lg transition"
        >
          Check out {book.name}
        </a>

        {/* Responsible Gambling */}
        <div className="mt-3 text-center">
          <a
            href={book.responsibleGambling.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 text-xs hover:text-neutral-400 transition"
          >
            {book.responsibleGambling.text}
          </a>
        </div>

        {/* Collapsible T&Cs */}
        <TermsDropdown terms={book.termsAndConditions} />
      </div>
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
  const [isDragging, setIsDragging] = useState(false);
  const [availableBooks, setAvailableBooks] = useState<Sportsbook[]>([]);

  useEffect(() => {
    async function detectAndLoadBooks() {
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
        setAvailableBooks(available);
      } catch (error) {
        const globalBooks = sportsbooks.filter(b => b.global);
        setAvailableBooks(globalBooks);
      }
    }

    detectAndLoadBooks();
  }, []);

  const getBestOddsBook = (): Sportsbook | null => {
    if (availableBooks.length === 0) return null;
    return [...availableBooks].sort((a, b) => b.ratings.oddsQuality - a.ratings.oddsQuality)[0];
  };

  const getBestBonusBook = (): Sportsbook | null => {
    if (availableBooks.length === 0) return null;
    return [...availableBooks].sort((a, b) => b.ratings.bonusValue - a.ratings.bonusValue)[0];
  };

  const getVerdict = () => {
    const diff = userOdds - marketOdds;

    if (diff < -2) {
      return {
        tone: 'bearish' as const,
        headline: 'Boost your bet with a bonus',
      };
    } else if (diff > 2) {
      return {
        tone: 'bullish' as const,
        headline: 'The odds are in your favor',
      };
    } else {
      return {
        tone: 'neutral' as const,
        headline: 'Best bonus or best odds?',
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserOdds(parseInt(e.target.value));
    setIsDragging(true);
  };

  const handleRelease = () => {
    if (isDragging) {
      setSubmitted(true);
      setIsDragging(false);
    }
  };

  // State 1: The Question
  if (!submitted) {
    return (
      <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
            Drag and release – get a bonus
          </div>
          <div className="text-white text-lg font-bold">
            {question}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <span className="text-amber-400 font-bold text-3xl">{userOdds}%</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={userOdds}
              onChange={handleChange}
              onMouseUp={handleRelease}
              onTouchEnd={handleRelease}
              onMouseLeave={handleRelease}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-10
                [&::-webkit-slider-thumb]:h-10
                [&::-webkit-slider-thumb]:bg-amber-400
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-10
                [&::-moz-range-thumb]:h-10
                [&::-moz-range-thumb]:bg-amber-400
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border-none
                [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-4 text-neutral-400 text-xs">
            <span>No chance</span>
            <span>Coin flip</span>
            <span>It's a lock</span>
          </div>
        </div>
      </div>
    );
  }

  // State 2: The Response
  const verdict = getVerdict();
  const bestOddsBook = getBestOddsBook();
  const bestBonusBook = getBestBonusBook();

  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
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

      <div className="text-center mb-6 pb-6 border-b border-neutral-800">
        <div className="text-white font-bold text-xl">
          {verdict.headline}
        </div>
      </div>

      {/* Cards - always show both */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {bestBonusBook && (
          <SportsbookCard
            book={bestBonusBook}
            badge="BEST BONUS"
            highlighted={verdict.tone === 'bearish'}
          />
        )}
        {bestOddsBook && (
          <SportsbookCard
            book={bestOddsBook}
            badge="BEST ODDS"
            highlighted={verdict.tone === 'bullish'}
          />
        )}
      </div>

      <button
        onClick={() => setSubmitted(false)}
        className="w-full text-neutral-500 hover:text-neutral-300 text-sm mt-6 transition-colors"
      >
        &larr; Try again
      </button>
    </div>
  );
}