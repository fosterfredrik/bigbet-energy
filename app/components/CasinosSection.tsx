'use client';

import { useState } from 'react';
import { casinos, filterCasinos, Casino } from '../data/casinos';

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

function CasinoCard({ casino, rank }: { casino: Casino; rank: number }) {
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
          src={casino.bannerImage}
          alt={casino.name}
          className="w-full h-24 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-neutral-400 text-sm mb-4">{casino.tagline}</p>

        {/* Ratings */}
        <div className="space-y-2 mb-4">
          <RatingBar label="Bonus" value={casino.ratings.bonusValue} />
          <RatingBar label="Payouts" value={casino.ratings.payoutSpeed} />
          <RatingBar label="Games" value={casino.ratings.gameVariety} />
          <RatingBar label="App" value={casino.ratings.appExperience} />
        </div>

        {/* CTA - Gold */}
        <a
          href={casino.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-center py-3 rounded-lg transition"
        >
          Check out {casino.name}
        </a>

        {/* Responsible Gambling */}
        <div className="mt-3 text-center">
          <a
            href={casino.responsibleGambling.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 text-xs hover:text-neutral-400 transition"
          >
            {casino.responsibleGambling.text}
          </a>
        </div>

        {/* Collapsible T&Cs */}
        <TermsDropdown terms={casino.termsAndConditions} />
      </div>
    </div>
  );
}

function CasinoListItem({ casino, rank }: { casino: Casino; rank: number }) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="bg-black rounded-lg border border-neutral-800 p-4">
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="text-amber-400 font-bold text-lg w-6">#{rank}</div>

        {/* Logo */}
        <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-neutral-800">
          <img
            src={casino.logo}
            alt={casino.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold">{casino.name}</h4>
          <p className="text-neutral-500 text-sm truncate">{casino.tagline}</p>
        </div>

        {/* CTA */}
        <a
          href={casino.url}
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
          href={casino.responsibleGambling.helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 text-xs hover:text-neutral-400 transition"
        >
          {casino.responsibleGambling.text}
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
          {casino.termsAndConditions}
        </p>
      )}
    </div>
  );
}

interface CasinosSectionProps {
  country: string;
  state?: string;
}

export default function CasinosSection({ country, state }: CasinosSectionProps) {
  const { results: filtered, isFallback } = filterCasinos(casinos, country, state);
  const topThree = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No online casinos available.</p>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-white mb-6">Online Casinos</h2>
      
      {isFallback && (
        <div className="mb-4 text-amber-400/70 text-sm">
          ⚠️ Showing international options. Availability may vary in your region.
        </div>
      )}

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topThree.map((casino, index) => (
          <CasinoCard key={casino.id} casino={casino} rank={index + 1} />
        ))}
      </div>

      {/* More List */}
      {rest.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4">More Casinos</h3>
          <div className="space-y-3">
            {rest.map((casino, index) => (
              <CasinoListItem key={casino.id} casino={casino} rank={index + 4} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
