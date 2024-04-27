/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
    ],
  },
  redirects: [
    {
      source: "/dashboard",
      destination: "/dashboard/my-diary",
    },
  ],
};

export default nextConfig;
