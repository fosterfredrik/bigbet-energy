import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WallOfReceipts from '../components/WallOfReceipts';

async function getGuide(slug: string) {
  try {
    const fp = path.join(process.cwd(), 'content', 'guides', 'sverige', `${slug}.json`);
    return JSON.parse(await fs.readFile(fp, 'utf-8'));
  } catch {
    return null;
  }
}

const VERDICT: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'legit-affiliate': { bg: 'bg-green-950', text: 'text-green-400', border: 'border-green-800', dot: 'bg-green-400' },
  'licensed-operator': { bg: 'bg-blue-950', text: 'text-blue-400', border: 'border-blue-800', dot: 'bg-blue-400' },
  'seo-grab': { bg: 'bg-amber-950', text: 'text-amber-400', border: 'border-amber-800', dot: 'bg-amber-400' },
  'shady-affiliate': { bg: 'bg-orange-950', text: 'text-orange-400', border: 'border-orange-800', dot: 'bg-orange-400' },
  'unlicensed': { bg: 'bg-red-950', text: 'text-red-400', border: 'border-red-800', dot: 'bg-red-400' },
  'irrelevant': { bg: 'bg-neutral-900', text: 'text-neutral-500', border: 'border-neutral-800', dot: 'bg-neutral-500' },
};

