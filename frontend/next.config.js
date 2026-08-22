/** @type {import('next').NextConfig} */

module.exports = {
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  images: {
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
