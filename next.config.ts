import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {};

// Turbopack requires remark plugins by name (strings), not function references.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withMDX(nextConfig);
