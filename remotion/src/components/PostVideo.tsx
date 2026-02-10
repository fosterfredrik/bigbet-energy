import React from "react";
import { Sequence } from "remotion";

import { QuoteScene } from "../components/QuoteScene";
import { ContextScene } from "../components/ContextScene";
import { ProgressRingScene } from "../components/ProgressRingScene";
import { GaugeScene } from "../components/GaugeScene";
import { StatCardScene } from "../components/StatCardScene";
import { VerticalBarScene } from "../components/VerticalBarScene";
import { MilestoneScene } from "../components/MilestoneScene";
import { OddsBarScene } from "../components/OddsBarScene";
import { TaleOfTapeScene } from "../components/TaleOfTapeScene";
import { HeadToHeadScene } from "../components/HeadToHeadScene";
import { TimelineScene } from "../components/TimelineScene";

export type PostVideoProps = {
  blocks: Array<{ type: string; props: any }>;
  videoSequence?: number[];  // ← add this
};

const sceneMap: Record<string, React.ComponentType<any>> = {
  Quote: QuoteScene,
  Context: ContextScene,
  ProgressRing: ProgressRingScene,
  Gauge: GaugeScene,
  StatCard: StatCardScene,
  VerticalBar: VerticalBarScene,
  Milestone: MilestoneScene,
  OddsBar: OddsBarScene,
  TaleOfTape: TaleOfTapeScene,
  HeadToHead: HeadToHeadScene,
  Timeline: TimelineScene,
};

// Types to skip
const SKIP = new Set(["InteractiveCTA", "PreferenceCTA", "Sources"]);

export const PostVideo: React.FC<PostVideoProps> = ({ blocks, videoSequence }) => {
  const DURATION = 150;
  let cursor = 0;

  // Reorder blocks if videoSequence provided
  const orderedBlocks = videoSequence 
    ? videoSequence.map(i => blocks[i]) 
    : blocks;

  return (
    <>
      {orderedBlocks.map((block, i) => {
        if (SKIP.has(block.type)) {
          return null;
        }

        const Scene = sceneMap[block.type];
        if (!Scene) {
          console.warn("No scene for block type:", block.type);
          return null;
        }

        const from = cursor;
        cursor += DURATION;

        return (
          <Sequence key={`${block.type}-${i}`} from={from} durationInFrames={DURATION}>
            <Scene {...block.props} isFirst={i === 0} />
          </Sequence>
        );
      })}
    </>
  );
};
