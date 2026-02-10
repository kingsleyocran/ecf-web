/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  transpilePackages: ['@rc-component/util', '@rc-component/table'],
  webpack(config){
    config.module.rules.push({
      test:/\.svg$/,
      use: ["@svgr/webpack"]
    })
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // Fix for antd/rc-component module resolution issues in Next.js 14
    // Use webpack's resolve.alias to fix missing .js extensions
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // Fix for missing .js extensions in @rc-component/util imports
    config.resolve.alias['@rc-component/util/es/Children/toArray'] = path.resolve(__dirname, 'node_modules/@rc-component/util/es/Children/toArray.js');
    config.resolve.alias['@rc-component/util/es/Dom/canUseDom'] = path.resolve(__dirname, 'node_modules/@rc-component/util/es/Dom/canUseDom.js');

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig

