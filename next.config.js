/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com', 'imgur.com', 'globalmed-main-b3lh3x.laravel.cloud'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig