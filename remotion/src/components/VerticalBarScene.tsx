import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface BarItem {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface VerticalBarSceneProps {
  title: string;
  subtitle?: string;
  items: BarItem[];
  unit?: string;
  date?: string;
  source?: string;
  isFirst?: boolean;
}

export const VerticalBarScene: React.FC<VerticalBarSceneProps> = ({
  title,
  subtitle,
  items,
  unit = "",
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const barsOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  const maxValue = Math.max(...items.map((i) => i.value));

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bgDark }}>
      <style>{fontFace}</style>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: theme.sizes.headerTop,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: theme.colors.accent,
            fontSize: theme.sizes.kickerSize,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          By The Numbers
        </div>
        <h2
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.sizes.titleSize,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              marginTop: 16,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bars */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 120,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 40,
          opacity: barsOpacity,
        }}
      >
        {items.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const barGrow = isFirst
            ? heightPercent
            : interpolate(frame, [15 + index * 5, 40 + index * 5], [0, heightPercent], {
                extrapolateRight: "clamp",
              });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                flex: 1,
                maxWidth: 200,
              }}
            >
              {/* Value */}
              <span
                style={{
                  color: item.highlight ? theme.colors.accent : theme.colors.textSecondary,
                  fontSize: 72,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                }}
              >
                {item.value.toLocaleString()}
                {unit}
              </span>

              {/* Bar */}
              <div
                style={{
                  width: "100%",
                  height: 600,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${barGrow}%`,
                    backgroundColor: item.highlight ? theme.colors.accent : theme.colors.mutedBar,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              </div>

              {/* Label */}
              <span
                style={{
                  color: item.highlight ? theme.colors.accent : theme.colors.textSecondary,
                  fontSize: 42,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                  textAlign: "center",
                  lineHeight: 1.2,
                  height: 60,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

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
