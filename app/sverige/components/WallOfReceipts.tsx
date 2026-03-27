'use client';

import { useState } from 'react';

interface SerpResult {
  googleRank: number;
  ourRank: number | null;
  domain: string;
  name: string;
  verdict: string;
  verdictLabel: string;
  commentary: string;
  licensed?: boolean | null;
}

export default function WallOfReceipts({ results, type }: { results: SerpResult[], type?: string }) {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? results : results.slice(0, 10);
  const remaining = results.length - 10;

  return (
    <section
      className="mb-12"
      data-section="fact-check"
      data-cite-id="wall-of-receipts"
      data-cite-type="evidence-table"
      data-products-verified={results.length}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Wall of Receipts
      </h2>

      <div className="bg-neutral-800 px-6 py-5 rounded-lg border border-neutral-700 mb-6">
        <p className="text-base font-normal leading-relaxed text-neutral-300">
          <strong className="text-white">Fullständig analys:</strong> Komplett genomgång av alla {results.length} URL:er från top 100 för detta sökord. Här ser du vad varje sajt påstår sig vara — och vad vi faktiskt hittade.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-xs text-neutral-400">
        <span><span className="text-blue-400">✓</span> {type === 'game' ? 'Licensierad casinosajt' : 'Licensierad operatör'}</span>
        <span><span className="text-green-400">✓</span> Seriös affiliate</span>
        <span><span className="text-amber-400">⚠</span> SEO-grab</span>
        <span><span className="text-orange-400">⚠</span> Tveksam affiliate</span>
        <span><span className="text-red-400">✗</span> Ej licensierad</span>
        <span><span className="text-neutral-500">—</span> Irrelevant</span>
      </div>

      <div className="overflow-x-auto bg-neutral-800 border border-neutral-700 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 border-b border-neutral-700">
            <tr>
              <th className="text-left p-3 font-semibold text-neutral-300">G#</th>
              <th className="text-left p-3 font-semibold text-neutral-300">Sajt</th>
              <th className="text-center p-3 font-semibold text-neutral-300 w-24">Status</th>
              <th className="text-left p-3 font-semibold text-neutral-300">Kommentar</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item, idx) => (
              <tr key={idx} className="border-b border-neutral-700 hover:bg-neutral-700/50">
                <td className="p-3 text-neutral-500 font-mono text-xs">{item.googleRank}</td>
                <td className="p-3 font-medium text-white">
                  {item.name}
                  <div className="text-xs text-neutral-500 mt-1">{item.domain}</div>
                </td>
                <td className="p-3 text-center">
                  {item.verdict === 'licensed-operator' && <span className="text-blue-400 text-lg">✓</span>}
                  {item.verdict === 'legit-affiliate' && <span className="text-green-400 text-lg">✓</span>}
                  {item.verdict === 'seo-grab' && <span className="text-amber-400 text-lg">⚠</span>}
                  {item.verdict === 'shady-affiliate' && <span className="text-orange-400 text-lg">⚠</span>}
                  {item.verdict === 'unlicensed' && <span className="text-red-400 text-lg">✗</span>}
                  {item.verdict === 'irrelevant' && <span className="text-neutral-500 text-lg">—</span>}
                </td>
                <td className="p-3 text-neutral-400 text-xs">{item.commentary}</td>
              </tr>
            ))}
          </tbody>

          {remaining > 0 && (
            <tfoot>
              <tr>
                <td colSpan={5} className="p-0">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white font-medium py-3 text-sm transition-colors border-t border-neutral-700"
                  >
                    {showAll ? 'Visa färre ▲' : `Visa ${remaining} till ▼`}
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </section>
  );
}