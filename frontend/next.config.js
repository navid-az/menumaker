/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
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
