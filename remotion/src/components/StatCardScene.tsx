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

export interface StatCardSceneProps {
  stat: string;
  statLabel?: string;
  label: string;
  subtitle?: string;
  date: string;
  source: string;
  portrait?: string;
  quote?: string;
  quoteAuthor?: string;
}

export const StatCardScene: React.FC<StatCardSceneProps> = ({
  stat,
  statLabel,
  label,
  subtitle,
  date,
  source,
  portrait,
  quote,
  quoteAuthor,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const contentOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const portraitOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
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
          Market Stat
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
        {subtitle && (
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
              marginTop: 32,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Content - centered */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 60,
          right: 60,
          bottom: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: contentOpacity,
        }}
      >
        {/* Stat */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
          {statLabel && (
            <div
              style={{
                color: "#f59e0b",
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
          )}
        </div>

        {/* Quote */}
        {quote && (
          <div style={{ textAlign: "center", maxWidth: 800 }}>
            <span
              style={{
                color: "#a3a3a3",
                fontSize: 40,
                fontWeight: 700,
                fontFamily: "Geomanist, sans-serif",
                fontStyle: "italic",
                lineHeight: 1.3,
              }}
            >
              "{quote}"
            </span>
            {quoteAuthor && (
              <div
                style={{
                  color: "#737373",
                  fontSize: 28,
                  fontFamily: "Geomanist, sans-serif",
                  marginTop: 20,
                }}
              >
                — {quoteAuthor}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Portrait - bottom left */}
      {portrait && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 600,
            height: 600,
            opacity: 1,
          }}
        >
          <Img
            src={staticFile(portrait)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </div>
      )}

      {/* Footer - fixed at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 540,
          right: 60,
          paddingTop: 24,
          borderTop: "1px solid #333",
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