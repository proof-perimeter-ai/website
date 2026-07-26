import Link from "next/link";
import { ChevronDown, Landmark, Briefcase, ShieldCheck, Scale, HeartPulse } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { MobileNav } from "@/components/MobileNav";

const industries = [
  { slug: "banking", name: "Banking", icon: Landmark },
  { slug: "financial-services", name: "Financial Services", icon: Briefcase },
  { slug: "insurance", name: "Insurance", icon: ShieldCheck },
  { slug: "legal", name: "Legal", icon: Scale },
  { slug: "healthcare", name: "Healthcare", icon: HeartPulse },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between px-7">
        <Link href="/">
          <BrandMark />
        </Link>
        <nav className="hidden gap-7 text-[15px] font-medium text-ink-2 md:flex">
          <div className="group relative">
            <Link href="/solutions" className="flex items-center gap-1 hover:text-ink transition-colors">
              Solutions
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-md border border-line bg-panel p-2 shadow-[0_20px_40px_-24px_rgba(20,70,124,0.35)]">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/solutions/${industry.slug}`}
                    className="group/item flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-2"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal transition-transform duration-200 group-hover/item:scale-110">
                      <industry.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[14.5px] font-medium text-ink transition-colors group-hover/item:text-signal">
                      {industry.name}
                    </span>
                  </Link>
                ))}
                <div className="mt-1 border-t border-line pt-1">
                  <Link
                    href="/solutions"
                    className="group/item flex items-center rounded-md px-3 py-2.5 text-[14.5px] font-semibold text-signal transition-colors hover:bg-paper-2"
                  >
                    View all solutions
                    <span className="ml-1 transition-transform duration-200 group-hover/item:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/enterprise" className="hover:text-ink transition-colors">Enterprise</Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/book-demo"
            className="hidden rounded-[5px] bg-signal px-4.5 py-2.5 text-[15px] font-semibold text-white hover:bg-signal-deep transition-colors md:inline-flex"
          >
            Book demo
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
