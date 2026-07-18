import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogHeader } from "@/components/BlogHeader";
import { TableOfContents } from "@/components/TableOfContents";
import { RelatedPosts } from "@/components/RelatedPosts";
import { siteConfig } from "@/lib/metadata";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug)!;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug)!;
  const related = getRelatedPosts(post);
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: `${siteConfig.url}${post.banner.src}`,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.author.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
      mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 2, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
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
        <article className="pt-16 pb-22">
          <div className="mx-auto max-w-[1120px] px-7">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="font-mono text-[12.5px] text-ink-2">
              <Link href="/blog" className="transition-colors hover:text-signal">
                Blog
              </Link>
              <span className="mx-2 text-line-2">/</span>
              <span className="text-ink">{post.title}</span>
            </nav>

            <div className="mt-9 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">
              <div className="max-w-[720px]">
                <BlogHeader post={post} />
                <div className="mt-2">
                  <Body />
                </div>
              </div>

              {post.toc.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24">
                    <TableOfContents items={post.toc} />
                  </div>
                </aside>
              )}
            </div>

            <RelatedPosts posts={related} />

            {/* CTA */}
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-md border border-line bg-paper-2 px-7 py-6">
              <p className="m-0 text-[15.5px] text-ink-2">
                Proof Perimeter runs document AI inside your own perimeter — with a provenance record on every field.
              </p>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
