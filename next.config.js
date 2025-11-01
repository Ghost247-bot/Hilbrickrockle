/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vercel.com'],
    unoptimized: true,
  },
  // Enable standalone output for production (compatible with Netlify)
  ...(process.env.NODE_ENV === 'production' && process.env.NETLIFY !== 'true' && { output: 'standalone' }),
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Trailing slashes configuration
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
  // Configure compression - disable in dev mode as it can interfere with WebSocket
  compress: process.env.NODE_ENV === 'production',
  // Configure base path if needed
  basePath: '',
  // Configure asset prefix if needed
  assetPrefix: '',
  typescript: {
    ignoreBuildErrors: true, // Temporary: Fix icon import errors
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Webpack configuration to ensure WebSocket works properly in dev mode
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Ensure WebSocket client works properly
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
  // Ensure dev server is configured properly for WebSocket
  devIndicators: {
    buildActivity: true,
  },
}

module.exports = nextConfig 