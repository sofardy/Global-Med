/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com', 'imgur.com', 'globalmed.kelyanmedia.com'],
    formats: ['image/avif', 'image/webp']
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  }
}

module.exports = nextConfig