'use client';

import { useState } from 'react';
import { sportsbooks, filterSportsbooks, Sportsbook } from '../data/sportsbooks';

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

function SportsbookCard({ book, rank }: { book: Sportsbook; rank: number }) {
  const badge = rank === 1 ? "EDITOR'S PICK" : `#${rank} PICK`;
  const badgeColor = rank === 1 ? 'bg-black text-amber-400' : 'bg-neutral-800 text-white';

  return (
    <div className="bg-black rounded-xl border border-neutral-800 overflow-visible relative mt-4">
      {/* Badge - floating above card */}
      <div className={`absolute -top-3 left-4 ${badgeColor} text-xs font-bold px-3 py-1.5 rounded-full border border-neutral-700 shadow-lg z-10`}>
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

function SportsbookListItem({ book, rank }: { book: Sportsbook; rank: number }) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="bg-black rounded-lg border border-neutral-800 p-4">
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="text-amber-400 font-bold text-lg w-6">#{rank}</div>

        {/* Logo */}
        <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-neutral-800">
          <img
            src={book.logo}
            alt={book.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold">{book.name}</h4>
          <p className="text-neutral-500 text-sm truncate">{book.tagline}</p>
        </div>

        {/* CTA */}
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 font-bold text-sm whitespace-nowrap"
        >
          Check out →
        </a>
      </div>

      {/* Responsible Gambling + T&Cs Toggle */}
      <div className="mt-3 flex items-center justify-between">
        <a
          href={book.responsibleGambling.helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 text-xs hover:text-neutral-400 transition"
        >
          {book.responsibleGambling.text}
        </a>
        <button
          onClick={() => setShowTerms(!showTerms)}
          className="text-neutral-500 text-xs hover:text-neutral-400 transition flex items-center gap-1"
        >
          <span>T&Cs</span>
          <svg
            className={`w-3 h-3 transition-transform ${showTerms ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded T&Cs */}
      {showTerms && (
        <p className="text-neutral-600 text-xs mt-2 leading-relaxed">
          {book.termsAndConditions}
        </p>
      )}
    </div>
  );
}

interface SportsbooksSectionProps {
  country: string;
  state?: string;
}

export default function SportsbooksSection({ country, state }: SportsbooksSectionProps) {
  const filtered = filterSportsbooks(sportsbooks, country, state);
  const topThree = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No legal sportsbooks available in your location.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-6">Top Sportsbooks</h2>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topThree.map((book, index) => (
          <SportsbookCard key={book.id} book={book} rank={index + 1} />
        ))}
      </div>

      {/* More List */}
      {rest.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4">More Options</h3>
          <div className="space-y-3">
            {rest.map((book, index) => (
              <SportsbookListItem key={book.id} book={book} rank={index + 4} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}