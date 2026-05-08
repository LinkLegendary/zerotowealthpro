import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.zerotowealthpro.com' }],
        destination: 'https://zerotowealthpro.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;





















// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   reactCompiler: true,
//   reactStrictMode: true,

//   async redirects() {
//     return [
//       {
//         source: '/:path*',
//         has: [{ type: 'host', value: 'www.zerotowealthpro.com' }],
//         destination: 'https://zerotowealthpro.com/:path*',
//         permanent: true,
//       },
//     ];
//   },

//   async rewrites() {
//     return [
//       {
//         source: '/ads.txt',
//         destination: '/api/ads-txt',
//       },
//     ];
//   },
// };

// export default nextConfig;

















// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   reactStrictMode: true,

//   async redirects() {
//     return [
//       {
//         source: "/:path*",
//         has: [{ type: "host", value: "www.zerotowealthpro.com" }],
//         destination: "https://zerotowealthpro.com/:path*",
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;
