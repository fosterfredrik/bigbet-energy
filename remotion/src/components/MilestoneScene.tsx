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

export interface MilestoneSceneProps {
  label: string;
  stat: string;
  statLabel: string;
  title: string;
  subtitle?: string;
  portrait?: string;
  date: string;
  source: string;
}

export const MilestoneScene: React.FC<MilestoneSceneProps> = ({
  label,
  stat,
  statLabel,
  title,
  subtitle,
  portrait,
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const statOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <style>{fontFace}</style>

      {/* Header - fixed at top */}
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
              marginTop: 16,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Stat - centered */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 60,
          right: 60,
          bottom: 700,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: statOpacity,
        }}
      >
        <div
          style={{
            color: "#f59e0b",
            fontSize: 280,
            fontWeight: 900,
            fontFamily: "Geomanist, sans-serif",
            lineHeight: 1,
          }}
        >
          {stat}
        </div>
        <div
          style={{
            color: "#a3a3a3",
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 16,
          }}
        >
          {statLabel}
        </div>
      </div>

      {/* Portrait - bottom left */}
      {portrait && (
        <div
          style={{
            position: "absolute",
            bottom: 280,
            left: 0,
            width: 600,
            height: 600,
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

      {/* Footer - black bar at bottom */}
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