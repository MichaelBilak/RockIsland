/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.restaurantguru.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img02.restaurantguru.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dynamic-media.tripadvisor.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
