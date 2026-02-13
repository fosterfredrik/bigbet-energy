import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface ProgressBarSceneProps {
  label: string;
  subtitle?: string;
  value: number;
  source?: string;
  date?: string;
  isFirst?: boolean;
}

export const ProgressBarScene: React.FC<ProgressBarSceneProps> = ({
  label,
  subtitle,
  value,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const barOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const barProgress = isFirst
    ? value
    : interpolate(frame, [15, 50], [0, value], {
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
          Progress
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

      {/* Big percentage + bar */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: barOpacity,
        }}
      >
        {/* Percentage */}
        <div
          style={{
            color: theme.colors.accent,
            fontSize: 400,
            fontWeight: 900,
            fontFamily: theme.fonts.primary,
            lineHeight: 1,
            marginBottom: 40,
          }}
        >
          {Math.round(barProgress)}%
        </div>

        {/* Bar track */}
        <div
          style={{
            width: "100%",
            height: 42,
            borderRadius: 999,
            overflow: "hidden",
            backgroundColor: theme.colors.trackDark,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barProgress}%`,
              borderRadius: 999,
              backgroundColor: theme.colors.accent,
            }}
          />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              textAlign: "center",
              marginTop: 48,
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
