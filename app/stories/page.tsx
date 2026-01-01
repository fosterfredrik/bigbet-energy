import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
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
      <Header />

      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Stories' }
          ]}
        />
      </div>

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
