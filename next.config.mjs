import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

function withBundleAnalyzer(config) {
  if (process.env.ANALYZE === "true") {
    const requireFn = eval("require");
    const analyzer = requireFn("@next/bundle-analyzer")({ enabled: true });
    return analyzer(config);
  }
  return config;
}

export default withBundleAnalyzer(nextConfig);
