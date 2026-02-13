import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface Team {
  name: string;
  image: string;
  wins: number;
}

export interface HeadToHeadSceneProps {
  label: string;
  title: string;
  subtitle?: string;
  leftTeam: Team;
  rightTeam: Team;
  draws: number;
  date?: string;
  source?: string;
  isFirst?: boolean;
}

export const HeadToHeadScene: React.FC<HeadToHeadSceneProps> = ({
  label,
  title,
  subtitle,
  leftTeam,
  rightTeam,
  draws,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const teamsOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const leftWins = isFirst
    ? leftTeam.wins
    : interpolate(frame, [20, 45], [0, leftTeam.wins], {
        extrapolateRight: "clamp",
      });
  const rightWins = isFirst
    ? rightTeam.wins
    : interpolate(frame, [20, 45], [0, rightTeam.wins], {
        extrapolateRight: "clamp",
      });
  const drawsAnim = isFirst
    ? draws
    : interpolate(frame, [20, 45], [0, draws], {
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
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 32,
              fontFamily: theme.fonts.primary,
              marginTop: 20,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Teams */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: teamsOpacity,
        }}
      >
        {/* Left Team */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: theme.colors.trackDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile(leftTeam.image)}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
              }}
            />
          </div>
          <span
            style={{
              color: theme.colors.textPrimary,
              fontSize: 40,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
              textTransform: "uppercase",
            }}
          >
            {leftTeam.name}
          </span>
          <span
            style={{
              color: theme.colors.accent,
              fontSize: 120,
              fontWeight: 900,
              fontFamily: theme.fonts.primary,
            }}
          >
            {Math.round(leftWins)}
          </span>
          <span
            style={{
              color: theme.colors.textMuted,
              fontSize: 28,
              fontFamily: theme.fonts.primary,
              textTransform: "uppercase",
            }}
          >
            Wins
          </span>
        </div>

        {/* Draws */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              color: theme.colors.textSecondary,
              fontSize: 100,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
            }}
          >
            {Math.round(drawsAnim)}
          </span>
          <span
            style={{
              color: theme.colors.textMuted,
              fontSize: 28,
              fontFamily: theme.fonts.primary,
              textTransform: "uppercase",
            }}
          >
            Draws
          </span>
        </div>

        {/* Right Team */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: theme.colors.trackDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile(rightTeam.image)}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
              }}
            />
          </div>
          <span
            style={{
              color: theme.colors.textPrimary,
              fontSize: 40,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
              textTransform: "uppercase",
            }}
          >
            {rightTeam.name}
          </span>
          <span
            style={{
              color: theme.colors.accent,
              fontSize: 120,
              fontWeight: 900,
              fontFamily: theme.fonts.primary,
            }}
          >
            {Math.round(rightWins)}
          </span>
          <span
            style={{
              color: theme.colors.textMuted,
              fontSize: 28,
              fontFamily: theme.fonts.primary,
              textTransform: "uppercase",
            }}
          >
            Wins
          </span>
        </div>
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
