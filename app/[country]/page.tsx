import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const COUNTRY_CONFIG: Record<string, {
  flag: string;
  name: string;
  title: string;
  description: string;
  editorialNote: string;
  guides: { category: string; items: { slug: string; label: string }[] }[];
}> = {
  sverige: {
    flag: '🇸🇪',
    name: 'Sverige',
    title: 'Casino & Betting i Sverige',
    description: 'Oberoende redaktionella guider. Vi analyserar vad som faktiskt rankar på Google för varje sökterm — och förklarar varför resultaten inte alltid är vad de verkar. Inga dolda incitament. Ingen betald placering.',
    editorialNote: 'Dessa guider är baserade på 15+ års erfarenhet inom gamblingindustrin. Vi granskar Googles top 100 sökresultat för varje sökterm, klassificerar varje URL och förklarar vad som faktiskt borde finnas där — och vad som inte borde det. Affiliatelänkar läggs enbart till licensierade operatörer godkända av Spelinspektionen.',
    guides: [
      {
        category: 'Casino',
        items: [
          { slug: 'online-casino', label: 'Online Casino Sverige' },
          { slug: 'casino-med-swish', label: 'Casino med Swish' },
          { slug: 'casino-utan-konto', label: 'Casino utan konto' },
          { slug: 'live-casino', label: 'Live Casino' },
          { slug: 'slots', label: 'Slots' },
        ],
      },
      {
        category: 'Betting',
        items: [
          { slug: 'betting-sidor', label: 'Betting sidor' },
          { slug: 'live-betting', label: 'Live betting' },
          { slug: 'spelbolag', label: 'Spelbolag' },
        ],
      },
    ],
  },
  brasil: {
    flag: '🇧🇷',
    name: 'Brasil',
    title: 'Casino & Apostas no Brasil',
    description: 'Guias editoriais independentes. Analisamos o que realmente aparece no Google para cada termo de busca — e explicamos por que os resultados nem sempre são o que parecem. Sem incentivos ocultos. Sem posicionamento pago.',
    editorialNote: 'Estes guias são baseados em 15+ anos de experiência no setor de jogos. Analisamos os 100 primeiros resultados do Google para cada termo, classificamos cada URL e explicamos o que deveria estar lá — e o que não deveria. Links de afiliados apenas para operadores licenciados pelo SPA/Ministério da Fazenda.',
    guides: [
      {
        category: 'Casino',
        items: [
          { slug: 'cassino-online', label: 'Cassino Online' },
          { slug: 'cassino-ao-vivo', label: 'Cassino ao Vivo' },
        ],
      },
      {
        category: 'Apostas',
        items: [
          { slug: 'apostas-esportivas', label: 'Apostas Esportivas' },
        ],
      },
    ],
  },
  argentina: {
    flag: '🇦🇷',
    name: 'Argentina',
    title: 'Casino Online en Argentina',
    description: 'Guías editoriales independientes. Analizamos lo que realmente aparece en Google para cada término de búsqueda — y explicamos por qué los resultados no siempre son lo que parecen. Sin incentivos ocultos. Sin posicionamiento pago.',
    editorialNote: 'Estas guías están basadas en 15+ años de experiencia en la industria del juego. Analizamos los 100 primeros resultados de Google para cada término, clasificamos cada URL y explicamos qué debería estar ahí — y qué no. Links de afiliados únicamente a operadores licenciados por LOTBA o IPLyC con dominio .bet.ar.',
    guides: [
      {
        category: 'Casino',
        items: [
          { slug: 'casino-online', label: 'Casino Online' },
          { slug: 'casino-con-mercadopago', label: 'Casino con MercadoPago' },
        ],
      },
    ],
  },
  uk: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    title: 'Casino & Betting in the UK',
    description: 'Independent editorial guides. We analyse what actually ranks on Google for each search term — and explain why the results aren\'t always what they seem. No hidden incentives. No paid placement.',
    editorialNote: 'These guides are based on 15+ years of experience in the gambling industry. We review the top 100 Google results for each search term, classify every URL and explain what should be there — and what shouldn\'t. Affiliate links only to operators licensed by the UK Gambling Commission.',
    guides: [
      {
        category: 'Casino',
        items: [],
      },
      {
        category: 'Betting',
        items: [],
      },
    ],
  },
};

export default function CountryIndexPage({ params }: { params: { country: string } }) {
  const config = COUNTRY_CONFIG[params.country];
  if (!config) return null;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: config.name },
          ]}
        />
      </div>

      <main className="max-w-[1104px] mx-auto px-4 py-12">

        {/* Hero */}
        <div className="border-l-4 border-amber-400 pl-6 mb-12">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
            {config.flag} {config.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {config.title}
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Guide sections */}
        {config.guides.map((section) => (
          section.items.length > 0 && (
            <div key={section.category} className="mb-10">
              <h2 className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-4">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${params.country}/${item.slug}`}
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
          )
        ))}

        {/* Editorial note */}
        <div className="mt-12 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
          {params.country === 'sverige' ? 'Redaktionell princip' : params.country === 'brasil' ? 'Princípio editorial' : params.country === 'argentina' ? 'Principio editorial' : 'Editorial principle'}
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            {config.editorialNote}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}