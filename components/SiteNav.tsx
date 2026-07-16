import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between px-7">
        <Link href="/">
          <BrandMark />
        </Link>
        <nav className="hidden gap-7 text-[15px] font-medium text-ink-2 md:flex">
          <Link href="/enterprise" className="hover:text-ink transition-colors">Enterprise</Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link>
        </nav>
        <Link
          href="/book-demo"
          className="rounded-[5px] bg-signal px-4.5 py-2.5 text-[15px] font-semibold text-white hover:bg-signal-deep transition-colors"
        >
          Book demo
        </Link>
      </div>
    </header>
  );
}
