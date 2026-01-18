import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
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

export interface GaugeSceneProps {
  label: string;
  title: string;
  subtitle?: string;
  value: number;
  date: string;
  source: string;
  portrait?: string;
}

export const GaugeScene: React.FC<GaugeSceneProps> = ({
  label,
  title,
  subtitle,
  value,
  date,
  source,
  portrait,
}) => {
  const frame = useCurrentFrame();

  const animatedValue = interpolate(frame, [0, 40], [0, value], {
    extrapolateRight: "clamp",
  });

  const needleAngle = -90 + (animatedValue / 100) * 180;

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const gaugeOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const arcLength = 267;
  const strokeLength = (animatedValue / 100) * arcLength;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        padding: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{fontFace}</style>

      {/* Header - fixed at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
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
      </div>

      {/* Gauge */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: gaugeOpacity,
        }}
      >
        <div style={{ position: "relative", width: 875, height: 500 }}>
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
              stroke="#1a1a1a"
              strokeWidth="10"
            />

            <path
              d="M 15 100 A 85 85 0 0 1 185 100"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${strokeLength} ${arcLength}`}
            />

            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${needleAngle} 100 100)`}
            />

            <circle cx="100" cy="100" r="6" fill="#f59e0b" />
          </svg>
        </div>

        {/* Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 875,
            marginTop: 20,
            padding: "0 16px",
          }}
        >
          <span style={{ color: "#737373", fontSize: 40, fontFamily: "Geomanist, sans-serif" }}>0%</span>
          <span
            style={{
              color: "#f59e0b",
              fontSize: 96,
              fontWeight: 900,
              fontFamily: "Geomanist, sans-serif",
            }}
          >
            {Math.round(animatedValue)}%
          </span>
          <span style={{ color: "#737373", fontSize: 40, fontFamily: "Geomanist, sans-serif" }}>100%</span>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
              textAlign: "center",
              maxWidth: 600,
              marginTop: 64,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer - fixed at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          paddingTop: 24,
          borderTop: "1px solid #333",
          textAlign: "center",
          opacity: footerOpacity,
        }}
      >
        <div
          style={{
            color: "#737373",
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