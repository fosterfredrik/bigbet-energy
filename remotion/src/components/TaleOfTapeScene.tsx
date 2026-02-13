import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface TaleOfTapeRow {
  label: string;
  left: string | number;
  right: string | number;
  winner?: "left" | "right" | "draw";
}

export interface TaleOfTapeSceneProps {
  label: string;
  title: string;
  leftName: string;
  rightName: string;
  rows: TaleOfTapeRow[];
  source?: string;
  date?: string;
  isFirst?: boolean;
}

export const TaleOfTapeScene: React.FC<TaleOfTapeSceneProps> = ({
  label,
  title,
  leftName,
  rightName,
  rows,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tableOpacity = isFirst ? 1 : interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [35, 50], [0, 1], {
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
      </div>

      {/* Team names header */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          display: "flex",
          justifyContent: "space-between",
          opacity: tableOpacity,
        }}
      >
        <div
          style={{
            color: theme.colors.accent,
            fontSize: 52,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {leftName}
        </div>
        <div
          style={{
            color: theme.colors.accent,
            fontSize: 52,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {rightName}
        </div>
      </div>

      {/* Rows */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: tableOpacity,
        }}
      >
        {rows.map((row, index) => {
          const rowOpacity = isFirst
            ? 1
            : interpolate(frame, [20 + index * 5, 35 + index * 5], [0, 1], {
                extrapolateRight: "clamp",
              });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "32px 0",
                borderBottom: `1px solid ${theme.colors.border}`,
                opacity: rowOpacity,
              }}
            >
              {/* Left value */}
              <div
                style={{
                  color: row.winner === "left" ? theme.colors.accent : theme.colors.textSecondary,
                  fontSize: 64,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                  width: 200,
                }}
              >
                {row.left}
              </div>

              {/* Label */}
              <div
                style={{
                  color: theme.colors.textMuted,
                  fontSize: 36,
                  fontFamily: theme.fonts.primary,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                {row.label}
              </div>

              {/* Right value */}
              <div
                style={{
                  color: row.winner === "right" ? theme.colors.accent : theme.colors.textSecondary,
                  fontSize: 64,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                  width: 200,
                  textAlign: "right",
                }}
              >
                {row.right}
              </div>
            </div>
          );
        })}
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
