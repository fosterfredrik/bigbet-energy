import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface ContextSceneProps {
  label: string;
  title: string;
  body: string;
  date?: string;
  source?: string;
  isFirst?: boolean;
}

export const ContextScene: React.FC<ContextSceneProps> = ({
  label,
  title,
  body,
  date,
  source,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bodyOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
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
              textDecorationColor: theme.colors.accent,
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
    <AbsoluteFill style={{ backgroundColor: theme.colors.bgDark }}>
      <style>{fontFace}</style>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: theme.sizes.headerTop,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
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
            color: theme.colors.textSecondary,
            fontSize: 54,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Body */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 20,
          display: "flex",
          alignItems: "center",
          opacity: bodyOpacity,
        }}
      >
        <p
          style={{
            color: theme.colors.textPrimary,
            fontSize: 76,
            fontWeight: 700,
            fontFamily: theme.fonts.primary,
            lineHeight: 1.25,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {renderBody(body)}
        </p>
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
