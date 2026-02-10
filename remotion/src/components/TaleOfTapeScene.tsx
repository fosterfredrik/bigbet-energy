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

export interface TapeRow {
  label: string;
  left: string | number;
  right: string | number;
  winner?: "left" | "right";
}

export interface TaleOfTapeSceneProps {
  label: string;
  title: string;
  leftName: string;
  rightName: string;
  rows: TapeRow[];
  date: string;
  source: string;
}

export const TaleOfTapeScene: React.FC<TaleOfTapeSceneProps> = ({
  label,
  title,
  leftName,
  rightName,
  rows,
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tableOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], {
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
      </div>

      {/* Table */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 60,
          right: 60,
          bottom: 350,
          display: "flex",
          flexDirection: "column",
          opacity: tableOpacity,
        }}
      >
        {/* Team names header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: "2px solid #333",
          }}
        >
          <span
            style={{
              color: "#f59e0b",
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {leftName}
          </span>
          <span
            style={{
              color: "#f59e0b",
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "Geomanist, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {rightName}
          </span>
        </div>

        {/* Rows */}
        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 16,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                color: row.winner === "left" ? "#f59e0b" : "#a3a3a3",
                fontSize: 72,
                fontWeight: 700,
                fontFamily: "Geomanist, sans-serif",
                width: 200,
              }}
            >
              {row.left}
            </span>
            <span
              style={{
                color: "#737373",
                fontSize: 44,
                fontWeight: 400,
                fontFamily: "Geomanist, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                color: row.winner === "right" ? "#f59e0b" : "#a3a3a3",
                fontSize: 56,
                fontWeight: 700,
                fontFamily: "Geomanist, sans-serif",
                width: 200,
                textAlign: "right",
              }}
            >
              {row.right}
            </span>
          </div>
        ))}
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