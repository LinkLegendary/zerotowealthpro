import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zerotowealthpro.com" }],
        destination: "https://zerotowealthpro.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
