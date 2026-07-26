import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { getAuthor, type Author } from "@/lib/authors";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  banner: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  category: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  relatedPosts?: string[];
  status: "published" | "draft";
};

export type BlogPost = BlogPostFrontmatter & {
  author: Author;
  readingTimeMinutes: number;
  toc: TocItem[];
  faqs: FaqItem[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 225;

let cache: BlogPost[] | null = null;

function extractToc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of body.split("\n")) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    items.push({ id: slugger.slug(text), text, level });
  }
  return items;
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Strip markdown link syntax to plain text, for schema.org fields that expect plain text. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * FAQ Q&As are extracted from the same "## Frequently Asked Questions" section that
 * renders on the page, so FAQPage schema can never drift from what's actually visible.
 */
function extractFaqs(body: string): FaqItem[] {
  const heading = "## Frequently Asked Questions";
  const start = body.indexOf(`${heading}\n`);
  if (start === -1) return [];

  const afterHeading = start + heading.length;
  const nextSectionIdx = body.indexOf("\n## ", afterHeading);
  const section = nextSectionIdx === -1 ? body.slice(afterHeading) : body.slice(afterHeading, nextSectionIdx);

  const faqs: FaqItem[] = [];
  const qaRegex = /^### (.+)\n\n([\s\S]*?)(?=\n### |$)/gm;
  let match: RegExpExecArray | null;
  while ((match = qaRegex.exec(section)) !== null) {
    faqs.push({
      question: toPlainText(match[1]),
      answer: toPlainText(match[2]),
    });
  }
  return faqs;
}

function loadPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const post = data as BlogPostFrontmatter;

    const expectedSlug = file.replace(/\.mdx$/, "");
    if (post.slug !== expectedSlug) {
      throw new Error(`Blog: slug "${post.slug}" does not match filename "${file}"`);
    }
    for (const field of ["title", "description", "banner", "category", "authorId", "createdAt", "updatedAt"] as const) {
      if (!post[field]) throw new Error(`Blog: "${post.slug}" is missing frontmatter field "${field}"`);
    }

    return {
      ...post,
      author: getAuthor(post.authorId),
      readingTimeMinutes: readingTime(content),
      toc: extractToc(content),
      faqs: extractFaqs(content),
    };
  });

  const published = posts.filter((p) => p.status === "published");
  const slugs = new Set(published.map((p) => p.slug));
  for (const post of published) {
    for (const related of post.relatedPosts ?? []) {
      if (!slugs.has(related)) {
        // Warning, not error: posts are authored incrementally, so a related
        // post may not exist yet. getRelatedPosts() skips unresolved slugs.
        console.warn(`[blog] "${post.slug}" references unknown related post "${related}"`);
      }
    }
  }

  return published.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAllPosts(): BlogPost[] {
  if (!cache) cache = loadPosts();
  return cache;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Explicit relatedPosts first, backfilled by shared-tag overlap, up to 3. */
export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const all = getAllPosts();
  const picked: BlogPost[] = [];
  const pickedSlugs = new Set<string>([post.slug]);

  for (const slug of post.relatedPosts ?? []) {
    const related = all.find((p) => p.slug === slug);
    if (related && !pickedSlugs.has(related.slug)) {
      picked.push(related);
      pickedSlugs.add(related.slug);
    }
    if (picked.length === 3) return picked;
  }

  const candidates = all
    .filter((p) => !pickedSlugs.has(p.slug))
    .map((p) => ({
      post: p,
      sharedTags: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((c) => c.sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags || b.post.createdAt.localeCompare(a.post.createdAt));

  for (const candidate of candidates) {
    if (picked.length === 3) break;
    picked.push(candidate.post);
    pickedSlugs.add(candidate.post.slug);
  }

  return picked;
}
