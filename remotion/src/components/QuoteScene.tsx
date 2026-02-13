import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme, getFontFace } from "../theme";

export interface QuoteSceneProps {
  quote: string;
  author: string;
  role?: string;
  date?: string;
  source?: string;
  portrait?: string;
  isFirst?: boolean;
}

export const QuoteScene: React.FC<QuoteSceneProps> = ({
  quote,
  author,
  role,
  portrait,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const quoteOpacity = isFirst ? 1 : interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const portraitScale = isFirst ? 1 : interpolate(frame, [10, 30], [0.8, 1], {
    extrapolateRight: "clamp",
  });
  const portraitOpacity = isFirst ? 1 : interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const authorOpacity = isFirst ? 1 : interpolate(frame, [30, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const authorY = isFirst ? 0 : interpolate(frame, [30, 45], [20, 0], {
    extrapolateRight: "clamp",
  });
  const roleOpacity = isFirst ? 1 : interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fontSize = quote.length < 80 ? 80 : quote.length < 150 ? 64 : 64;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bgDark }}>
      <style>{fontFace}</style>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Quote */}
        <div
          style={{
            opacity: quoteOpacity,
            position: "relative",
            marginBottom: 48,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: -80,
              left: -10,
              fontSize: 160,
              color: `${theme.colors.accent}25`,
              fontFamily: "serif",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            "
          </span>
          <blockquote
            style={{
              color: theme.colors.textPrimary,
              fontSize,
              fontFamily: theme.fonts.primary,
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            "{quote}"
          </blockquote>
        </div>

        {/* Portrait */}
        {portrait && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 48,
              opacity: portraitOpacity,
              transform: `scale(${portraitScale})`,
            }}
          >
            <div
              style={{
                width: 500,
                height: 500,
                borderRadius: "50%",
                overflow: "hidden",
                border: `6px solid ${theme.colors.accent}`,
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
          </div>
        )}

        {/* Author */}
        <div
          style={{
            textAlign: "center",
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          <div
            style={{
              color: theme.colors.accent,
              fontSize: 60,
              fontFamily: theme.fonts.primary,
              fontWeight: 700,
            }}
          >
            {author}
          </div>

          {role && (
            <div
              style={{
                color: theme.colors.textSecondary,
                fontSize: 42,
                fontFamily: theme.fonts.primary,
                fontWeight: 400,
                marginTop: 12,
                opacity: roleOpacity,
              }}
            >
              {role}
            </div>
          )}
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