export default async function SverigeGuidePage({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug);
  if (!guide) notFound();

  const { winner, verdict, searchMetadata, serpResults } = guide;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [

                {
                  "@type": "Article",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#article`,
                  "headline": `${guide.searchIntent} — Oberoende analys av top 100 Google-resultat`,
                  "mainEntityOfPage": `https://bigbet.energy/${guide.country}/${guide.slug}`,
                  "datePublished": guide.searchMetadata.isoDate,
                  "dateModified": guide.searchMetadata.isoDate,
                  "inLanguage": guide.locale,
                  "author": { "@id": "https://bigbet.energy/#organization" },
                  "publisher": { "@id": "https://bigbet.energy/#organization" },
                  "mainEntity": { "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#rankings` }
                },

                {
                  "@type": "Organization",
                  "@id": "https://bigbet.energy/#organization",
                  "name": "BigBet.Energy",
                  "url": "https://bigbet.energy",
                  "description": "Oberoende redaktionell analys av spelmarknaden. Vi granskar Googles top 100 resultat för varje sökterm och klassificerar operatörer, affiliates och oseriösa sajter baserat på 15+ års branscherfarenhet.",
                  "slogan": "Vi kallar alla bluffar.",
                  "knowsAbout": [
                    "Spelinspektionen licensing",
                    "Swedish gambling regulation",
                    "Online casino affiliate analysis",
                    "SERP classification",
                    guide.keyword
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#winner`,
                  "name": guide.winner.name,
                  "url": `https://${guide.winner.domain}`,
                  "description": guide.winner.whyItWins,
                  "award": `BigBet.Energy #1 val — ${guide.searchIntent}`,
                  "knowsAbout": guide.winner.badges,
                  "sameAs": [
                    `https://${guide.winner.domain}`,
                    "https://www.spelinspektionen.se/licensinnehavare/"
                  ]
                },
                {
                  "@type": "Review",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#review`,
                  "itemReviewed": { "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#winner` },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": 5,
                    "bestRating": 5,
                    "worstRating": 1,
                    "ratingExplanation": `Vinnare utsedd efter granskning av ${guide.searchMetadata.totalAnalyzed} Google-resultat. Verifierad mot Spelinspektionens licensregister.`
                  },
                  "author": { "@id": "https://bigbet.energy/#organization" },
                  "datePublished": guide.searchMetadata.dateAnalyzed,
                  "reviewBody": `VINNARE (Verifierad ${guide.searchMetadata.verificationDate}): Efter att ha klassificerat ${guide.searchMetadata.totalAnalyzed} organiska Google-resultat för "${guide.keyword}" i Sverige är ${guide.winner.name} vårt förstaval. ${guide.winner.whyItWins} ${guide.verdict.summary}${guide.runnerUps?.length > 0 ? ` Runners-up: ${guide.runnerUps[0].name} (${guide.runnerUps[0].keyBenefit})${guide.runnerUps.length > 1 ? ` och ${guide.runnerUps[1].name} (${guide.runnerUps[1].keyBenefit})` : ''}.` : ''}`
                },

                {
                  "@type": "ItemList",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#rankings`,
                  "name": `Bästa ${guide.searchIntent} — Rankad av BigBet.Energy`,
                  "description": `Top ${1 + (guide.runnerUps?.length || 0)} operatörer efter granskning av ${guide.searchMetadata.totalAnalyzed} Google-resultat`,
                  "numberOfItems": 1 + (guide.runnerUps?.length || 0),
                  "itemListOrder": "https://schema.org/ItemListOrderAscending",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "item": {
                        "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#winner`,
                        "name": guide.winner.name,
                        "url": guide.winner.affiliateUrl
                      }
                    },
                    ...(guide.runnerUps?.map((r: any, i: number) => ({
                      "@type": "ListItem",
                      "position": i + 2,
                      "item": {
                        "@type": "Organization",
                        "name": r.name,
                        "url": r.affiliateUrl,
                        "description": r.whyRunnerUp
                      }
                    })) || [])
                  ]
                },

                ...((guide.peopleShouldAlsoAsk?.length > 0 || guide.faq?.length > 0) ? [{
                  "@type": "FAQPage",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#faq`,
                  "mainEntity": (guide.peopleShouldAlsoAsk?.length > 0
                    ? guide.peopleShouldAlsoAsk
                    : guide.faq
                  ).map((item: any) => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                  }))
                }] : []),

                {
                  "@type": "HowTo",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#methodology`,
                  "name": `Hur vi rankade ${guide.searchIntent}`,
                  "description": `Oberoende klassificering av ${guide.searchMetadata.totalAnalyzed} Google-resultat för "${guide.keyword}" i Sverige`,
                  "step": guide.methodology.steps.map((step: any) => ({
                    "@type": "HowToStep",
                    "position": step.num,
                    "name": step.title,
                    "text": step.text
                  }))
                },

                {
                  "@type": "Dataset",
                  "@id": `https://bigbet.energy/${guide.country}/${guide.slug}#serp-analysis`,
                  "url": `https://bigbet.energy/${guide.country}/${guide.slug}#serp-analysis`,
                  "name": `SERP-analys: "${guide.keyword}" Sverige — Top ${guide.serpResults?.length || 0} resultat`,
                  "description": `Komplett klassificering av Google top ${guide.searchMetadata.totalAnalyzed} organiska resultat för "${guide.keyword}" i Sverige. Varje URL klassificerad som licensierad operatör, seriös affiliate, SEO-grab, tveksam affiliate eller olicensierad.`,
                  "datePublished": guide.searchMetadata.dateAnalyzed,
                  "creator": { "@id": "https://bigbet.energy/#organization" },
                  "variableMeasured": "Spelinspektionen-licensiering, affiliatetyp, redaktionell kvalitet",
                  "measurementTechnique": "Manuell klassificering mot Spelinspektionens licensregister"
                },

                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "BigBet.Energy", "item": "https://bigbet.energy" },
                    { "@type": "ListItem", "position": 2, "name": "Sverige", "item": "https://bigbet.energy/sverige" },
                    { "@type": "ListItem", "position": 3, "name": guide.searchIntent, "item": `https://bigbet.energy/${guide.country}/${guide.slug}` }
                  ]
                }

              ]
            })
          }}
        />

        {/* Intro */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {guide.h1 || guide.searchIntent}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <time className="bg-neutral-800 text-neutral-400 text-sm font-medium px-3 py-1 rounded-lg">
              {searchMetadata.dateAnalyzed}
            </time>
            <span className="bg-neutral-800 text-neutral-400 text-sm font-medium px-3 py-1 rounded-lg">
              {serpResults.length} URL:er analyserade
            </span>
          </div>
          <div className="bg-neutral-800 text-neutral-300 px-6 py-5 rounded-lg border border-amber-400">
            <p className="text-base font-normal leading-relaxed">
              <strong className="text-white">Förstaval:</strong> {verdict.summary}{' '}
              <span className="text-xs text-amber-400 font-semibold">
                Uppdaterad {searchMetadata.verificationDate}
              </span>
            </p>
          </div>
        </div>

        {/* Winner card */}
        <div className="mb-12">
          <div className="relative isolate overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">

            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-0 pb-0">

                {/* Left */}
                <div className="flex flex-col p-8 lg:p-12 lg:pr-8 items-center justify-center">

                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6 text-center">
                    {winner.name}
                  </h2>

                  {/* Stars */}
                  <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-black font-semibold">5/5</span>
                    <span className="text-black/40">·</span>
                    <span className="text-sm text-black/60">Redaktionellt betyg</span>
                  </div>

                  {/* ✅ Mobile image — only visible below lg, hidden on desktop */}
                  <div className="lg:hidden w-full aspect-square max-w-xs border-4 border-black/10 rounded-2xl overflow-hidden bg-white mx-auto mb-8">
                    {winner.logo
                      ? <img src={winner.logo} alt={winner.name} className="w-full h-full object-cover" />
                      : <span className="text-neutral-900 font-bold text-2xl text-center">{winner.name}</span>
                    }
                  </div>

                  {/* Badges */}
                  <div className="grid grid-cols-2 gap-2 w-full max-w-md mx-auto mb-8">
                    {winner.badges.map((badge: string, i: number) => (
                      <span key={i} className="bg-black/10 text-black text-sm font-bold px-3 py-2 rounded-lg shadow-md text-center flex items-center justify-center min-h-[3rem]">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="w-full max-w-md mx-auto">
                    <a href={winner.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block bg-black hover:bg-neutral-800 text-amber-400 font-bold px-8 py-4 text-lg rounded-full shadow-lg transition-colors text-center"
                    >
                      {winner.affiliateLabel}
                    </a>
                    <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                      <span className="text-black/50 text-xs">18+</span>
                      <span className="text-black/30">·</span>
                      <a href="https://stodlinjen.se" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black text-xs transition">Stödlinjen.se</a>
                      <span className="text-black/30">·</span>
                      <a href="https://spelpaus.se" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black text-xs transition">Spelpaus.se</a>
                      {winner.termsAndConditions && (
                        <>
                          <span className="text-black/30">·</span>
                          <details className="inline">
                            <summary className="text-black/50 text-xs cursor-pointer hover:text-black transition list-none inline-flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              Visa villkor
                            </summary>
                            <p className="text-black/50 text-xs leading-relaxed mt-2 text-center w-full">
                              {winner.termsAndConditions}
                            </p>
                          </details>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right — logo */}
                <div className="hidden lg:flex relative flex-col items-center justify-center p-8 lg:p-12 lg:pl-8">
                  <div className="w-full aspect-square max-w-xs border-4 border-black/10 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                    {winner.logo
                      ? <img src={winner.logo} alt={winner.name} className="w-full h-full object-cover" />
                      : <span className="text-neutral-900 font-bold text-2xl text-center">{winner.name}</span>
                    }
                  </div>
                </div>

              </div>

              {/* Bottom */}
              <div className="px-8 lg:px-12 pb-10">
                <p className="text-2xl leading-relaxed text-black/70 font-semibold text-center max-w-4xl mx-auto">
                  {winner.whyItWins}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why this one */}
        <section
          className="mb-12"
          id="why-this-one"
          data-section="operator-analysis"
          data-cite-id="winner-evidence"
          data-verified={searchMetadata.verificationDate}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Varför just den här
          </h2>
          <div className="space-y-5">
            <div className="bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-700">
              <span className="bg-amber-400 text-black px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                {winner.sectionBadge}
              </span>
              <ul className="space-y-3 text-neutral-300">
                {winner.materialEvidence.map((evidence: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2"
                    data-evidence-id={`evidence-${idx + 1}`}
                    data-source={evidence.externalUrl ? evidence.externalUrl : "editorial-review"}
                    data-verified={searchMetadata.isoDate}
                    data-claim-type={evidence.title}
                    data-dataset-row={evidence.serpRow ?? undefined}
                  >
                    <span className="text-amber-400 font-bold text-lg mt-0.5">✓</span>
                    <span>
                      <strong>{evidence.title}:</strong> {evidence.description}
                      {evidence.externalUrl && (

                        <a href={evidence.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-amber-400 hover:text-amber-300 text-xs transition"
                        >
                          {evidence.externalLabel || "Verifiera →"}
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-lg text-xs font-medium">
                  Redaktionell kommentar
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-amber-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-base text-neutral-300 leading-relaxed mb-2 italic">
                "{winner.customerReview.quote}"
              </p>
              <span className="text-xs text-neutral-500">
                {winner.customerReview.author} · {winner.customerReview.date}
              </span>
            </div>
          </div>
        </section>
        {/* Key Specs */}
        <section
          className="mb-12"
          id="key-specs"
          data-section="specifications"
          data-cite-id="winner-specs"
          data-verified={searchMetadata.verificationDate}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Nyckelinfo
          </h2>
          <div className="space-y-6">
            <div className="bg-neutral-800 rounded-lg shadow-sm p-6 border-2 border-amber-400">
              <h3 className="font-bold text-amber-400 mb-4 text-lg">Vad du får</h3>
              <ul className="space-y-2 text-neutral-300">
                {winner.specs.whatYouGet.map((spec: any, idx: number) => (
                  <li key={idx}>
                    • <strong className="text-amber-400">{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-700">
              <span className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                Verifierat
              </span>
              <ul className="space-y-3 text-neutral-300">
                {winner.specs.certifications.map((cert: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Runners-up */}
        {guide.runnerUps && guide.runnerUps.length > 0 && (
          <section
            className="mb-12"
            data-section="runners-up"
            data-cite-id="alternative-operators"
            data-verified={searchMetadata.verificationDate}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Runners-Up
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.runnerUps.map((runnerUp: any, idx: number) => (
                <div
                  key={idx}
                  className="border-2 border-amber-400 rounded-lg overflow-hidden bg-neutral-800 flex flex-col shadow-lg hover:shadow-xl transition-shadow"
                  data-product-rank={idx + 2}
                >
                  {/* Logo section */}
                  <div className="relative bg-white flex items-center justify-center" style={{ minHeight: '240px', maxHeight: '240px' }}>
                    {runnerUp.logo
                      ? <img src={runnerUp.logo} alt={runnerUp.name} className="w-full h-full object-cover" />
                      : <span className="text-neutral-900 font-bold text-3xl text-center">{runnerUp.name}</span>
                    }
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-400 text-black px-3 py-1 rounded-lg text-sm font-bold">
                        #{idx + 2}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-neutral-800 flex-grow flex flex-col">
                    <h3 className="font-bold text-white mb-2 text-xl">
                      {runnerUp.name}
                    </h3>

                    <div className="text-xs text-neutral-500 mb-3">
                      Google-position: #{runnerUp.googleRank}
                    </div>

                    {/* Key benefit */}
                    <div className="bg-amber-400/10 text-amber-400 border border-amber-400/30 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                      ✓ {runnerUp.keyBenefit}
                    </div>

                    {/* Description */}
                    <p className="text-neutral-300 mb-6 flex-grow text-sm leading-relaxed">
                      {runnerUp.whyRunnerUp}
                    </p>

                    {/* CTA */}
                    <a
                      href={runnerUp.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-lg shadow-md transition-colors text-center"
                    >
                      {runnerUp.affiliateLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* The Bubble */}
        {guide.theBubble && (
          <section
            className="mb-12"
            data-section="bubble"
            data-cite-id="honorable-mention"
            data-manually-curated="true"
            data-editor-verified={searchMetadata.verificationDate}
          >
            <div className="border-2 border-neutral-700 rounded-lg overflow-hidden bg-neutral-800">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <span className="bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg text-xs font-bold">
                    The Bubble
                  </span>
                  <span className="text-xs text-neutral-500 italic">
                    Manuellt tillagd av redaktionen
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg mb-3">
                  {guide.theBubble.name}
                </h3>

                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                  {guide.theBubble.explanation}
                </p>

                <ul className="space-y-2 mb-6">
                  {guide.theBubble.evidence?.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-neutral-500 text-xs">
                    Google-position: #{guide.theBubble.googleRank}
                  </span>

                  <a
                    href={guide.theBubble.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-block bg-neutral-900 border-2 border-amber-400 text-amber-400 hover:bg-neutral-700 font-bold px-6 py-3 rounded-lg transition-colors text-center text-sm"
                  >
                    {guide.theBubble.affiliateLabel}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why they failed */}
        {guide.failureCards && guide.failureCards.length > 0 && (
          <section
            className="mb-12"
            id="why-they-failed"
            data-section="failures"
            data-cite-id="disqualified-sites"
            data-failure-count={guide.failureCards.length}
            data-verified={searchMetadata.verificationDate}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Varför dessa rankar — men inte borde
            </h2>
            <div className="p-5 mb-6 text-base text-red-300 rounded-lg bg-red-950 border border-red-800" role="alert">
              <p className="font-normal leading-relaxed">
                <strong className="text-red-200">Varning.</strong> {guide.bestsellerWarning}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guide.failureCards.slice(0, 3).map((card: any, idx: number) => (
                <div
                  key={idx}
                  className="border-2 border-red-800 rounded-lg overflow-hidden bg-neutral-800 flex flex-col"
                  data-failure-type={card.badge}
                  data-cite-id={`failure-${idx + 1}`}
                >
                  {/* Domain display */}
                  <div className="relative w-full bg-neutral-900 flex items-center justify-center p-8" style={{ minHeight: '140px' }}>
                    <span className="text-neutral-400 font-mono text-sm text-center break-all">{card.domain}</span>
                    <div className="absolute top-4 left-4">
                      <span className="bg-neutral-800 text-neutral-500 text-xs px-2 py-0.5 rounded">
                        Google #{card.googleRank}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-neutral-800 flex-grow flex flex-col">
                    <span className="bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-lg text-xs font-medium inline-block mb-3">
                      {card.badge}
                    </span>
                    <h3 className="font-bold text-white mb-2 text-base">
                      {card.productName}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 flex-grow leading-relaxed">
                      {card.whyItFailed}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Methodology */}
        <section
          className="mb-12"
          id="methodology"
          data-section="methodology"
          data-cite-id="verification-process"
          data-products-analyzed={guide.serpResults.length}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Så här gjorde vi
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-700" />
            <div className="space-y-10">
              {guide.methodology.steps.map((step: any) => (
                <div key={step.num} className="relative pl-14">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {step.num === 1
                        ? `Vi hämtade de ${guide.serpResults.length} första organiska resultaten för "${guide.keyword}" i ${guide.country === 'sverige' ? 'Sverige' : guide.country} via Ahrefs. Alla URL:er inkluderades oavsett relevans.`
                        : step.num === 2
                          ? `Varje URL klassificerades baserat på följande kriterier: ${guide.rankingCriteria.join(', ')}. Denna screening narrowade fältet till de mest relevanta kandidaterna för "${guide.keyword}".`
                          : step.text
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WallOfReceipts
          results={guide.serpResults}
          type={guide.type}
          serpHealth={guide.serpHealth}
        />

        {/* People Should Also Ask */}
        {guide.peopleShouldAlsoAsk && guide.peopleShouldAlsoAsk.length > 0 && (
          <section className="mb-12" id="people-should-also-ask" data-section="people-should-also-ask" data-cite-id="people-should-also-ask">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Folk borde ocks fråga
            </h2>
            <div className="space-y-6">
              {guide.peopleShouldAlsoAsk.map((item: any, idx: number) => (
                <div key={idx} className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.question}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        {guide.finalCTA && (
          <section className="mb-12">
            <div className="relative isolate overflow-hidden bg-neutral-800 border-4 border-amber-400 rounded-xl shadow-lg p-10 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">{guide.finalCTA.headline}</h3>
              <p className="text-neutral-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {guide.finalCTA.text}
              </p>

              <a href={winner.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 text-lg rounded-full shadow-lg transition-colors"
              >
                {winner.affiliateLabel}
              </a>
              <p className="text-xs text-neutral-600 mt-5">18+ · Stödlinjen.se · Spelpaus.se · Spela ansvarsfullt</p>
            </div>
          </section>
        )}

        {/* Disclaimer */}
        {(() => {
          const disclaimerText: Record<string, string> = {
            sv: `Denna analys är baserad på granskning av Googles top ${guide.serpResults.length} organiska resultat för "${guide.keyword}" i Sverige samt 15+ års erfarenhet inom gamblingindustrin. Affiliatelänkar tillkommer enbart till Spelinspektionen-licensierade operatörer. Spela ansvarsfullt. 18+. Stödlinjen: 020-81 91 00.`,
            en: `This analysis is based on a review of the top ${guide.serpResults.length} organic Google results for "${guide.keyword}" in the UK, plus 15+ years of industry experience. Affiliate links are only provided to licensed operators. Gamble responsibly. 18+. GamCare: 0808 8020 133.`,
            pt: `Esta análise é baseada na revisão dos top ${guide.serpResults.length} resultados orgânicos do Google para "${guide.keyword}" no Brasil, com mais de 15 anos de experiência no setor. Links de afiliados apenas para operadores licenciados. Jogue com responsabilidade. 18+.`,
          }
          return (
            <section className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 mb-8">
              <p className="text-sm text-neutral-500 leading-relaxed">
                <strong className="text-neutral-400">Disclaimer:</strong>{' '}
                {disclaimerText[guide.locale] || disclaimerText['en']}
              </p>
            </section>
          )
        })()}

      </main >
      <Footer />
    </div >
  );
}