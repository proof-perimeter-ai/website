import Link from "next/link";

export function BtnSolid({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
    >
      {children}
    </Link>
  );
}

export function BtnGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-line-2 bg-transparent px-4.5 py-2.75 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
    >
      {children}
    </Link>
  );
}
