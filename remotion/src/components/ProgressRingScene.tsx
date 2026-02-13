import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface ProgressRingSceneProps {
  category?: string;
  label: string;
  subtitle?: string;
  value: number;
  portrait?: string;
  source?: string;
  date?: string;
  isFirst?: boolean;
}

export const ProgressRingScene: React.FC<ProgressRingSceneProps> = ({
  category = "Market Probability",
  label,
  subtitle,
  value,
  portrait,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ringOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const animatedValue = isFirst
    ? value
    : interpolate(frame, [0, 40], [0, value], {
        extrapolateRight: "clamp",
      });

  // Ring dimensions
  const ringSize = 500;
  const radius = ringSize / 2;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

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
          {category}
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
      </div>

      {/* Ring + pill + subtitle */}
      <div
        style={{
          position: "absolute",
          top: 310,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: ringOpacity,
        }}
      >
        <div style={{ position: "relative", width: ringSize, height: ringSize }}>
          <svg height={ringSize} width={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
            <circle
              stroke={theme.colors.trackDark}
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={theme.colors.accent}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {portrait ? (
              <div
                style={{
                  width: ringSize - 60,
                  height: ringSize - 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={staticFile(portrait)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>
            ) : (
              <span
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: 120,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                }}
              >
                {Math.round(animatedValue)}%
              </span>
            )}
          </div>
        </div>

        {/* Pill badge - only when portrait is used */}
        {portrait && (
          <div
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.textDark,
              fontSize: 80,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
              padding: "24px 56px",
              borderRadius: 999,
              marginTop: 28,
            }}
          >
            {Math.round(animatedValue)}%
          </div>
        )}

        {/* Subtitle - flows after pill */}
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              margin: 0,
              marginTop: 28,
              textAlign: "center",
              maxWidth: 800,
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
