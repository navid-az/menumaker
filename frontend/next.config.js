/** @type {import('next').NextConfig} */
// const nextConfig = {};

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
        protocol: "http",
        hostname: "localhost",
        // port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};
