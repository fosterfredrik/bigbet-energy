import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface StatCardSceneProps {
  stat: string;
  statLabel?: string;
  label: string;
  subtitle?: string;
  date?: string;
  source?: string;
  portrait?: string;
  quote?: string;
  quoteAuthor?: string;
  isFirst?: boolean;
}

export const StatCardScene: React.FC<StatCardSceneProps> = ({
  stat,
  statLabel,
  label,
  subtitle,
  portrait,
  quote,
  quoteAuthor,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const statOpacity = isFirst ? 1 : interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const portraitOpacity = isFirst ? 1 : interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });

  const statScale = isFirst
    ? 1
    : interpolate(frame, [15, 40], [0.9, 1], {
        extrapolateRight: "clamp",
      });

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
            marginBottom: 12,
          }}
        >
          Market Stat
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
          {label}
        </h2>

        {/* Subtitle - under heading */}
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              marginTop: 20,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {subtitle}
          </p>
        )}

      </div>

      {/* Big Stat */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: statOpacity,
          transform: `scale(${statScale})`,
        }}
      >
        <div
          style={{
            color: theme.colors.accent,
            fontSize: 260,
            fontWeight: 900,
            fontFamily: theme.fonts.primary,
            lineHeight: 1,
          }}
        >
          {stat}
        </div>
        {statLabel && (
          <div
            style={{
              color: theme.colors.accent,
              fontSize: 60,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 16,
            }}
          >
            {statLabel}
          </div>
        )}

        {/* Quote */}
        {quote && (
          <div
            style={{
              textAlign: "center",
              maxWidth: 800,
              margin: "32px auto 0",
            }}
          >
            <span
              style={{
                color: theme.colors.textSecondary,
                fontSize: 32,
                fontWeight: 700,
                fontFamily: theme.fonts.primary,
                fontStyle: "italic",
                lineHeight: 1.3,
              }}
            >
              "{quote}"
            </span>
            {quoteAuthor && (
              <div
                style={{
                  color: theme.colors.textMuted,
                  fontSize: 24,
                  fontFamily: theme.fonts.primary,
                  marginTop: 16,
                }}
              >
                — {quoteAuthor}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Portrait */}
      {portrait && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: theme.sizes.footerHeight,
            width: 500,
            height: 500,
            opacity: portraitOpacity,
          }}
        >
          <Img
            src={staticFile(portrait)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom left",
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
