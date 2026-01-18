import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";

const fontFace = `
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile("fonts/Geomanist-Black.woff2")}') format('woff2');
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile("fonts/Geomanist-Bold.woff2")}') format('woff2');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile("fonts/Geomanist-Regular.woff2")}') format('woff2');
  font-weight: 400;
  font-style: normal;
}
`;

export interface OddsItem {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface OddsBarSceneProps {
  market: string;
  date: string;
  source: string;
  odds: OddsItem[];
  variant?: "dark" | "light";
  portrait?: string;
  isFirst?: boolean;
}

export const OddsBarScene: React.FC<OddsBarSceneProps> = ({
  market,
  date,
  source,
  odds,
  variant = "dark",
  portrait,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();

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
  const isDark = variant === "dark";

  const gap = odds.length <= 3 ? 54 : 36;
  const barHeight = odds.length <= 3 ? 32 : 24;
  const valueFontSize = odds.length <= 3 ? 96 : 72;
  const labelFontSize = odds.length <= 3 ? 50 : 40;

  const bg = isDark ? "#000" : "#f59e0b";
  const headerKickerColor = isDark ? "#f59e0b" : "rgba(0,0,0,0.6)";
  const headerTitleColor = isDark ? "#fff" : "#000";
  const borderColor = isDark ? "#333" : "rgba(0,0,0,0.2)";
  const footerTextColor = isDark ? "#737373" : "rgba(0,0,0,0.5)";
  const barTrackColor = isDark ? "#171717" : "rgba(0,0,0,0.2)";

  const labelColor = (highlight: boolean) => {
    if (isDark) return highlight ? "#f59e0b" : "#a3a3a3";
    return highlight ? "#000" : "rgba(0,0,0,0.5)";
  };

  const valueColor = (highlight: boolean) => {
    if (isDark) return highlight ? "#fff" : "#525252";
    return highlight ? "#000" : "rgba(0,0,0,0.4)";
  };

  const fillColor = (highlight: boolean) => {
    if (isDark) return highlight ? "#f59e0b" : "#404040";
    return highlight ? "#000" : "rgba(0,0,0,0.3)";
  };

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <style>{fontFace}</style>

      {/* Header - fixed at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          right: 60,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: headerKickerColor,
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Market Odds
        </div>

        <h2
          style={{
            color: headerTitleColor,
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {market}
        </h2>
      </div>

      {/* Bars - centered in middle zone */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 60,
          right: 60,
          bottom: 500,
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
              {/* Row */}
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
                    color: labelColor(isHighlight),
                    fontSize: labelFontSize,
                    fontWeight: 700,
                    fontFamily: "Geomanist, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>

                <span
                  style={{
                    color: valueColor(isHighlight),
                    fontSize: valueFontSize,
                    fontWeight: 700,
                    fontFamily: "Geomanist, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {Math.round(barProgress)}%
                </span>
              </div>

              {/* Track */}
              <div
                style={{
                  width: "100%",
                  height: barHeight,
                  borderRadius: 999,
                  overflow: "hidden",
                  backgroundColor: barTrackColor,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barProgress}%`,
                    borderRadius: 999,
                    backgroundColor: fillColor(isHighlight),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Portrait - bottom right */}
      {portrait && (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 600,
            height: 600,
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

      {/* Footer - fixed at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 540,
          paddingTop: 24,
          borderTop: `1px solid ${borderColor}`,
          opacity: footerOpacity,
        }}
      >
        <div
          style={{
            color: footerTextColor,
            fontSize: 18,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {source} • {date}
        </div>
      </div>
    </AbsoluteFill>
  );
};
