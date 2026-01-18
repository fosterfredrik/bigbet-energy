import { AbsoluteFill, Img, staticFile } from "remotion";

const fontFace = `
  @font-face {
    font-family: 'Geomanist';
    src: url('${staticFile("fonts/Geomanist-Black.woff2")}') format('woff2');
    font-weight: 900;
    font-style: normal;
  }
`;

const topoPattern = `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L45,3 L50,0 L95,5 L100,0 L150,8 L155,2 L200,0 L200,35 L160,40 L155,32 L100,38 L90,42 L45,35 L40,40 L0,38 Z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M0,38 L35,45 L80,40 L85,48 L140,42 L145,50 L200,45 L200,85 L150,90 L145,82 L95,88 L50,82 L45,90 L0,85 Z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M0,85 L50,92 L55,88 L110,95 L115,90 L165,98 L200,92 L200,135 L155,140 L100,132 L95,140 L40,135 L35,142 L0,138 Z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M0,138 L40,145 L90,140 L95,150 L150,142 L155,152 L200,148 L200,190 L160,195 L105,188 L100,198 L50,192 L45,200 L0,195 Z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M25,10 L25,35' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M75,5 L78,38' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M130,8 L125,40' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M180,5 L182,42' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M60,45 L58,82' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M120,48 L122,85' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M175,50 L170,88' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M20,90 L22,135' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M70,88 L68,138' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M135,95 L138,140' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M50,145 L52,192' stroke='%23f59e0b' stroke-width='1'/%3E%3Cpath d='M130,150 L128,195' stroke='%23f59e0b' stroke-width='1'/%3E%3C/svg%3E")`;

interface HeroSceneProps {
  headline: string;
  image: string;
  subhead?: string;
  odds?: number;
  category?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  headline,
  image,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
      }}
    >
      <style>{fontFace}</style>

      {/* Topographic pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: topoPattern,
          backgroundSize: "200px 200px",
          opacity: 0.15,
        }}
      />

      {/* Headline - at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 150,
          right: 150,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 96,
            fontFamily: "Geomanist, sans-serif",
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {headline}
        </h1>
      </div>

      {/* Image bar - anchored to bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          height: 500,
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          border: "6px solid #f59e0b",
          borderBottom: "none",
          boxShadow: "0 0 60px rgba(245, 158, 11, 0.4)",
        }}
      >
        <Img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};