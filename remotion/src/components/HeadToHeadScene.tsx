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
  date: string;
  source: string;
}

export const HeadToHeadScene: React.FC<HeadToHeadSceneProps> = ({
  label,
  title,
  subtitle,
  leftTeam,
  rightTeam,
  draws,
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const teamsOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const leftWins = interpolate(frame, [20, 45], [0, leftTeam.wins], {
    extrapolateRight: "clamp",
  });
  const rightWins = interpolate(frame, [20, 45], [0, rightTeam.wins], {
    extrapolateRight: "clamp",
  });
  const drawsAnim = interpolate(frame, [20, 45], [0, draws], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <style>{fontFace}</style>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: "#E5B94E",
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {label}
        </div>
        <h2
          style={{
            color: "#fff",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
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
              color: "#a3a3a3",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
              marginTop: 24,
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
          top: 600,
          left: 60,
          right: 60,
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
            gap: 32,
          }}
        >
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
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
              color: "#fff",
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {leftTeam.name}
          </span>
          <span
            style={{
              color: "#f59e0b",
              fontSize: 140,
              fontWeight: 900,
              fontFamily: "Geomanist, sans-serif",
            }}
          >
            {Math.round(leftWins)}
          </span>
          <span
            style={{
              color: "#737373",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
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
              color: "#a3a3a3",
              fontSize: 120,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
            }}
          >
            {Math.round(drawsAnim)}
          </span>
          <span
            style={{
              color: "#737373",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
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
            gap: 32,
          }}
        >
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
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
              color: "#fff",
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {rightTeam.name}
          </span>
          <span
            style={{
              color: "#f59e0b",
              fontSize: 140,
              fontWeight: 900,
              fontFamily: "Geomanist, sans-serif",
            }}
          >
            {Math.round(rightWins)}
          </span>
          <span
            style={{
              color: "#737373",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
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
          height: 280,
          backgroundColor: "#000",
          opacity: footerOpacity,
        }}
      >
        <div
          style={{
            padding: "24px 60px",
            borderTop: "1px solid #333",
          }}
        >
          <div
            style={{
              color: "#a3a3a3",
              fontSize: 18,
              fontFamily: "Geomanist, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {source} • {date}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};