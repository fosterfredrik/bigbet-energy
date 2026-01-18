import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill } from "@remotion/renderer";
import path from "path";
import fs from "fs";

interface PostData {
  slug: string;
  title: string;
  category: string;
  blocks: Array<{
    type: string;
    props: {
      headline?: string;
      leftImage?: string;
      leftOdds?: number;
      leftLabel?: string;
      pointerSide?: "left" | "right";
      rightImage?: string;
      rightOdds?: number;
    };
  }>;
}

async function renderHero(postPath: string) {
  // Read post JSON
  const postContent = fs.readFileSync(postPath, "utf-8");
  const post: PostData = JSON.parse(postContent);

  // Extract hero data from first block (HeroVS)
  const heroBlock = post.blocks[0];
  if (!heroBlock || heroBlock.type !== "HeroVS") {
    console.error("First block must be HeroVS");
    return;
  }

  const props = heroBlock.props;
  const isLeftWinner = props.pointerSide === "left";

  const heroProps = {
    headline: props.headline || post.title,
    odds: isLeftWinner ? props.leftOdds : props.rightOdds,
    face: isLeftWinner ? props.leftImage : props.rightImage,
    category: post.category.toUpperCase(),
  };

  console.log("Rendering hero for:", post.slug);
  console.log("Props:", heroProps);

  // Bundle the Remotion project
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
  });

  const outputDir = path.resolve(`../public/videos/${post.slug}`);
  fs.mkdirSync(outputDir, { recursive: true });

  // Render thumbnail (PNG)
  console.log("Rendering thumbnail...");
  await renderStill({
    composition: "HeroThumbnail",
    serveUrl: bundleLocation,
    output: path.join(outputDir, "hero-thumbnail.png"),
    inputProps: heroProps,
  });

  // Render video (MP4)
  console.log("Rendering video...");
  await renderMedia({
    composition: "HeroScene",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: path.join(outputDir, "hero.mp4"),
    inputProps: heroProps,
  });

  console.log("Done! Output saved to:", outputDir);
}

// Run with: npx ts-node src/render-hero.ts ../content/posts/2026/01/11/trump-greenland-acquisition.json
const postPath = process.argv[2];
if (!postPath) {
  console.error("Usage: npx ts-node src/render-hero.ts <path-to-post.json>");
  process.exit(1);
}

renderHero(postPath);
