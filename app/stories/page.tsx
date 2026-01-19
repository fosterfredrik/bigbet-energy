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
  date: string;
  image: string;
  thumbnail?: string;
}

// Define your categories here - add more as needed
const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Politics', value: 'politics' },
  { label: 'Champions League', value: 'champions-league' },
  { label: 'Premier League', value: 'premier-league' },
  { label: 'NBA', value: 'nba' },
  { label: 'NFL', value: 'nfl' },
  { label: 'Entertainment', value: 'entertainment' },
];

async function getPosts(): Promise<PostMeta[]> {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const posts: PostMeta[] = [];

  try {
    const years = await fs.readdir(postsDir);

    for (const year of years) {
      if (year.startsWith('.')) continue;
      const yearPath = path.join(postsDir, year);
      const yearStat = await fs.stat(yearPath);
      if (!yearStat.isDirectory()) continue;

      const months = await fs.readdir(yearPath);
      for (const month of months) {
        if (month.startsWith('.')) continue;
        const monthPath = path.join(yearPath, month);
        const monthStat = await fs.stat(monthPath);
        if (!monthStat.isDirectory()) continue;

        const days = await fs.readdir(monthPath);
        for (const day of days) {
          if (day.startsWith('.')) continue;
          const dayPath = path.join(monthPath, day);
          const dayStat = await fs.stat(dayPath);
          if (!dayStat.isDirectory()) continue;

          const files = await fs.readdir(dayPath);
          for (const file of files) {
            if (file.endsWith('.json')) {
              const content = await fs.readFile(path.join(dayPath, file), 'utf-8');
              const data = JSON.parse(content);
              const heroBlock = data.blocks?.[0]?.props;
              const heroImage = data.image || heroBlock?.image || '/images/placeholder.jpg';
              const heroSubhead = heroBlock?.subhead || '';

              posts.push({
                slug: data.slug,
                title: data.title,
                subhead: heroSubhead,
                category: data.category,
                date: data.date,
                image: heroImage,
                thumbnail: data.thumbnail || null,
              });
            }
          }
        }
      }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
}

function normalizeCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts = await getPosts();
  const activeCategory = searchParams.category || 'all';

  // Filter posts by category
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => normalizeCategory(post.category) === activeCategory);

  // Get unique categories from posts (for showing only categories that have posts)
  const categoriesWithPosts = new Set(posts.map(p => normalizeCategory(p.category)));

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

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            const hasPostsInCategory = cat.value === 'all' || categoriesWithPosts.has(cat.value);

            // Only show categories that have posts (or 'All')
            if (!hasPostsInCategory) return null;

            return (
              <Link
                key={cat.value}
                href={cat.value === 'all' ? '/stories' : `/stories?category=${cat.value}`}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors rounded ${isActive
                    ? 'bg-amber-400 text-black'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                  }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-neutral-500">No stories in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.date.replace(/-/g, '/')}/${post.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-400 transition-all"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />

                {/* Thumbnail in top-left */}
                {post.thumbnail && (
                  <div className="absolute top-4 left-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-amber-400 bg-neutral-900">
                    <img
                      src={post.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <span className={`inline-block self-start bg-amber-400 text-black text-xs font-bold tracking-wider uppercase px-2 py-1 ${post.thumbnail ? 'ml-20' : ''}`}>
                    {post.category}
                  </span>
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
                      {new Date(post.date).toLocaleDateString('en-US', {
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

        {/* Post count */}
        <p className="text-neutral-600 text-sm mt-8">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
          {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.value === activeCategory)?.label}`}
        </p>
      </main>

      <Footer />
    </div>
  );
}