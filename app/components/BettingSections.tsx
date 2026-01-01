'use client';
import { useState, useEffect } from 'react';
import LocationPicker from './LocationPicker';
import SportsbooksSection from './SportsbooksSection';
import CasinosSection from './CasinosSection';
import { sportsbooks, filterSportsbooks } from '../data/sportsbooks';

export default function BettingSections() {
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('NJ');
  const [loading, setLoading] = useState(true);
  const [isGlobalFallback, setIsGlobalFallback] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem('bbe-location');
    if (stored) {
      const { country, state } = JSON.parse(stored);
      setCountry(country);
      setState(state || '');
      setIsGlobalFallback(country === 'Global');
      setLoading(false);
      return;
    }

    // Auto-detect via IP
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const detectedCountry = data.country_code || 'US';
        const detectedState = data.region_code || '';
        
        // Map GB to UK
        const countryCode = detectedCountry === 'GB' ? 'UK' : detectedCountry;
        
        // Check if any books available for this location
        const { results } = filterSportsbooks(sportsbooks, countryCode, detectedState);
        
        if (results.length === 0 || (results.length > 0 && results.every(b => b.global))) {
          // No local books, use Global
          setCountry('Global');
          setState('');
          setIsGlobalFallback(true);
          localStorage.setItem('bbe-location', JSON.stringify({ country: 'Global', state: '' }));
        } else {
          setCountry(countryCode);
          if (countryCode === 'US') {
            setState(detectedState);
          }
          setIsGlobalFallback(false);
          localStorage.setItem('bbe-location', JSON.stringify({
            country: countryCode,
            state: countryCode === 'US' ? detectedState : '',
          }));
        }
        
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const newState = newCountry === 'US' ? 'NJ' : '';
    setState(newState);
    setIsGlobalFallback(newCountry === 'Global');
    localStorage.setItem('bbe-location', JSON.stringify({ country: newCountry, state: newState }));
  };

  const handleStateChange = (newState: string) => {
    setState(newState);
    localStorage.setItem('bbe-location', JSON.stringify({ country, state: newState }));
  };

  return (
    <section className="bg-neutral-900 py-12 px-4">
      <div className="max-w-[1104px] mx-auto">
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          Where to play right now
        </h2>

        <LocationPicker
          country={country}
          state={state}
          loading={loading}
          onCountryChange={handleCountryChange}
          onStateChange={handleStateChange}
        />

        {isGlobalFallback && (
          <p className="text-amber-400/70 text-xs text-center mt-2">
            Showing international options. Availability may vary in your region.
          </p>
        )}

        <SportsbooksSection country={country} state={state} />
        <CasinosSection country={country} state={state} />

        <p className="text-neutral-600 text-xs mt-8 text-center">
          21+ | Gambling problem? Call 1-800-GAMBLER
        </p>
      </div>
    </section>
  );
}
