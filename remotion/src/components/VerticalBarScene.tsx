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

export interface BarItem {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface VerticalBarSceneProps {
  title: string;
  subtitle?: string;
  items: BarItem[];
  unit?: string;
  date: string;
  source: string;
}

export const VerticalBarScene: React.FC<VerticalBarSceneProps> = ({
  title,
  subtitle,
  items,
  unit = "",
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const barsOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const footerOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  const maxValue = Math.max(...items.map((i) => i.value));

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
          By The Numbers
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

      {/* Bars - centered */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 60,
          right: 60,
          bottom: 550,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 48,
          opacity: barsOpacity,
        }}
      >
        {items.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const barGrow = interpolate(frame, [15 + index * 5, 40 + index * 5], [0, heightPercent], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                flex: 1,
                maxWidth: 240,
              }}
            >
              {/* Value */}
              <span
                style={{
                  color: item.highlight ? "#f59e0b" : "#d4d4d4",
                  fontSize: 72,
                  fontWeight: 700,
                  fontFamily: "Geomanist, sans-serif",
                }}
              >
                {item.value.toLocaleString()}
                {unit}
              </span>

              {/* Bar */}
              <div
                style={{
                  width: "100%",
                  height: 600,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${barGrow}%`,
                    backgroundColor: item.highlight ? "#f59e0b" : "#404040",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              </div>

              {/* Label */}
              <span
                style={{
                  color: item.highlight ? "#f59e0b" : "#d4d4d4",
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: "Geomanist, sans-serif",
                  textAlign: "center",
                  lineHeight: 1.2,
                  height: 70,  // ← add this
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
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