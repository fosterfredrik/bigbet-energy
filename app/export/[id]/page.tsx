import { promises as fs } from 'fs';
import path from 'path';
import Hero from '../../components/Hero';
import HeroVS from '@/app/components/HeroVS';
import OddsBar from '../../components/OddsBar';
import Context from '../../components/Context';
import Donut from '../../components/Donut';
import Quote from '../../components/Quote';
import ProgressRing from '../../components/ProgressRing';
import ProgressBar from '../../components/ProgressBar';
import LineChart from '../../components/LineChart';
import HeadToHead from '../../components/HeadToHead';
import Milestone from '../../components/Milestone';
import StatCard from '../../components/StatCard';
import VerticalBar from '../../components/VerticalBar';
import Gauge from '../../components/Gauge';
import MoneyChart from '../../components/MoneyChart';

// Legacy hardcoded blocks (keep for backwards compatibility)
const legacyBlocks: Record<string, { type: string; props: any }> = {
  // ... keep existing legacy blocks
};

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  HeroVS,
  OddsBar,
  Context,
  Donut,
  Quote,
  ProgressRing,
  ProgressBar,
  LineChart,
  HeadToHead,
  Milestone,
  StatCard,
  VerticalBar,
  Gauge,
  MoneyChart,
};

// Load block from JSON story file
// Searches both old flat structure and new date-based structure
async function loadBlockFromJSON(id: string): Promise<{ type: string; props: any } | null> {
  const match = id.match(/^(.+)-(\d+)$/);
  if (!match) return null;

  const [, slug, indexStr] = match;
  const blockIndex = parseInt(indexStr, 10);

  // Paths to try (new date-based structure + old flat structure)
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  
  try {
    // First, try to find the file by searching date folders
    const years = await fs.readdir(postsDir).catch(() => []);
    
    for (const year of years) {
      if (!year.match(/^\d{4}$/)) continue;
      const yearPath = path.join(postsDir, year);
      const months = await fs.readdir(yearPath).catch(() => []);
      
      for (const month of months) {
        if (!month.match(/^\d{2}$/)) continue;
        const monthPath = path.join(yearPath, month);
        const days = await fs.readdir(monthPath).catch(() => []);
        
        for (const day of days) {
          if (!day.match(/^\d{2}$/)) continue;
          const filePath = path.join(monthPath, day, `${slug}.json`);
          try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const story = JSON.parse(fileContent);
            if (story.blocks && story.blocks[blockIndex]) {
              return story.blocks[blockIndex];
            }
          } catch {
            // File not found, continue searching
          }
        }
      }
    }

    // Fallback: try old flat structure
    const flatPath = path.join(postsDir, `${slug}.json`);
    const fileContent = await fs.readFile(flatPath, 'utf-8');
    const story = JSON.parse(fileContent);
    if (story.blocks && story.blocks[blockIndex]) {
      return story.blocks[blockIndex];
    }
  } catch {
    return null;
  }

  return null;
}

export default async function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let block = legacyBlocks[id];

  if (!block) {
    block = await loadBlockFromJSON(id) as { type: string; props: any };
  }

  if (!block) {
    return (
      <div className="text-white p-12">
        <p>Block not found: {id}</p>
        <p className="text-neutral-500 mt-4">
          For JSON stories, use format: [slug]-[index]<br />
          Example: arsenal-vs-liverpool-premier-league-0
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