import type { NextConfig } from "next";

const repoName = "perlaville-playbook";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export: serve pre-generated WebP sizes (scripts/optimize-images.mjs).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 640, 960, 1280],
    imageSizes: [160, 320],
  },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true,
};

export default nextConfig;