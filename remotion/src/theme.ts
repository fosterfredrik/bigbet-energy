/**
 * BBE Theme Configuration
 * 
 * BigBet.Energy brand theme for Remotion exports.
 * All scene components pull from this single source.
 */
export const theme = {
  // Brand name
  brandName: "BigBet.Energy",

  // Primary colors
  colors: {
    // Backgrounds
    bgDark: "#000000",
    bgLight: "#f4bb0b",

    // Accent (gold)
    accent: "#f4bb0b",
    accentAlt: "#d3a004",

    // Text
    textPrimary: "#ffffff",
    textSecondary: "#a3a3a3",
    textMuted: "#737373",
    textDark: "#000000",

    // UI elements
    border: "#333333",
    borderLight: "rgba(0,0,0,0.2)",
    trackDark: "#171717",
    trackLight: "rgba(0,0,0,0.2)",

    // Highlights (non-highlighted states)
    mutedBar: "#404040",
    mutedText: "#525252",
  },

  // Typography
  fonts: {
    primary: "Geomanist, sans-serif",
    fallback: "system-ui, -apple-system, sans-serif",
  },

  // Font files (relative to /public/fonts/)
  fontFiles: {
    black: "Geomanist-Black.woff2",
    bold: "Geomanist-Bold.woff2",
    regular: "Geomanist-Regular.woff2",
  },

  // Sizing
  sizes: {
    // Scene dimensions
    width: 1080,
    height: 1350,

    // Padding
    horizontalPadding: 60,

    // Header
    headerTop: 120,
    kickerSize: 28,
    titleSize: 56,

    // Footer
    footerHeight: 120,
    footerTextSize: 18,
  },

  // Animation
  animation: {
    sceneDuration: 150,
    fps: 30,
  },
};

// Helper: Generate CSS font-face declarations
export const getFontFace = (staticFile: (path: string) => string) => `
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile(`fonts/${theme.fontFiles.black}`)}') format('woff2');
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile(`fonts/${theme.fontFiles.bold}`)}') format('woff2');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Geomanist';
  src: url('${staticFile(`fonts/${theme.fontFiles.regular}`)}') format('woff2');
  font-weight: 400;
  font-style: normal;
}
`;

// Helper: Get colors based on variant
export const getVariantColors = (variant: "dark" | "light") => {
  const isDark = variant === "dark";
  const t = theme.colors;

  return {
    bg: isDark ? t.bgDark : t.accent,
    headerKicker: isDark ? t.accent : "rgba(0,0,0,0.6)",
    headerTitle: isDark ? t.textPrimary : t.textDark,
    border: isDark ? t.border : t.borderLight,
    footerText: isDark ? t.textMuted : "rgba(0,0,0,0.5)",
    barTrack: isDark ? t.trackDark : t.trackLight,

    // For highlighted/non-highlighted items
    labelHighlight: isDark ? t.accent : t.textDark,
    labelMuted: isDark ? t.textSecondary : "rgba(0,0,0,0.5)",
    valueHighlight: isDark ? t.textPrimary : t.textDark,
    valueMuted: isDark ? t.mutedText : "rgba(0,0,0,0.4)",
    fillHighlight: isDark ? t.accent : t.textDark,
    fillMuted: isDark ? t.mutedBar : "rgba(0,0,0,0.3)",
  };
};

export default theme;
