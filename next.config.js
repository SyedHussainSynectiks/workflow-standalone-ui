/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: ["**"],
    },
};

module.exports = nextConfig;
