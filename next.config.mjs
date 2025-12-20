/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/finaltests",
  assetPrefix: "/finaltests/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
