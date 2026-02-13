import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface GaugeSceneProps {
  label: string;
  title: string;
  subtitle?: string;
  value: number;
  date?: string;
  source?: string;
  portrait?: string;
  isFirst?: boolean;
}

export const GaugeScene: React.FC<GaugeSceneProps> = ({
  label,
  title,
  subtitle,
  value,
  portrait,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const animatedValue = isFirst
    ? value
    : interpolate(frame, [0, 40], [0, value], {
        extrapolateRight: "clamp",
      });

  const needleAngle = -90 + (animatedValue / 100) * 180;

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const gaugeOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const arcLength = 267;
  const strokeLength = (animatedValue / 100) * arcLength;

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
          {label}
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
      </div>

      {/* Gauge */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: gaugeOpacity,
        }}
      >
        <div style={{ position: "relative", width: 1050, height: 600 }}>
          <svg viewBox="0 0 200 110" width="100%" height="100%">
            <defs>
              <clipPath id="gaugeClip">
                <path d="M 20 100 A 80 80 0 0 1 180 100 L 180 110 L 20 110 Z" />
              </clipPath>
            </defs>

            {portrait && (
              <image
                href={staticFile(portrait)}
                x="10"
                y="5"
                width="180"
                height="105"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#gaugeClip)"
              />
            )}

            <path
              d="M 15 100 A 85 85 0 0 1 185 100"
              fill="none"
              stroke={theme.colors.trackDark}
              strokeWidth="10"
            />

            <path
              d="M 15 100 A 85 85 0 0 1 185 100"
              fill="none"
              stroke={theme.colors.accent}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${strokeLength} ${arcLength}`}
            />

            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke={theme.colors.accent}
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${needleAngle} 100 100)`}
            />

            <circle cx="100" cy="100" r="6" fill={theme.colors.accent} />
          </svg>
        </div>

        {/* Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 700,
            marginTop: 16,
            padding: "0 16px",
          }}
        >
          <span style={{ color: theme.colors.textMuted, fontSize: 32, fontFamily: theme.fonts.primary }}>0%</span>
          <span
            style={{
              color: theme.colors.accent,
              fontSize: 80,
              fontWeight: 900,
              fontFamily: theme.fonts.primary,
            }}
          >
            {Math.round(animatedValue)}%
          </span>
          <span style={{ color: theme.colors.textMuted, fontSize: 32, fontFamily: theme.fonts.primary }}>100%</span>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              textAlign: "center",
              maxWidth: 900,
              marginTop: 32,
            }}
          >
            {subtitle}
          </p>
        )}
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
