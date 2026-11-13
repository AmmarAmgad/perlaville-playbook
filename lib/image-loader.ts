// Custom next/image loader for the static export.
// Maps a PNG under /images to the pre-generated WebP closest to the requested
// width (see scripts/optimize-images.mjs). Anything else is served unchanged.

// Keep in sync with WIDTHS in scripts/optimize-images.mjs.
const WIDTHS = [160, 320, 480, 640, 960, 1280];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const match = src.match(/^(.*\/images\/)([^/]+)\.png$/i);
  if (!match) return src;
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${match[1]}opt/${match[2]}-${size}.webp`;
}
