'use client';

import { usStates, countries } from '../data/sportsbooks';

interface LocationPickerProps {
  country: string;
  state: string;
  loading: boolean;
  onCountryChange: (country: string) => void;
  onStateChange: (state: string) => void;
}

export default function LocationPicker({
  country,
  state,
  loading,
  onCountryChange,
  onStateChange,
}: LocationPickerProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 mb-8 text-sm">
        <span className="text-neutral-400">📍 Detecting location...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-sm">
      <span className="text-neutral-400">📍 Showing offers for</span>
      <div className="flex gap-2">
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="bg-neutral-800 text-white border border-neutral-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        {country === 'US' && (
          <select
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            className="bg-neutral-800 text-white border border-neutral-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {usStates.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
