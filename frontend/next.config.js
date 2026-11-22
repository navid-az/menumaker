const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  cacheComponents: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  allowedDevOrigins: ["*.localhost"],
  images: {
    dangerouslyAllowLocalIP: true, // Accept media assets from localhost (DEV only)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/media/**",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "menomaker.ir",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "www.menomaker.ir",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
