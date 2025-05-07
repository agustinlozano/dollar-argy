/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    // remove in the future
    domains: ["www.phbalcony.com"],
  },
};

export default nextConfig;
