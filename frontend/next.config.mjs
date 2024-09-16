/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                protocol: "http"
            },
            {
                hostname: "*",
                protocol: "https"
            }
        ]
    },
    reactStrictMode: false
};

export default nextConfig;
