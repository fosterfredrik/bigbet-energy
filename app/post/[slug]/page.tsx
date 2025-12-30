import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Hero from '../../components/Hero';
import OddsBar from '../../components/OddsBar';
import Context from '../../components/Context';
import Donut from '../../components/Donut';
import Quote from '../../components/Quote';
import ProgressRing from '../../components/ProgressRing';
import ProgressBar from '../../components/ProgressBar';
import LineChart from '../../components/LineChart';
import Bubble from '../../components/Bubble';
import VerticalBar from '../../components/VerticalBar';
import CTABanner from '../../components/CTABanner';
import BettingCTA from '../../components/BettingCTA';
import Footer from '../../components/Footer';

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  OddsBar,
  Context,
  Donut,
  Quote,
  ProgressRing,
  ProgressBar,
  LineChart,
  Bubble,
  VerticalBar,
};

interface Story {
  slug: string;
  title: string;
  category: string;
  created: string;
  blocks: { type: string; props: any }[];
}

async function loadStory(slug: string): Promise<Story | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await loadStory(slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <p>Story not found: {slug}</p>
      </div>
    );
  }

  const blocks = story.blocks;

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-b-4 border-amber-400">
        <div className="max-w-[1104px] mx-auto px-4 py-5">
          <Link href="/">
            <img 
              src="/images/bbe-logo.png" 
              alt="BigBet.Energy" 
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="py-12 px-4">
        <div className="max-w-[1104px] mx-auto">
          
          {/* All content in one unified container */}
          <div className="bg-black overflow-hidden">
            
            {/* Row 1: Hero + Odds (gold frame) */}
            {blocks.length >= 2 && (
              <div className="bg-amber-400 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                {blocks.slice(0, 2).map((block, index) => {
                  const Component = componentMap[block.type];
                  if (!Component) return null;
                  return (
                    <div key={index} className="relative min-h-[400px] lg:min-h-0 lg:aspect-square overflow-visible lg:overflow-hidden bg-black">
                      <Component {...block.props} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA Banner */}
            <div className="p-4 border-t border-amber-400/50">
              <CTABanner 
                logo="/images/sponsors/bet365-logo.jpg"
                headline="Want to bet on this market?"
                subhead="Best odds available at Bet365"
                buttonText="Get Bonus"
                buttonUrl="https://bet365.com"
                disclaimer="Gambling can be addictive. Please play responsibly. For help visit stodlinjen.se | spelpaus.se. Bonus terms: New customers only, minimum deposit $10, 1x wagering requirement."
                termsUrl="https://bet365.com/terms"
              />
            </div>

            {/* Row 2: Context + Quote (blocks 3-4) */}
            {blocks.length >= 4 && (
              <div className="border-t border-amber-400/50 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-amber-400/50">
                {blocks.slice(2, 4).map((block, index) => {
                  const Component = componentMap[block.type];
                  if (!Component) return null;
                  return (
                    <div 
                      key={index} 
                      className="min-h-[400px] lg:min-h-0 lg:aspect-square overflow-visible lg:overflow-hidden"
                    >
                      <Component {...block.props} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Row 3: Additional blocks (5-6) */}
            {blocks.length >= 5 && (
              <div className="border-t border-amber-400/50 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-amber-400/50">
                {blocks.slice(4, 6).map((block, index) => {
                  const Component = componentMap[block.type];
                  if (!Component) return null;
                  const cta = (block as any).cta;
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="min-h-[400px] lg:min-h-0 lg:aspect-square overflow-visible lg:overflow-hidden">
                        <Component {...block.props} />
                      </div>
                      {cta && (
                        <div className="p-4 border-t border-amber-400/50">
                          <BettingCTA 
                            logo={cta.logo}
                            headline={cta.headline}
                            subhead={cta.subhead}
                            buttonText={cta.buttonText}
                            buttonUrl={cta.buttonUrl}
                            disclaimer={cta.disclaimer}
                            termsUrl={cta.termsUrl}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Row 4+: Any remaining blocks */}
            {blocks.length > 6 && (
              <div className="border-t border-amber-400/50 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-amber-400/50">
                {blocks.slice(6).map((block, index) => {
                  const Component = componentMap[block.type];
                  if (!Component) return null;
                  return (
                    <div 
                      key={index} 
                      className="min-h-[400px] lg:min-h-0 lg:aspect-square overflow-visible lg:overflow-hidden"
                    >
                      <Component {...block.props} />
                    </div>
                  );
                })}
              </div>
            )}

          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
