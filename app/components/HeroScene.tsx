import { AbsoluteFill, useCurrentFrame, interpolate, Img, spring, useVideoConfig } from "remotion";

interface HeroSceneProps {
  headline: string;
  odds: number;
  face: string;
  category: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  headline,
  odds,
  face,
  category,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const headlineOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const headlineY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: "clamp" });

  const faceScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const oddsValue = interpolate(frame, [30, 60], [0, odds], { extrapolateRight: "clamp" });
  const oddsOpacity = interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" });

  const categoryOpacity = interpolate(frame, [50, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #1a1a1a 0%, #000 50%, #1a1a1a 100%)",
        }}
      />

      {/* Content container - centered in safe zone */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          right: 0,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            color: "#fff",
            fontSize: 72,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            textTransform: "uppercase",
            margin: 0,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          {headline}
        </h1>

        {/* Face */}
        <div
          style={{
            marginTop: 40,
            marginBottom: 40,
            transform: `scale(${Math.min(faceScale, 1)})`,
          }}
        >
          <Img
            src={face}
            style={{
              width: 350,
              height: 450,
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: 20,
              border: "4px solid #f59e0b",
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.4)",
            }}
          />
        </div>

        {/* Odds */}
        <div
          style={{
            opacity: oddsOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#f59e0b",
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {Math.round(oddsValue)}%
          </span>
          <span
            style={{
              color: "#737373",
              fontSize: 24,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginTop: 8,
            }}
          >
            Market Odds
          </span>
        </div>

        {/* Category badge */}
        <div
          style={{
            marginTop: 40,
            opacity: categoryOpacity,
          }}
        >
          <span
            style={{
              backgroundColor: "#f59e0b",
              color: "#000",
              fontSize: 18,
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
