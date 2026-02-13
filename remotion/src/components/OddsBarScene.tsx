import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace, getVariantColors } from "../theme";

export interface OddsItem {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface OddsBarSceneProps {
  market: string;
  date?: string;
  source?: string;
  odds: OddsItem[];
  variant?: "dark" | "light";
  portrait?: string;
  isFirst?: boolean;
}

export const OddsBarScene: React.FC<OddsBarSceneProps> = ({
  market,
  odds,
  variant = "dark",
  portrait,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);
  const colors = getVariantColors(variant);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const barsOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const portraitOpacity = isFirst ? 1 : interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const portraitScale = isFirst
    ? interpolate(frame, [30, 60], [1, 1.05], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 1;

  const maxValue = Math.max(...odds.map((o) => o.value));
  const hasHighlight = odds.some((o) => o.highlight);

  const gap = odds.length <= 3 ? 54 : 36;
  const barHeight = odds.length <= 3 ? 32 : 24;
  const valueFontSize = odds.length <= 3 ? 96 : 72;
  const labelFontSize = odds.length <= 3 ? 50 : 40;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <style>{fontFace}</style>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: theme.sizes.headerTop,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: colors.headerKicker,
            fontSize: theme.sizes.kickerSize,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Market Odds
        </div>

        <h2
          style={{
            color: colors.headerTitle,
            fontSize: theme.sizes.titleSize,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {market}
        </h2>
      </div>

      {/* Bars */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap,
          opacity: barsOpacity,
        }}
      >
        {odds.map((item, index) => {
          const isHighlight = hasHighlight ? !!item.highlight : item.value === maxValue;
          const barProgress = isFirst
            ? item.value
            : interpolate(frame, [15 + index * 5, 35 + index * 5], [0, item.value], {
                extrapolateRight: "clamp",
              });

          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 12,
                  gap: 16,
                }}
              >
                <span
                  style={{
                    color: isHighlight ? colors.labelHighlight : colors.labelMuted,
                    fontSize: labelFontSize,
                    fontWeight: 700,
                    fontFamily: theme.fonts.primary,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>

                <span
                  style={{
                    color: isHighlight ? colors.valueHighlight : colors.valueMuted,
                    fontSize: valueFontSize,
                    fontWeight: 700,
                    fontFamily: theme.fonts.primary,
                    lineHeight: 1,
                  }}
                >
                  {Math.round(barProgress)}%
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: barHeight,
                  borderRadius: 999,
                  overflow: "hidden",
                  backgroundColor: colors.barTrack,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barProgress}%`,
                    borderRadius: 999,
                    backgroundColor: isHighlight ? colors.fillHighlight : colors.fillMuted,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Portrait */}
      {portrait && (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: theme.sizes.footerHeight,
            width: 400,
            height: 400,
            opacity: portraitOpacity,
            transform: `scale(${portraitScale})`,
            transformOrigin: "bottom right",
          }}
        >
          <Img
            src={staticFile(portrait)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: theme.sizes.footerHeight,
          backgroundColor: "#111111",
          borderTop: `1px solid ${theme.colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: footerOpacity,
        }}
      >
        <Img
          src={staticFile("images/bbe-500x105.png")}
          style={{
            height: 60,
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
