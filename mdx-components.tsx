import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-[clamp(22px,2.6vw,28px)] font-bold tracking-[-0.018em] text-ink">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.01em] text-ink">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 max-w-[70ch] text-[17px] leading-[1.75] text-ink-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-5 max-w-[70ch] list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-ink-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 max-w-[70ch] list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-ink-2">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: ({ href, children }) => (
    <Link href={href ?? "#"} className="text-signal underline decoration-signal/40 underline-offset-2 transition-colors hover:decoration-signal">
      {children}
    </Link>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
