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

export interface TimelineEvent {
  year: string;
  label: string;
  description?: string;
  highlight?: boolean;
}

export interface TimelineSceneProps {
  label: string;
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
  date: string;
  source: string;
}

export const TimelineScene: React.FC<TimelineSceneProps> = ({
  label,
  title,
  subtitle,
  events,
  date,
  source,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const timelineOpacity = interpolate(frame, [10, 30], [0, 1], {
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
        {subtitle && (
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 36,
              fontFamily: "Geomanist, sans-serif",
              marginTop: 24,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 60,
          right: 60,
          bottom: 350,
          display: "flex",
          flexDirection: "column",
          gap: 48,
          opacity: timelineOpacity,
        }}
      >
        {events.map((event, index) => {
          const eventOpacity = interpolate(
            frame,
            [15 + index * 5, 25 + index * 5],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                opacity: eventOpacity,
              }}
            >
              {/* Year */}
              <span
                style={{
                  color: event.highlight ? "#f59e0b" : "#737373",
                  fontSize: 64,
                  fontWeight: 700,
                  fontFamily: "Geomanist, sans-serif",
                  width: 160,
                }}
              >
                {event.year}
              </span>

              {/* Dot */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: event.highlight ? "#f59e0b" : "#404040",
                }}
              />

              {/* Label + Description */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span
                  style={{
                    color: event.highlight ? "#f59e0b" : "#fff",
                    fontSize: 72,
                    fontWeight: 700,
                    fontFamily: "Geomanist, sans-serif",
                  }}
                >
                  {event.label}
                </span>
                {event.description && (
                  <span
                    style={{
                      color: "#737373",
                      fontSize: 52,
                      fontFamily: "Geomanist, sans-serif",
                    }}
                  >
                    {event.description}
                  </span>
                )}
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