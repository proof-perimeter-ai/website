import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/mockup",
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"],
        allow: "/",
        disallow: "/mockup",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
