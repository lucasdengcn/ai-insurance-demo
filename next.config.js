/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      // Example: adding an alias and custom file extension
      resolveAlias: {
        underscore: "lodash",
      },
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  },
};

module.exports = nextConfig;
