import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import PostHeader from '@/app/components/PostHeader';
import Hero from '@/app/components/Hero';
import HeroVS from '@/app/components/HeroVS';
import OddsBar from '@/app/components/OddsBar';
import Context from '@/app/components/Context';
import Donut from '@/app/components/Donut';
import Quote from '@/app/components/Quote';
import ProgressRing from '@/app/components/ProgressRing';
import MoneyChart from '@/app/components/MoneyChart';
import ProgressBar from '@/app/components/ProgressBar';
import LineChart from '@/app/components/LineChart';
import Bubble from '@/app/components/Bubble';
import Timeline from '@/app/components/Timeline';
import HeadToHead from '@/app/components/HeadToHead';
import VerticalBar from '@/app/components/VerticalBar';
import StatCard from '@/app/components/StatCard';
import Gauge from '@/app/components/Gauge';
import Milestone from '@/app/components/Milestone';
import TaleOfTape from '@/app/components/TaleOfTape';
import SmartCTA from '@/app/components/SmartCTA';
import InteractiveCTA from '@/app/components/InteractiveCTA';
import PreferenceCTA from '@/app/components/PreferenceCTA';
import Sources from '@/app/components/Sources';
import Header from '@/app/components/Header';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Footer from '@/app/components/Footer';

const componentMap: Record<string, React.ComponentType<any>> = {
  PostHeader,
  Hero,
  HeroVS,
  OddsBar,
  Context,
  MoneyChart,
  Donut,
  Quote,
  ProgressRing,
  StatCard,
  Milestone,
  TaleOfTape,
  ProgressBar,
  LineChart,
  HeadToHead,
  Bubble,
  Timeline,
  VerticalBar,
  Sources,
  Gauge,
  SmartCTA,
  InteractiveCTA,
  PreferenceCTA,
};

// CTA types render full-width
const ctaTypes = ['SmartCTA', 'InteractiveCTA', 'PreferenceCTA', 'Sources'];

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  blocks: { type: string; props: any }[];
}

interface PageParams {
  year: string;
  month: string;
  day: string;
  slug: string;
}

async function loadStory(year: string, month: string, day: string, slug: string): Promise<Story | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', year, month, day, `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }: { params: PageParams }) {
  const { year, month, day, slug } = params;
  const story = await loadStory(year, month, day, slug);

  if (!story) {
    notFound();
  }

  // Auto-inject PostHeader as first block using top-level metadata
  const postHeaderBlock = {
    type: 'PostHeader',
    props: {
      category: story.category,
      title: story.title,
      subtitle: story.subtitle || '',
      date: story.date,
      image: story.image || null,
    }
  };

  // Combine: PostHeader + content blocks
  const allBlocks = [postHeaderBlock, ...story.blocks];

  // Separate hero row (first 2 blocks) from the rest
  const heroBlocks = allBlocks.slice(0, 2);
  const remainingBlocks = allBlocks.slice(2);

  // Group remaining blocks: CTAs are standalone, others pair up
  const groupedBlocks: { type: 'cta' | 'pair'; blocks: typeof allBlocks }[] = [];
  let currentPair: typeof allBlocks = [];

  remainingBlocks.forEach((block) => {
    if (ctaTypes.includes(block.type)) {
      if (currentPair.length > 0) {
        groupedBlocks.push({ type: 'pair', blocks: currentPair });
        currentPair = [];
      }
      groupedBlocks.push({ type: 'cta', blocks: [block] });
    } else {
      currentPair.push(block);
      if (currentPair.length === 2) {
        groupedBlocks.push({ type: 'pair', blocks: currentPair });
        currentPair = [];
      }
    }
  });

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
            { label: story.category, href: `/?category=${story.category.toLowerCase().replace(' ', '-')}` },
            { label: story.title }
          ]}
        />
      </div>

      <main className="py-12 px-4">
        <div className="max-w-[1104px] mx-auto">
          <div className="bg-black overflow-hidden">

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

            {groupedBlocks.map((group, groupIndex) => {
              if (group.type === 'cta') {
                const block = group.blocks[0];
                const Component = componentMap[block.type];
                if (!Component) return null;
                return (
                  <div key={groupIndex} className="p-4 border-t border-amber-400/50">
                    <Component {...block.props} />
                  </div>
                );
              } else {
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
