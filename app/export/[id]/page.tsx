import { promises as fs } from 'fs';
import path from 'path';
import Hero from '../../components/Hero';
import OddsBar from '../../components/OddsBar';
import Context from '../../components/Context';
import Donut from '../../components/Donut';
import Quote from '../../components/Quote';
import ProgressRing from '../../components/ProgressRing';
import ProgressBar from '../../components/ProgressBar';
import LineChart from '../../components/LineChart';

// Legacy hardcoded blocks (keep for backwards compatibility)
const legacyBlocks: Record<string, { type: string; props: any }> = {
  'arsenal-hero': {
    type: 'Hero',
    props: {
      category: 'Champions League',
      headline: '21 Years. Zero European Trophies.',
      subhead: "Arsenal are favorites. But history says they'll find a way to lose. Is this finally the year?",
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
    },
  },
  'arsenal-odds': {
    type: 'OddsBar',
    props: {
      market: 'Champions League Winner 2025/26',
      date: 'Dec 21, 2025',
      source: 'Polymarket',
      variant: 'light',
      odds: [
        { label: 'Arsenal', value: 19 },
        { label: 'Bayern Munich', value: 17 },
        { label: 'Man City', value: 12 },
        { label: 'PSG', value: 11 },
      ],
    },
  },
  'arsenal-context': {
    type: 'Context',
    props: {
      label: 'Why This Year Is Different',
      title: 'The Squad Is Finally Complete',
      body: "After years of near-misses, Arsenal have plugged every gap. Gyökeres provides the goals Arteta always lacked. Zubimendi controls the midfield. And the core — Saka, Saliba, Ødegaard — are entering their peak years. The Opta Supercomputer gives them a 22% chance to win. The highest of any club.",
      date: 'Dec 2025',
      source: 'Analysis',
    },
  },
  'arsenal-donut': {
    type: 'Donut',
    props: {
      title: 'Goals from Set Pieces',
      date: 'Dec 2025',
      source: 'Opta',
      items: [
        { label: 'Set Pieces', value: 50 },
        { label: 'Open Play', value: 35 },
        { label: 'Penalties', value: 15 },
      ],
    },
  },
  'arsenal-quote': {
    type: 'Quote',
    props: {
      quote: 'The 2006 final is the biggest regret of my football career.',
      author: 'Cesc Fàbregas',
      context: 'Arsenal led until the 76th minute, then conceded twice in 4 minutes',
      date: '2020',
      source: 'Interview',
    },
  },
  'arsenal-ring': {
    type: 'ProgressRing',
    props: {
      label: 'Minutes Without Conceding',
      subtitle: '2006 Champions League run. A record. Then they lost the final.',
      value: 99,
      date: 'May 17, 2006',
      source: 'UEFA',
    },
  },
};

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  OddsBar,
  Context,
  Donut,
  Quote,
  ProgressRing,
  ProgressBar,
  LineChart,
};

// Load block from JSON story file
// URL format: /export/[story-slug]-[block-index]
// Example: /export/trump-third-term-2028-0 loads block 0 from trump-third-term-2028.json
async function loadBlockFromJSON(id: string): Promise<{ type: string; props: any } | null> {
  // Parse id to get slug and block index
  // Match pattern: everything up to last hyphen + number
  const match = id.match(/^(.+)-(\d+)$/);
  if (!match) return null;

  const [, slug, indexStr] = match;
  const blockIndex = parseInt(indexStr, 10);

  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const story = JSON.parse(fileContent);

    if (story.blocks && story.blocks[blockIndex]) {
      return story.blocks[blockIndex];
    }
  } catch (error) {
    // File not found or invalid JSON
    return null;
  }

  return null;
}

export default async function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try legacy blocks first
  let block = legacyBlocks[id];

  // If not found, try loading from JSON
  if (!block) {
    block = await loadBlockFromJSON(id) as { type: string; props: any };
  }

  if (!block) {
    return (
      <div className="text-white p-12">
        <p>Block not found: {id}</p>
        <p className="text-neutral-500 mt-4">
          For JSON stories, use format: [slug]-[index]<br />
          Example: trump-third-term-2028-0
        </p>
      </div>
    );
  }

  const Component = componentMap[block.type];

  if (!Component) {
    return <div className="text-white p-12">Component not found: {block.type}</div>;
  }

  return (
    <div className="bg-neutral-900">
      <div
        id="export-block"
        className="w-[1080px] h-[1080px] overflow-hidden"
      >
        <div
          className="w-[540px] h-[540px] origin-top-left"
          style={{ transform: 'scale(2)' }}
        >
          <Component {...block.props} />
        </div>
      </div>
    </div>
  );
}