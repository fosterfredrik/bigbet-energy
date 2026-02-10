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

export interface ProgressRingSceneProps {
  label: string;
  category?: string;
  value: number;
  subtitle?: string;
  date: string;
  source: string;
  portrait?: string;
}

export const ProgressRingScene: React.FC<ProgressRingSceneProps> = ({
  label,
  category = "Market Probability",
  value,
  subtitle,
  date,
  source,
  portrait,
}) => {
  const frame = useCurrentFrame();

  const animatedValue = interpolate(frame, [0, 40], [0, value], {
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Ring dimensions - much bigger
  const ringSize = 700;
  const radius = ringSize / 2;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (animatedValue / 100) * circumference;

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
          {category}
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
          {label}
        </h2>
      </div>

      {/* Ring - centered */}
      <div
        style={{
          position: "absolute",
          top: 500,
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
              stroke="#1a1a1a"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#f59e0b"
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

          {/* Center content - portrait or percentage */}
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
                  width: ringSize - 80,
                  height: ringSize - 80,
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
                  color: "#fff",
                  fontSize: 120,
                  fontWeight: 700,
                  fontFamily: "Geomanist, sans-serif",
                }}
              >
                {Math.round(animatedValue)}%
              </span>
            )}
          </div>
        </div>

        {/* Percentage badge - shown when portrait is used */}
        {portrait && (
          <div
            style={{
              backgroundColor: "#f59e0b",
              color: "#000",
              fontSize: 80,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
              padding: "30px 60px",
              borderRadius: 999,
              marginTop: 32,
            }}
          >
            {Math.round(animatedValue)}%
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            position: "absolute",
            bottom: 450,
            left: 60,
            right: 60,
            textAlign: "center",
            opacity: ringOpacity,
          }}
        >
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
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