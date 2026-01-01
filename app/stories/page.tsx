import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PostMeta {
  slug: string;
  title: string;
  subhead: string;
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
        const heroBlock = data.blocks?.[0]?.props;
        const heroImage = heroBlock?.image || '/images/placeholder.jpg';
        const heroSubhead = heroBlock?.subhead || '';

        posts.push({
          slug: data.slug,
          title: data.title,
          subhead: heroSubhead,
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
                className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-400 transition-all"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Category */}
                  <span className="inline-block self-start bg-amber-400 text-black text-xs font-bold tracking-wider uppercase px-2 py-1">
                    {post.category}
                  </span>

                  {/* Title + Subhead + Date */}
                  <div>
                    <h2 className="text-white font-bold text-2xl leading-tight group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h2>
                    {post.subhead && (
                      <p className="text-neutral-300 text-sm mt-2 line-clamp-2">
                        {post.subhead}
                      </p>
                    )}
                    <p className="text-neutral-500 text-xs mt-3">
                      {new Date(post.created).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
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
