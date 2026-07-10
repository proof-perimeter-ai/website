// Single source of truth for brand colors used in `next/og`-generated assets
// (app/icon.tsx, app/opengraph-image.tsx). Satori (the renderer behind
// `ImageResponse`) can't read CSS custom properties, so these can't simply
// reference `app/globals.css` — keep this file's values in sync with the
// `:root` block there by hand when the palette changes.
export const brandColors = {
  signal: "#14467C",
  signalDeep: "#0E3460",
  paper: "#F7FAFB",
  ink: "#12161A",
  inkMuted: "#52606A",
  lineMuted: "#C6D1D8",
};
