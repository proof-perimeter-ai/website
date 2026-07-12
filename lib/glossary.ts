import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type GlossaryTerm = {
  title: string;
  slug: string;
  letter: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  relatedTerms: string[];
  status: "published" | "draft";
};

const GLOSSARY_DIR = path.join(process.cwd(), "content", "glossary");

let cache: GlossaryTerm[] | null = null;

function loadTerms(): GlossaryTerm[] {
  const files = fs.readdirSync(GLOSSARY_DIR).filter((f) => f.endsWith(".mdx"));

  const terms = files.map((file) => {
    const raw = fs.readFileSync(path.join(GLOSSARY_DIR, file), "utf8");
    const { data } = matter(raw);
    const term = data as GlossaryTerm;

    const expectedSlug = file.replace(/\.mdx$/, "");
    if (term.slug !== expectedSlug) {
      throw new Error(`Glossary: slug "${term.slug}" does not match filename "${file}"`);
    }
    for (const field of ["title", "letter", "tagline", "description", "category", "publishedAt"] as const) {
      if (!term[field]) throw new Error(`Glossary: "${term.slug}" is missing frontmatter field "${field}"`);
    }
    return term;
  });

  const published = terms.filter((t) => t.status === "published");
  const slugs = new Set(published.map((t) => t.slug));
  for (const term of published) {
    for (const related of term.relatedTerms ?? []) {
      if (!slugs.has(related)) {
        // Warning, not error: batches are authored incrementally, so a related
        // term may not exist yet. getRelatedTerms() skips unresolved slugs.
        console.warn(`[glossary] "${term.slug}" references unknown related term "${related}"`);
      }
    }
  }

  return published.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
}

export function getAllTerms(): GlossaryTerm[] {
  if (!cache) cache = loadTerms();
  return cache;
}

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return getAllTerms().find((t) => t.slug === slug);
}

/** Terms grouped by their index letter, only letters that have terms, A→Z. */
export function getTermsByLetter(): { letter: string; terms: GlossaryTerm[] }[] {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const term of getAllTerms()) {
    const letter = term.letter.toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(term);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, terms]) => ({ letter, terms }));
}

/** First three resolvable related terms, in frontmatter order. */
export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return (term.relatedTerms ?? [])
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => Boolean(t))
    .slice(0, 3);
}
