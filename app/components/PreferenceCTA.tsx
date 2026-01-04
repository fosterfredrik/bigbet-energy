'use client';
import { useState, useEffect } from 'react';
import { sportsbooks, filterSportsbooks, Sportsbook } from '../data/sportsbooks';

type Category = 'bonusValue' | 'payoutSpeed' | 'oddsQuality' | 'appExperience';

interface PreferenceCTAProps {
  question?: string;
  options?: Category[];
}

const categoryLabels: Record<Category, { label: string; shortLabel: string; description: string }> = {
  bonusValue: {
    label: 'Biggest bonus available right now',
    shortLabel: 'BIGGEST BONUS',
    description: 'Highest welcome bonus and promotions'
  },
  payoutSpeed: {
    label: 'Fastest withdrawals possible',
    shortLabel: 'FASTEST PAYOUT',
    description: 'Quickest withdrawals'
  },
  oddsQuality: {
    label: 'Most competitive odds on the market',
    shortLabel: 'BEST ODDS',
    description: 'Highest odds and lowest margins'
  },
  appExperience: {
    label: 'Highest rated sportsbook app',
    shortLabel: 'BEST APP',
    description: 'Smoothest mobile experience'
  },
};

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

export default function PreferenceCTA({
  question = "What's your priority?",
  options
}: PreferenceCTAProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [availableBooks, setAvailableBooks] = useState<Sportsbook[]>([]);
  const [expanded, setExpanded] = useState(false);

  const displayOptions: Category[] = options || ['bonusValue', 'payoutSpeed', 'oddsQuality', 'appExperience'];

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

  const getBestBook = (category: Category): Sportsbook | null => {
    if (availableBooks.length === 0) return null;

    return [...availableBooks].sort((a, b) =>
      b.ratings[category] - a.ratings[category]
    )[0];
  };

  // State 1: The Question
if (!selectedCategory) {
  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
      {/* Header - centered */}
      <div className="text-center mb-6">
        <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
          Find Your Sportsbook
        </div>
        <div className="text-white text-lg font-bold">
          {question}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col sm:flex-row gap-3">
        {displayOptions.map((category, index) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex-1 rounded-lg py-4 px-6 text-center transition-all hover:scale-105 ${
              index === 0 
                ? 'bg-amber-400 hover:bg-amber-300 text-black' 
                : 'bg-black hover:bg-neutral-800 border border-neutral-700 text-amber-400'
            }`}
          >
            <span className="font-bold text-sm">
              {categoryLabels[category].shortLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

  // State 2: The Result
  const book = getBestBook(selectedCategory);
  const categoryInfo = categoryLabels[selectedCategory];

  if (!book) {
    return (
      <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6 text-center">
        <div className="text-neutral-400">No sportsbooks available in your region</div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-amber-400 hover:text-amber-300 text-sm mt-4"
        >
          &larr; Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
      {/* Result Header */}
      <div className="mb-6 pb-6 border-b border-neutral-800">
        <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
          {categoryInfo.shortLabel}
        </div>
        <div className="text-white font-bold text-lg">
          {categoryInfo.description}
        </div>
      </div>

      {/* Winner */}
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
              <RatingBar value={book.ratings[selectedCategory]} />
            </div>
          </div>
        </div>

        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm sm:text-base px-5 py-2.5 rounded transition-all hover:scale-105 text-center"
        >
          Claim Bonus →
        </a>
      </div>

      {/* Footer */}
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

      {/* Reset */}
      <button
        onClick={() => setSelectedCategory(null)}
        className="w-full text-neutral-500 hover:text-neutral-300 text-sm mt-4 transition-colors"
      >
        &larr; Choose again
      </button>
    </div>
  );
}