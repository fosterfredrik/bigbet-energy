import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from './components/Header';
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
      <Header />

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
              <h1 className="text-4xl sm:text-6xl font-bold text-black mb-3">
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
