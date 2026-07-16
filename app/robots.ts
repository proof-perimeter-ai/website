import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/mockup", "/home-v1", "/home-v2"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"],
        allow: "/",
        disallow: ["/mockup", "/home-v1", "/home-v2"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
