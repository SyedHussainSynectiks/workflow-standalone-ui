/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
}

module.exports = {
    images: {
        remotePatterns: [
        {
           protocol: "https",
           hostname: "**",
         },
        ],
     },
  };
export default nextConfig;
