import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Hero from '../../components/Hero';
import OddsBar from '../../components/OddsBar';
import Context from '../../components/Context';
import Donut from '../../components/Donut';
import Quote from '../../components/Quote';
import ProgressRing from '../../components/ProgressRing';
import MoneyChart from '../../components/MoneyChart';
import ProgressBar from '../../components/ProgressBar';
import LineChart from '../../components/LineChart';
import Bubble from '../../components/Bubble';
import Timeline from '../../components/Timeline';
import VerticalBar from '../../components/VerticalBar';
import StatCard from '../../components/StatCard';
import Gauge from '../../components/Gauge';
import Milestone from '../../components/Milestone';
import SmartCTA from '../../components/SmartCTA';
import InteractiveCTA from '../../components/InteractiveCTA';
import PreferenceCTA from '../../components/PreferenceCTA';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  OddsBar,
  Context,
  MoneyChart,
  Donut,
  Quote,
  ProgressRing,
  StatCard,
  Milestone,
  ProgressBar,
  LineChart,
  Bubble,
  Timeline,
  VerticalBar,
  Gauge,
  SmartCTA,
  InteractiveCTA,
  PreferenceCTA,
};

// CTA types render full-width
const ctaTypes = ['SmartCTA', 'InteractiveCTA', 'PreferenceCTA'];

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

  // Separate hero row (first 2 blocks) from the rest
  const heroBlocks = blocks.slice(0, 2);
  const remainingBlocks = blocks.slice(2);

  // Group remaining blocks: CTAs are standalone, others pair up
  const groupedBlocks: { type: 'cta' | 'pair'; blocks: typeof blocks }[] = [];
  let currentPair: typeof blocks = [];

  remainingBlocks.forEach((block) => {
    if (ctaTypes.includes(block.type)) {
      // Flush current pair if exists
      if (currentPair.length > 0) {
        groupedBlocks.push({ type: 'pair', blocks: currentPair });
        currentPair = [];
      }
      // Add CTA as standalone
      groupedBlocks.push({ type: 'cta', blocks: [block] });
    } else {
      currentPair.push(block);
      if (currentPair.length === 2) {
        groupedBlocks.push({ type: 'pair', blocks: currentPair });
        currentPair = [];
      }
    }
  });

  // Flush any remaining single block
  if (currentPair.length > 0) {
    groupedBlocks.push({ type: 'pair', blocks: currentPair });
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Stories', href: '/stories' },
            { label: story.title }
          ]}
        />
      </div>

      <main className="py-12 px-4">
        <div className="max-w-[1104px] mx-auto">
          <div className="bg-black overflow-hidden">

            {/* Row 1: Hero + OddsBar (gold frame) */}
            {heroBlocks.length >= 2 && (
              <div className="bg-amber-400 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                {heroBlocks.map((block, index) => {
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

            {/* Remaining blocks: grouped */}
            {groupedBlocks.map((group, groupIndex) => {
              if (group.type === 'cta') {
                // CTA: full width
                const block = group.blocks[0];
                const Component = componentMap[block.type];
                if (!Component) return null;
                return (
                  <div key={groupIndex} className="p-4 border-t border-amber-400/50">
                    <Component {...block.props} />
                  </div>
                );
              } else {
                // Pair: 2-column grid
                return (
                  <div
                    key={groupIndex}
                    className="border-t border-amber-400/50 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-amber-400/50"
                  >
                    {group.blocks.map((block, index) => {
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
                );
              }
            })}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}