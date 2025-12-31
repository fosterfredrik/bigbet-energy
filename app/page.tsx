import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Footer from './components/Footer';
import BettingSections from './components/BettingSections';

interface PostMeta {
  slug: string;
  title: string;
  category: string;
  created: string;
  image: string;
}

async function getPosts(): Promise<PostMeta[]> {
  const postsDir = path.join(process.cwd(), 'content', 'posts');

  try {
    const files = await fs.readdir(postsDir);
    const posts: PostMeta[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(path.join(postsDir, file), 'utf-8');
        const data = JSON.parse(content);

        const heroImage = data.blocks?.[0]?.props?.image || '/images/placeholder.jpg';

        posts.push({
          slug: data.slug,
          title: data.title,
          category: data.category,
          created: data.created,
          image: heroImage,
        });
      }
    }

    return posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-b-4 border-amber-400">
        <div className="max-w-[1104px] mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/">
            <img
              src="/images/bbe-png3.png"
              alt="BigBet.Energy"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
          <a
            href="https://t.me/bigbetenergy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-3 py-2 sm:px-4 rounded transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="hidden sm:inline">Join Telegram</span>
          </a>
        </div>
      </header>

      {/* Main Hero + Posts Section */}
      <section className="bg-amber-400 py-8 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L45,3 L50,0 L95,5 L100,0 L150,8 L155,2 L200,0 L200,35 L160,40 L155,32 L100,38 L90,42 L45,35 L40,40 L0,38 Z' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M0,38 L35,45 L80,40 L85,48 L140,42 L145,50 L200,45 L200,85 L150,90 L145,82 L95,88 L50,82 L45,90 L0,85 Z' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M0,85 L50,92 L55,88 L110,95 L115,90 L165,98 L200,92 L200,135 L155,140 L100,132 L95,140 L40,135 L35,142 L0,138 Z' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M0,138 L40,145 L90,140 L95,150 L150,142 L155,152 L200,148 L200,190 L160,195 L105,188 L100,198 L50,192 L45,200 L0,195 Z' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M25,10 L25,35' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M75,5 L78,38' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M130,8 L125,40' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M180,5 L182,42' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M60,45 L58,82' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M120,48 L122,85' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M175,50 L170,88' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M20,90 L22,135' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M70,88 L68,138' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M135,95 L138,140' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M50,145 L52,192' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M130,150 L128,195' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div className="max-w-[1104px] mx-auto relative">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Left - Intro */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h1 className="text-5xl sm:text-5xl font-bold text-black mb-3">
                Betting Intelligence That Hits Different
              </h1>
              <p className="text-neutral-800 text-base mb-4">
                Odds that matter. Stories that move.
              </p>
            </div>

            {/* Right - Posts List */}
            <div className="lg:w-1/2">
              <div className="flex flex-col gap-3">
                {posts.slice(0, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    className="group flex items-stretch bg-black hover:bg-neutral-900 rounded-lg border border-neutral-800 hover:border-black transition-colors overflow-hidden"
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center px-4">
                      <span className="text-amber-400 text-xs font-bold tracking-wider">
                        {post.category}
                      </span>
                      <h3 className="text-white font-bold text-base group-hover:text-amber-400 transition-colors">
                        {post.title}
                      </h3>
                    </div>

                    <span className="text-amber-400 text-xl flex items-center pr-4">→</span>
                  </Link>
                ))}

                {posts.length === 0 && (
                  <p className="text-neutral-800 py-8">No posts yet.</p>
                )}
              </div>

              <Link
                href="/stories"
                className="mt-4 text-black hover:text-neutral-700 font-bold text-sm inline-flex items-center gap-2 transition-colors"
              >
                All Stories <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="h-1 bg-amber-400"></div>

      {/* Betting Sections - Sportsbooks + Casinos */}
      <BettingSections />

      {/* Spacer before footer */}
      <div className="flex-1 bg-neutral-900"></div>

      <Footer />
    </div>
  );
}
