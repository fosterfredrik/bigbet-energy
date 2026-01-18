import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
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

export interface QuoteSceneProps {
  quote: string;
  author: string;
  role?: string;
  date: string;
  source: string;
  portrait?: string;
}

export const QuoteScene: React.FC<QuoteSceneProps> = ({
  quote,
  author,
  role,
  date,
  source,
  portrait,
}) => {
  const frame = useCurrentFrame();

  // Animation timeline
  const quoteOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const portraitScale = interpolate(frame, [10, 30], [0.8, 1], {
    extrapolateRight: "clamp",
  });
  const portraitOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const authorOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const authorY = interpolate(frame, [30, 45], [20, 0], {
    extrapolateRight: "clamp",
  });
  const roleOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fontSize = quote.length < 80 ? 80 : quote.length < 150 ? 64 : 64;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <style>{fontFace}</style>

      {/* Header - Notable Quote - fixed at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          right: 60,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: "#E5B94E",
            fontSize: 32,
            fontFamily: "Geomanist, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Notable Quote
        </div>
      </div>

      {/* Main content - centered vertically in safe zone */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 60,
          right: 60,
          bottom: 250,
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
            marginBottom: 120,
          }}
        >
          {/* Decorative quotation mark */}
          <span
            style={{
              position: "absolute",
              top: -100,
              left: -10,
              fontSize: 180,
              color: "rgba(245, 158, 11, 0.15)",
              fontFamily: "serif",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            "
          </span>
          <blockquote
            style={{
              color: "#fff",
              fontSize,
              fontFamily: "Geomanist, sans-serif",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            "{quote}"
          </blockquote>
        </div>

        {/* Portrait - centered */}
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
                border: "6px solid #f59e0b",
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

        {/* Author - centered */}
        <div
          style={{
            textAlign: "center",
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          <div
            style={{
              color: "#f59e0b",
              fontSize: 56,
              fontFamily: "Geomanist, sans-serif",
              fontWeight: 700,
            }}
          >
            {author}
          </div>

          {role && (
            <div
              style={{
                color: "#a3a3a3",
                fontSize: 36,
                fontFamily: "Geomanist, sans-serif",
                fontWeight: 400,
                marginTop: 16,
                opacity: roleOpacity,
              }}
            >
              {role}
            </div>
          )}
        </div>
      </div>

      {/* Footer - fixed near bottom but above platform UI zone */}
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
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {source} • {date}
        </div>
      </div>
    </AbsoluteFill>
  );
};