/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: "/hello-near-examples/frontend",
  output: "export",
  reactStrictMode: true,
}

module.exports = nextConfig;
