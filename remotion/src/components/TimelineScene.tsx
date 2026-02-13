import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
} from "remotion";
import { theme, getFontFace } from "../theme";

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
  source?: string;
  date?: string;
  isFirst?: boolean;
}

export const TimelineScene: React.FC<TimelineSceneProps> = ({
  label,
  title,
  subtitle,
  events,
  isFirst = false,
}) => {
  const frame = useCurrentFrame();
  const fontFace = getFontFace(staticFile);

  const headerOpacity = isFirst ? 1 : interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const timelineOpacity = isFirst ? 1 : interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const footerOpacity = isFirst ? 1 : interpolate(frame, [30, 50], [0, 1], {
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
            marginBottom: 16,
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
        {subtitle && (
          <p
            style={{
              color: theme.colors.textSecondary,
              fontSize: 42,
              fontFamily: theme.fonts.primary,
              marginTop: 24,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Timeline - horizontal rows */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: theme.sizes.horizontalPadding,
          right: theme.sizes.horizontalPadding,
          bottom: theme.sizes.footerHeight + 40,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          opacity: timelineOpacity,
        }}
      >
        {events.map((event, index) => {
          const eventOpacity = isFirst
            ? 1
            : interpolate(frame, [15 + index * 5, 25 + index * 5], [0, 1], {
                extrapolateRight: "clamp",
              });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: eventOpacity,
              }}
            >
              {/* Year */}
              <span
                style={{
                  color: event.highlight ? theme.colors.accent : theme.colors.textMuted,
                  fontSize: 44,
                  fontWeight: 700,
                  fontFamily: theme.fonts.primary,
                  width: 130,
                  flexShrink: 0,
                }}
              >
                {event.year}
              </span>

              {/* Label + Description */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span
                  style={{
                    color: event.highlight ? theme.colors.accent : theme.colors.textPrimary,
                    fontSize: 48,
                    fontWeight: 700,
                    fontFamily: theme.fonts.primary,
                  }}
                >
                  {event.label}
                </span>
                {event.description && (
                  <span
                    style={{
                      color: theme.colors.textMuted,
                      fontSize: 42,
                      fontFamily: theme.fonts.primary,
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
