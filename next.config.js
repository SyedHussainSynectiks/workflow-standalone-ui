/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        // Add your remotePatterns configuration
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}


export default nextConfig;
