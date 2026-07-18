import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { BlogCard } from "@/components/BlogCard";
import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI-powered document processing for regulated industries — from the Proof Perimeter team.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${siteConfig.name} Blog`,
      url: `${siteConfig.url}/blog`,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${siteConfig.url}/blog/${post.slug}`,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <SiteNav />
      <main className="flex-1">
        <section className="pt-21 pb-14">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-4.5 max-w-[22ch] text-[clamp(34px,4.6vw,52px)] font-bold tracking-[-0.022em] text-ink">
              Insights on AI-powered document processing for regulated industries.
            </h1>
            {/* <p className="mt-6 max-w-[62ch] text-[19px] text-ink-2">
              Insights on AI-powered document processing for regulated industries.
            </p> */}
          </div>
        </section>

        <section className="pb-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 60}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
