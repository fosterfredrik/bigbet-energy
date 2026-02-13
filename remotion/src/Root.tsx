import { Composition, staticFile } from "remotion";
import { QuoteScene, type QuoteSceneProps } from "./components/QuoteScene";
import { ContextScene, type ContextSceneProps } from "./components/ContextScene";
import { ProgressRingScene, type ProgressRingSceneProps } from "./components/ProgressRingScene";
import { GaugeScene, type GaugeSceneProps } from "./components/GaugeScene";
import { StatCardScene, type StatCardSceneProps } from "./components/StatCardScene";
import { VerticalBarScene, type VerticalBarSceneProps } from "./components/VerticalBarScene";
import { MilestoneScene, type MilestoneSceneProps } from "./components/MilestoneScene";
import { OddsBarScene, type OddsBarSceneProps } from "./components/OddsBarScene";
import { PostVideo, type PostVideoProps } from "./components/PostVideo";
import { posts } from "./posts";


export const RemotionRoot = () => {
  return (
    <>
      {/* Individual scene previews */}
      <Composition<QuoteSceneProps>
        id="QuoteScene"
        component={QuoteScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          quote: "We are going to do something on Greenland, whether they like it or not. I would like to make a deal the easy way but if we don't do it the easy way, we're going to do it the hard way.",
          author: "Donald Trump",
          role: "US President",
          date: "JAN 10, 2026",
          source: "THE ECONOMIC TIMES",
          portrait: staticFile("images/trump-greenland/trump-portrait.png"),
        }}
      />

      <Composition<ContextSceneProps>
        id="ContextScene"
        component={ContextScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          label: "The Target",
          title: "57,000 People. 3x Texas.",
          body:
            "Greenland is home to [[57,000 mostly Indigenous people]] on an island [[three times the size of Texas]]. A January poll shows [[85% reject joining the US]].",
          date: "Jan 2026",
          source: "Verian Poll",
        }}
      />

      <Composition<ProgressRingSceneProps>
        id="ProgressRingScene"
        component={ProgressRingScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          category: "Public Opinion",
          label: "Greenlanders Say No",
          subtitle: "Reject becoming part of the United States.",
          value: 85,
          portrait: staticFile("images/trump-greenland/greenlander.png"),
          source: "Verian Poll",
          date: "Jan 2025",
        }}
      />

      <Composition<GaugeSceneProps>
        id="GaugeScene"
        component={GaugeScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          label: "The Wildcard",
          title: "Invasion Odds",
          subtitle: "US military action against a NATO ally.",
          value: 10,
          portrait: staticFile("images/trump-greenland/nato.png"),
          source: "Polymarket",
          date: "Jan 2026",
        }}
      />

      <Composition<StatCardSceneProps>
        id="StatCardScene"
        component={StatCardScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          stat: "1.5M",
          statLabel: "Tons of Rare Earths",
          label: "The Real Prize",
          subtitle:
            "8th largest reserves globally. Essential for defense tech and breaking China's monopoly.",
          portrait: staticFile("images/trump-greenland/china-earth.png"),
          source: "CSIS",
          date: "Jan 8, 2026",
        }}
      />

      <Composition<VerticalBarSceneProps>
        id="VerticalBarScene"
        component={VerticalBarScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          title: "America's Shopping History",
          subtitle: "US territory purchases — and the one that got away",
          items: [
            { label: "Truman 1946 (rejected)", value: 100, highlight: true },
            { label: "Virgin Islands 1917", value: 25 },
            { label: "Alaska 1867", value: 7.2 },
          ],
          unit: "$M",
          source: "Historical Records",
          date: "Jan 2026",
        }}
      />

      <Composition<MilestoneSceneProps>
        id="MilestoneScene"
        component={MilestoneScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          label: "Not The First Attempt",
          title: "Harry Truman",
          subtitle:
            "Secretly offered Denmark $100 million in gold bullion for Greenland, citing military necessity. Denmark said no.",
          stat: "1946",
          statLabel: "First US Offer",
          portrait: staticFile("images/trump-greenland/truman-portrait.png"),
          source: "Historical Records",
          date: "1946",
        }}
      />

      <Composition<OddsBarSceneProps>
        id="OddsBarScene"
        component={OddsBarScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          market: "Trump's Shopping List",
          variant: "light",
          odds: [
            { label: "Panama Canal", value: 35, highlight: true },
            { label: "Greenland", value: 22 },
            { label: "Canada", value: 3 },
          ],
          source: "Polymarket/Betsafe",
          date: "Jan 2026",
        }}
      />

      {/* Full post videos - auto-generated from posts.ts */}
      {posts.map((post) => (
        <Composition<PostVideoProps>
          key={post.id}
          id={post.id}
          component={PostVideo}
          durationInFrames={(post.data.videoSequence?.length || 10) * 450}
          fps={30}
          width={1080}
          height={1350}
          defaultProps={{
            blocks: post.data.blocks,
            videoSequence: post.data.videoSequence,
          }}
        />
      ))}
    </>
  );
};
