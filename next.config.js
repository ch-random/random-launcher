/** @type {import('next').NextConfig} */

const nextConfig = {
  // https://zenn.dev/unreact/articles/nextjs-config-export-path-map-jp
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/post": { page: "/post" },
    };
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
