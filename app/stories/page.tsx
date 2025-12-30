import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Footer from '../components/Footer';

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

export default async function StoriesPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-neutral-900">
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
            <span>Join Telegram</span>
          </a>
        </div>
      </header>

      <main className="max-w-[1104px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">All Stories</h1>

        {posts.length === 0 ? (
          <p className="text-neutral-500">No stories yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group bg-black rounded-xl border border-neutral-800 hover:border-amber-400 transition-all overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-amber-400 text-xs font-bold tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="text-white font-bold text-lg mt-1 group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 text-sm mt-2">
                    {new Date(post.created).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
