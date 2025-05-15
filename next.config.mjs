/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "gyeiivlneryidobzspsx.supabase.co",
      },
    ],
  },
};

export default nextConfig;
