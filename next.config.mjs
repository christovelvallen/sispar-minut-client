/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
