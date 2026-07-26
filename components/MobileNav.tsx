"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown, Landmark, Briefcase, ShieldCheck, Scale, HeartPulse } from "lucide-react";

const industries = [
  { slug: "banking", name: "Banking", icon: Landmark },
  { slug: "financial-services", name: "Financial Services", icon: Briefcase },
  { slug: "insurance", name: "Insurance", icon: ShieldCheck },
  { slug: "legal", name: "Legal", icon: Scale },
  { slug: "healthcare", name: "Healthcare", icon: HeartPulse },
];

const emptySubscribe = () => () => {};

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(true);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const overlay = (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-y-0 right-0 z-[70] flex h-full w-80 max-w-[85vw] flex-col bg-panel shadow-[0_20px_40px_-24px_rgba(20,70,124,0.35)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[68px] items-center justify-end border-b border-line px-5">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center text-ink-2 hover:text-ink transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-4 text-[15px] font-medium text-ink-2">
          <Link
            href="/enterprise"
            onClick={() => setIsOpen(false)}
            className="rounded-md px-2 py-3 hover:bg-paper-2 hover:text-ink transition-colors"
          >
            Enterprise
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setSolutionsExpanded((expanded) => !expanded)}
              aria-expanded={solutionsExpanded}
              className="flex w-full items-center justify-between rounded-md px-2 py-3 hover:bg-paper-2 hover:text-ink transition-colors"
            >
              Solutions
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${solutionsExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {solutionsExpanded ? (
              <div className="flex flex-col gap-1 pb-2 pl-2">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/solutions/${industry.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group/item flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-2"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal">
                      <industry.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[14.5px] font-medium text-ink transition-colors group-hover/item:text-signal">
                      {industry.name}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/solutions"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2.5 text-[14.5px] font-semibold text-signal hover:bg-paper-2 transition-colors"
                >
                  View all solutions
                </Link>
              </div>
            ) : null}
          </div>

          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="rounded-md px-2 py-3 hover:bg-paper-2 hover:text-ink transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="border-t border-line p-5">
          <Link
            href="/book-demo"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center rounded-[5px] bg-signal px-4.5 py-3 text-[15px] font-semibold text-white hover:bg-signal-deep transition-colors"
          >
            Book demo
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center text-ink-2 hover:text-ink transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}
