import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const GUIDES = [
  {
    category: 'Casino',
    items: [
      { slug: 'online-casino', label: 'Online Casino Sverige' },
      { slug: 'casino-med-swish', label: 'Casino med Swish' },
      { slug: 'casino-med-snabba-uttag', label: 'Casino med snabba uttag' },
      { slug: 'casino-med-bast-rtp', label: 'Casino med bäst RTP' },
      { slug: 'nya-casinon', label: 'Nya casinon Sverige' },
      { slug: 'casino-med-bankid', label: 'Casino med BankID' },
    ],
  },
  {
    category: 'Sport',
    items: [
      { slug: 'sportsbetting', label: 'Sportsbetting Sverige' },
      { slug: 'basta-odds', label: 'Bästa oddsen' },
      { slug: 'live-betting', label: 'Live betting' },
    ],
  },
];

export const metadata = {
  title: 'Casino & Betting Sverige — BigBet.Energy',
  description: 'Oberoende redaktionella guider om casino och sportsbetting i Sverige. Vi analyserar vad Google faktiskt visar dig — och varför.',
};

export default function SverigeIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sverige' },
          ]}
        />
      </div>

      <main className="max-w-[1104px] mx-auto px-4 py-12">

        {/* Hero */}
        <div className="border-l-4 border-amber-400 pl-6 mb-12">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
            🇸🇪 Sverige
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Casino & Betting i Sverige
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl leading-relaxed">
            Oberoende redaktionella guider. Vi analyserar vad som faktiskt rankar på Google
            för varje sökterm — och förklarar varför resultaten inte alltid är vad de verkar.
            Inga dolda incitament. Ingen betald placering.
          </p>
        </div>

        {/* Guide sections */}
        {GUIDES.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-4">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/sverige/${item.slug}`}
                  className="group flex items-center justify-between bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-400 rounded-lg px-5 py-4 transition-all"
                >
                  <span className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                    {item.label}
                  </span>
                  <svg className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Editorial note */}
        <div className="mt-12 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
            Redaktionell princip
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Dessa guider är baserade på 15+ års erfarenhet inom gamblingindustrin.
            Vi granskar Googles sökresultat kritiskt och kommenterar vad som faktiskt
            borde finnas där — och vad som inte borde det.
            Affiliatelänkar läggs endast till på sidor som genererar organisk trafik,
            och enbart till licensierade operatörer godkända av Spelinspektionen.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
