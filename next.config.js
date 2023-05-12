require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['images227.netlify.app', 'drive.google.com'],
  },
};

module.exports = nextConfig;
