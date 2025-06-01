/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  // Configurar headers de cache para assets estáticos
  async headers() {
    return [
      {
        source: "/sounds/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 año
          },
        ],
      },
      {
        source: "/textures/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 año
          },
        ],
      },
      {
        source: "/soundtracks/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 año
          },
        ],
      },
      {
        source: "/:path*\\.(wav|mp3|ogg|jpg|jpeg|png|webp|glb|gltf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Configurar compresión
  compress: true,
};

export default nextConfig;
