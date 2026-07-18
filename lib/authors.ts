export type Author = {
  name: string;
  role: string;
  avatarSrc: string;
  bio: string;
};

const authors: Record<string, Author> = {
  gaurav: {
    name: "Gaurav",
    role: "Founder",
    avatarSrc: "/assets/blog/authors/gaurav.png",
    bio: "20+ years building enterprise B2B SaaS products. Writes about AI-powered optimization for enterprises, product management, and the engineering side of document processing.",
  },
};

export function getAuthor(id: string): Author {
  const author = authors[id];
  if (!author) throw new Error(`Blog: unknown author id "${id}"`);
  return author;
}
