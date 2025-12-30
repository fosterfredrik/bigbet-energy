const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Get arguments from command line
const slug = process.argv[2];
const count = parseInt(process.argv[3]) || 6;

if (!slug) {
  console.log('Usage: node scripts/export.js <slug> <count>');
  console.log('Example: node scripts/export.js trump-third-term-2028 6');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '../exports', slug);

async function exportBlocks() {
  // Create exports folder if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set viewport to 1080x1080
  await page.setViewport({ width: 1080, height: 1080 });

  for (let i = 0; i < count; i++) {
    const blockId = `${slug}-${i}`;
    const url = `http://localhost:3000/export/${blockId}`;
    
    console.log(`Exporting: ${blockId}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

      // Wait a bit for everything to render
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to find the block, with longer timeout
      const element = await page.$('#export-block');
      
      if (element) {
        await element.screenshot({
          path: path.join(OUTPUT_DIR, `${slug}-${i}.png`),
          type: 'png',
        });
        console.log(`✓ Saved: ${slug}-${i}.png`);
      } else {
        // Fallback: take full page screenshot
        console.log(`⚠ Block selector not found, taking full screenshot...`);
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `${slug}-${i}.png`),
          type: 'png',
          clip: { x: 0, y: 0, width: 1080, height: 1080 }
        });
        console.log(`✓ Saved (fallback): ${slug}-${i}.png`);
      }
    } catch (error) {
      console.log(`✗ Error on ${blockId}: ${error.message}`);
      // Continue with next block instead of crashing
    }
  }

  await browser.close();
  console.log(`\nDone! Exports saved to: ${OUTPUT_DIR}`);
}

exportBlocks().catch(console.error);