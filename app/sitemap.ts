import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getAllTerms } from "@/lib/glossary";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/book-demo`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/enterprise`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/pricing`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/glossary`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getAllTerms().map((term) => ({
      url: `${siteConfig.url}/glossary/${term.slug}`,
      lastModified: new Date(term.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getAllPosts().map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
