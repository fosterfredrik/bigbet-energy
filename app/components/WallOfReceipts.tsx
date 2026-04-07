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

interface SerpHealth {
  totalAnalyzed: number;
  licensedOperators: number;
  legitAffiliates: number;
  seoGrabs: number;
  shadyAffiliates: number;
  unlicensed: number;
  irrelevant: number;
  usefulResults: number;
  healthScore: number;
  healthLabel: string;
}

const WOR_LABELS: Record<string, {
  licensedOperator: string;
  licensedGame: string;
  legitAffiliate: string;
  seoGrab: string;
  shadyAffiliate: string;
  unlicensed: string;
  irrelevant: string;
  authority: string;
  site: string;
  status: string;
  comment: string;
  serpIntro: string;
  showMore: (n: number) => string;
  showLess: string;
}> = {
  sv: {
    licensedOperator: 'Licensierad operatör',
    licensedGame: 'Licensierad casinosajt',
    legitAffiliate: 'Seriös affiliate',
    seoGrab: 'SEO-grab',
    shadyAffiliate: 'Tveksam affiliate',
    unlicensed: 'Ej licensierad',
    irrelevant: 'Irrelevant',
    authority: 'Myndighet',
    site: 'Sajt',
    status: 'Status',
    comment: 'Kommentar',
    serpIntro: (count: number) => `Komplett genomgång av alla ${count} URL:er. Här ser du vad varje sajt påstår sig vara — och vad vi faktiskt hittade.`,
    showMore: (n: number) => `Visa ${n} till ▼`,
    showLess: 'Visa färre ▲',
  },
  pt: {
    licensedOperator: 'Operador licenciado',
    licensedGame: 'Cassino licenciado',
    legitAffiliate: 'Afiliado legítimo',
    seoGrab: 'Captura SEO',
    shadyAffiliate: 'Afiliado suspeito',
    unlicensed: 'Não licenciado',
    irrelevant: 'Irrelevante',
    authority: 'Autoridade',
    site: 'Site',
    status: 'Status',
    comment: 'Comentário',
    serpIntro: (count: number) => `Análise completa de todas as ${count} URLs. Veja o que cada site afirma ser — e o que realmente encontramos.`,
    showMore: (n: number) => `Ver mais ${n} ▼`,
    showLess: 'Ver menos ▲',
  },
  en: {
    licensedOperator: 'Licensed operator',
    licensedGame: 'Licensed casino',
    legitAffiliate: 'Legit affiliate',
    seoGrab: 'SEO grab',
    shadyAffiliate: 'Shady affiliate',
    unlicensed: 'Unlicensed',
    irrelevant: 'Irrelevant',
    authority: 'Authority',
    site: 'Site',
    status: 'Status',
    comment: 'Comment',
    serpIntro: (count: number) => `Complete review of all ${count} URLs. See what each site claims to be — and what we actually found.`,
    showMore: (n: number) => `Show ${n} more ▼`,
    showLess: 'Show less ▲',
  },
};

export default function WallOfReceipts({ results, type, serpHealth, locale = 'sv' }: {
  results: SerpResult[];
  type?: string;
  serpHealth?: SerpHealth;
  locale?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? results : results.slice(0, 10);
  const remaining = results.length - 10;
  const L = WOR_LABELS[locale] || WOR_LABELS['sv'];

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

      {serpHealth && (
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 mb-6 flex items-center gap-6">
          <div className="text-center flex-shrink-0">
            <div className="text-5xl font-bold text-amber-400">
              {serpHealth.healthScore}%
            </div>
            <div className="text-sm text-neutral-500 mt-1">SERP Health</div>
          </div>
          <div className="border-l border-neutral-700 pl-6 flex-grow">
            <p className="text-white font-semibold mb-1">{serpHealth.healthLabel}</p>
            <p className="text-neutral-400 text-base">{L.serpIntro(results.length)}</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-400">
        <span><span className="text-blue-400">✓</span> {type === 'game' ? L.licensedGame : L.licensedOperator}</span>
        <span><span className="text-green-400">✓</span> {L.legitAffiliate}</span>
        <span><span className="text-amber-400">⚠</span> {L.seoGrab}</span>
        <span><span className="text-orange-400">⚠</span> {L.shadyAffiliate}</span>
        <span><span className="text-red-400">✗</span> {L.unlicensed}</span>
        <span><span className="text-neutral-500">—</span> {L.irrelevant}</span>
        <span><span className="text-neutral-400">⊕</span> {L.authority}</span>
      </div>

      <div className="overflow-x-auto bg-neutral-800 border border-neutral-700 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 border-b border-neutral-700">
            <tr>
              <th className="text-left p-3 font-semibold text-neutral-300">G#</th>
              <th className="text-left p-3 font-semibold text-neutral-300">{L.site}</th>
              <th className="text-center p-3 font-semibold text-neutral-300 w-24">{L.status}</th>
              <th className="text-left p-3 font-semibold text-neutral-300">{L.comment}</th>
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
                  {item.verdict === 'authority' && <span className="text-neutral-400 text-lg">⊕</span>}
                </td>
                <td className="p-3 text-neutral-400 text-xs">{item.commentary}</td>
              </tr>
            ))}
          </tbody>
          {remaining > 0 && (
            <tfoot>
              <tr>
                <td colSpan={4} className="p-0">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white font-medium py-3 text-sm transition-colors border-t border-neutral-700"
                  >
                    {showAll ? L.showLess : L.showMore(remaining)}
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