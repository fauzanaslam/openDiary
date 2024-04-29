/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "agtllqrhusmbrohdpvql.supabase.co",
      },
    ],
  },
};

export default nextConfig;
