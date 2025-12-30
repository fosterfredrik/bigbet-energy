'use client';

import { casinos, filterCasinos, Casino } from '../data/casinos';

interface CasinosSectionProps {
  country: string;
  state: string;
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-500 text-xs w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function CasinosSection({ country, state }: CasinosSectionProps) {
  const filteredCasinos = filterCasinos(casinos, country, state);
  const topPicks = filteredCasinos.slice(0, 3);
  const moreCasinos = filteredCasinos.slice(3);

  if (filteredCasinos.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-white text-xl font-bold mb-4">Online Casinos</h2>
        <div className="text-center py-8 bg-black rounded-xl border border-neutral-800">
          <p className="text-neutral-400">No legal online casinos available in your area yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-white text-xl font-bold mb-6">Online Casinos</h2>

      {/* Premium Cards */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {topPicks.map((casino, index) => (
          <div key={casino.id} className="relative flex-1 max-w-[340px] w-full">
            <span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-xs font-bold px-3 py-1 rounded whitespace-nowrap ${
                index === 0
                  ? 'bg-amber-400 text-black'
                  : 'bg-neutral-800 text-white'
              }`}
            >
              {index === 0 ? "EDITOR'S PICK" : `#${index + 1} PICK`}
            </span>

            <div
              className={`bg-black rounded-xl overflow-hidden h-full flex flex-col transition-all ${
                index === 0
                  ? 'border-2 border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]'
                  : 'border border-neutral-700 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]'
              }`}
            >
              <img
                src={casino.stripImage}
                alt={casino.name}
                className="w-full h-16 object-cover"
              />

              <div className="p-5 flex flex-col flex-1">
                <p className="text-neutral-400 text-sm text-center mb-4">{casino.tagline}</p>

                {/* Rating Bars */}
                <div className="space-y-2 mb-4">
                  <RatingBar label="Bonus" value={casino.ratings.bonusValue} />
                  <RatingBar label="Payouts" value={casino.ratings.withdrawalSpeed} />
                  <RatingBar label="Games" value={casino.ratings.gameVariety} />
                  <RatingBar label="App" value={casino.ratings.appExperience} />
                </div>

                <div className="mt-auto pt-2 flex flex-col items-center gap-3">
                  <a
                    href={casino.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 text-center"
                  >
                    Check out {casino.name}
                  </a>

                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <span>21+</span>
                    <span>|</span>
                    <span>Gamble responsibly</span>
                    <span>|</span>
                    <button className="underline hover:text-neutral-300">
                      T&amp;C
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Casinos List */}
      {moreCasinos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-neutral-500 font-bold text-xs tracking-wider mb-4">
            MORE CASINOS
          </h3>

          <div className="bg-black rounded-xl border border-neutral-800 divide-y divide-neutral-800">
            {moreCasinos.map((casino, index) => (
              <div
                key={casino.id}
                className="flex items-center gap-4 p-4 hover:bg-neutral-900 transition-colors"
              >
                <span className="text-neutral-600 font-bold w-6 text-sm">
                  {index + 4}
                </span>
                <img
                  src={casino.logo}
                  alt={casino.name}
                  className="h-8 w-20 object-contain"
                />
                <span className="text-white font-medium">{casino.name}</span>
                <span className="text-neutral-400 text-sm flex-1 hidden sm:block">
                  {casino.tagline}
                </span>
                <a
                  href={casino.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-bold text-sm transition-colors"
                >
                  Check out
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
