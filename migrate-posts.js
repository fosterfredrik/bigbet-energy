const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

async function migratePosts() {
  console.log('🚀 Starting post migration...\n');

  // Get all JSON files in the root posts directory
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('No posts found to migrate.');
    return;
  }

  console.log(`Found ${files.length} posts to migrate:\n`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    
    // Read the post
    const content = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(content);

    // Get date from 'date' or 'created' field
    const dateStr = post.date || post.created;
    
    if (!dateStr) {
      console.log(`⚠️  Skipping ${file} - no date found`);
      continue;
    }

    // Parse date
    const date = new Date(dateStr);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Create new directory path
    const newDir = path.join(POSTS_DIR, year, month, day);
    const newFilePath = path.join(newDir, file);

    // Create directories if they don't exist
    fs.mkdirSync(newDir, { recursive: true });

    // Update post to use 'date' instead of 'created'
    if (post.created && !post.date) {
      post.date = post.created;
      delete post.created;
    }

    // Write to new location
    fs.writeFileSync(newFilePath, JSON.stringify(post, null, 2));

    // Delete old file
    fs.unlinkSync(filePath);

    console.log(`✅ ${file}`);
    console.log(`   → /${year}/${month}/${day}/${post.slug}\n`);
  }

  console.log('✨ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Move app/[year]/[month]/[day]/[slug]/page.tsx into place');
  console.log('2. Delete app/post/[slug]/ folder');
  console.log('3. Update next.config.ts with redirects');
  console.log('4. Test locally: npm run dev');
  console.log('5. Push to Vercel');
}

migratePosts().catch(console.error);
