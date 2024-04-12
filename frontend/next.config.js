const isGHPages = process.env.NODE_ENV === 'GHPages'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isGHPages && "/hello-near-examples",
  output: "export",
  reactStrictMode: true,
}

module.exports = nextConfig;
