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

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  description: string;
  banner: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  company: {
    name: string;
    industry: string;
  };
  quote?: {
    text: string;
    attribution: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  category: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  status: "published" | "draft";
};

export type CaseStudy = CaseStudyFrontmatter & {
  author: Author;
  readingTimeMinutes: number;
  toc: TocItem[];
};

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const WORDS_PER_MINUTE = 225;

let cache: CaseStudy[] | null = null;

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

function loadCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".mdx"));

  const caseStudies = files.map((file) => {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const caseStudy = data as CaseStudyFrontmatter;

    const expectedSlug = file.replace(/\.mdx$/, "");
    if (caseStudy.slug !== expectedSlug) {
      throw new Error(`Case study: slug "${caseStudy.slug}" does not match filename "${file}"`);
    }
    for (const field of ["title", "description", "banner", "company", "category", "authorId", "createdAt", "updatedAt"] as const) {
      if (!caseStudy[field]) throw new Error(`Case study: "${caseStudy.slug}" is missing frontmatter field "${field}"`);
    }

    return {
      ...caseStudy,
      author: getAuthor(caseStudy.authorId),
      readingTimeMinutes: readingTime(content),
      toc: extractToc(content),
    };
  });

  const published = caseStudies.filter((c) => c.status === "published");
  return published.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!cache) cache = loadCaseStudies();
  return cache;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((c) => c.slug === slug);
}
