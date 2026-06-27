import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/aryan-portfolio" : undefined,
  assetPrefix: isGitHubPages ? "/aryan-portfolio/" : undefined,
};

export default nextConfig;
