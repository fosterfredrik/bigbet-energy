'use client';
import { useState, useEffect } from 'react';
import { sportsbooks, filterSportsbooks, Sportsbook } from '../data/sportsbooks';

type Category = 'bonusValue' | 'payoutSpeed' | 'oddsQuality' | 'appExperience';

interface PreferenceCTAProps {
  question?: string;
  options?: Category[];
}

const categoryLabels: Record<Category, { label: string; shortLabel: string; description: string; badge: string }> = {
  bonusValue: {
    label: 'Biggest bonus available right now',
    shortLabel: 'BIG BONUS',
    description: 'Highest welcome bonus and promotions',
    badge: '#1 FOR BONUS'
  },
  payoutSpeed: {
    label: 'Fastest withdrawals possible',
    shortLabel: 'FAST PAYOUTS',
    description: 'Quickest withdrawals',
    badge: '#1 FOR PAYOUTS'
  },
  oddsQuality: {
    label: 'Most competitive odds on the market',
    shortLabel: 'BEST ODDS',
    description: 'Highest odds and lowest margins',
    badge: '#1 FOR ODDS'
  },
  appExperience: {
    label: 'Highest rated sportsbook app',
    shortLabel: 'BEST APP',
    description: 'Smoothest mobile experience',
    badge: '#1 FOR APP'
  },
};

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-400 text-sm w-16">{label}</span>
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-neutral-400 text-sm w-8">{value}</span>
    </div>
  );
}

function TermsDropdown({ terms }: { terms: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-neutral-400 text-sm hover:text-neutral-300 transition flex items-center gap-1"
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
        <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
          {terms}
        </p>
      )}
    </div>
  );
}

function SportsbookCard({ book, badge }: { book: Sportsbook; badge: string }) {
  return (
    <div className="bg-black rounded-xl border-2 border-amber-400 overflow-visible relative mt-4 max-w-[350px]">
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

        <a href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-center py-3 rounded-lg transition"
        >
          Claim Bonus
        </a>

        {/* Responsible Gambling */}
        <div className="mt-3 text-center">

          <a href={book.responsibleGambling.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-sm hover:text-neutral-300 transition"
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

export default function PreferenceCTA({
  question = "What's your priority?",
  options
}: PreferenceCTAProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [availableBooks, setAvailableBooks] = useState<Sportsbook[]>([]);

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
    return [...availableBooks].sort((a, b) => b.ratings[category] - a.ratings[category])[0];
  };

  // State 1: The Question
  if (!selectedCategory) {
    return (
      <div className="bg-neutral-900 border-2 border-amber-400 rounded-lg p-6">
        {/* Header - centered */}
        <div className="text-center mb-6">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            Find Your Sportsbook
          </div>
          <div className="text-white text-lg font-bold">
            {question}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-3">
          {displayOptions.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="flex-1 bg-black border border-neutral-700 hover:border-amber-400 rounded-lg py-4 px-6 text-center transition-all hover:scale-105"
            >
              <span className="font-bold text-sm" style={{ color: '#E5B94E' }}>
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
      {/* Header - centered */}
      <div className="text-center mb-6">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          {categoryInfo.shortLabel}
        </div>
        <div className="text-white text-lg font-bold">
          {categoryInfo.description}
        </div>
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <SportsbookCard
          book={book}
          badge={categoryInfo.badge}
        />
      </div>

      {/* Reset */}
      <button
        onClick={() => setSelectedCategory(null)}
        className="w-full text-neutral-400 hover:text-neutral-300 text-sm mt-6 transition-colors"
      >
        &larr; Try again
      </button>
    </div>
  );
}