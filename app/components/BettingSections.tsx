'use client';

import { useState, useEffect } from 'react';
import LocationPicker from './LocationPicker';
import SportsbooksSection from './SportsbooksSection';
import CasinosSection from './CasinosSection';

export default function BettingSections() {
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('NJ');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem('bbe-location');
    if (stored) {
      const { country, state } = JSON.parse(stored);
      setCountry(country);
      setState(state || 'NJ');
      setLoading(false);
      return;
    }

    // Auto-detect via IP
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const detectedCountry = data.country_code || 'US';
        const detectedState = data.region_code || 'NJ';
        
        // Map GB to UK
        const countryCode = detectedCountry === 'GB' ? 'UK' : detectedCountry;
        
        setCountry(countryCode);
        if (countryCode === 'US') {
          setState(detectedState);
        }
        setLoading(false);

        // Save to localStorage
        localStorage.setItem('bbe-location', JSON.stringify({
          country: countryCode,
          state: countryCode === 'US' ? detectedState : '',
        }));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const newState = newCountry === 'US' ? 'NJ' : '';
    setState(newState);
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
          Our favorite betting sites right now
        </h2>
        
        <LocationPicker
          country={country}
          state={state}
          loading={loading}
          onCountryChange={handleCountryChange}
          onStateChange={handleStateChange}
        />

        <SportsbooksSection country={country} state={state} />
        
        <CasinosSection country={country} state={state} />

        <p className="text-neutral-600 text-xs mt-8 text-center">
          21+ | Gambling problem? Call 1-800-GAMBLER
        </p>
      </div>
    </section>
  );
}
