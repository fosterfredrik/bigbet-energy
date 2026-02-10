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

export interface ContextSceneProps {
  label: string;
  title: string;
  body: string;
  date: string;
  source: string;
}

export const ContextScene: React.FC<ContextSceneProps> = ({
  label,
  title,
  body,
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const renderBody = (text: string) => {
    const parts = text.split(/\[\[|\]\]/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{
              textDecoration: "underline",
              textDecorationColor: "#f59e0b",
              textDecorationThickness: "4px",
              textUnderlineOffset: "6px",
            }}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

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
            color: "#a3a3a3",
            fontSize: 54,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Body - centered */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 60,
          right: 60,
          bottom:150,
          display: "flex",
          alignItems: "center",
          opacity: bodyOpacity,
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 76,
            fontWeight: 700,
            fontFamily: "Geomanist, sans-serif",
            lineHeight: 1.25,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {renderBody(body)}
        </p>
      </div>

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