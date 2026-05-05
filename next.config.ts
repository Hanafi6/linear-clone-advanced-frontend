/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // بتمسح أي بورت أو مسار عشان تسمح بكل صور انسبلاش
      },
    ],
  },
};

export default nextConfig;