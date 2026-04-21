"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// next-i18next.config.js
var require_next_i18next_config = __commonJS({
  "next-i18next.config.js"(exports2, module2) {
    "use strict";
    var path2 = require("path");
    module2.exports = {
      i18n: {
        defaultLocale: "en",
        locales: ["en", "fr", "es"]
      },
      localePath: typeof window === "undefined" ? path2.resolve("./public/locales") : "/locales"
    };
  }
});

// next.config.js
var path = require("path");
var { i18n } = require_next_i18next_config();
var nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  },
  transpilePackages: ["@rc-component/util", "@rc-component/table"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    config.resolve.alias["@rc-component/util/es/Children/toArray"] = path.resolve(__dirname, "node_modules/@rc-component/util/es/Children/toArray.js");
    config.resolve.alias["@rc-component/util/es/Dom/canUseDom"] = path.resolve(__dirname, "node_modules/@rc-component/util/es/Dom/canUseDom.js");
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
};
module.exports = nextConfig;
