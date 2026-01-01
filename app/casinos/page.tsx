'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import LocationPicker from '../components/LocationPicker';
import CasinosSection from '../components/CasinosSection';
import { sportsbooks, filterSportsbooks } from '../data/sportsbooks';

export default function CasinosPage() {
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('NJ');
  const [loading, setLoading] = useState(true);
  const [isGlobalFallback, setIsGlobalFallback] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bbe-location');
    if (stored) {
      const { country, state } = JSON.parse(stored);
      setCountry(country);
      setState(state || '');
      setIsGlobalFallback(country === 'Global');
      setLoading(false);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const detectedCountry = data.country_code || 'US';
        const detectedState = data.region_code || '';
        const countryCode = detectedCountry === 'GB' ? 'UK' : detectedCountry;
        
        const { results } = filterSportsbooks(sportsbooks, countryCode, detectedState);
        
        if (results.length === 0 || (results.length > 0 && results.every(b => b.global))) {
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
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Casinos' }
          ]}
        />
      </div>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-[1104px] mx-auto">
          
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Best Online Casinos
            </h1>
            <p className="text-neutral-400">
              Rated by bonus value, payout speed, game variety, and app experience.
            </p>
          </div>

          {/* Location Picker */}
          <LocationPicker
            country={country}
            state={state}
            loading={loading}
            onCountryChange={handleCountryChange}
            onStateChange={handleStateChange}
          />

          {isGlobalFallback && (
            <p className="text-amber-400/70 text-xs text-center mb-6">
              Showing international options. Availability may vary in your region.
            </p>
          )}

          {/* Casinos List */}
          <CasinosSection country={country} state={state} />

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 text-sm mb-4">
              Want to know how we evaluate casinos?
            </p>
            <Link 
              href="/methodology" 
              className="text-amber-400 hover:text-amber-300 font-bold text-sm transition"
            >
              Read our methodology →
            </Link>
          </div>

          <p className="text-neutral-600 text-xs mt-8 text-center">
            21+ | Gambling problem? Call 1-800-GAMBLER
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
