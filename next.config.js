/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "condomonk-bucket.nyc3.digitaloceanspaces.com",
        port: "",
        pathname: "/properties/**",
      },
    ],
  },
};

module.exports = nextConfig;
