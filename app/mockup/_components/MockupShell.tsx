"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const navItems = [
  { href: "/mockup/home", label: "Documents", count: "6", icon: "document" },
  { href: "/mockup/templates", label: "Templates", count: "4", icon: "template" },
  { href: "/mockup/workflows", label: "Workflows", count: "2", icon: "workflow" },
  { href: "/mockup/models", label: "Models", count: "2", icon: "model" },
];

export function MockupShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`pp-mockup ${className}`.trim()}>
      <div className="mock-app">
        <aside className="mock-sidebar">
          <div className="mock-nav-label">Acme&apos;s Workspace</div>
          <nav>
            {navItems.map((item) => {
              const active = pathname === item.href || (pathname === "/mockup" && item.href === "/mockup/home");
              return (
                <Link key={item.href} href={item.href} className={`mock-nav-item ${active ? "active" : ""}`}>
                  <Icon name={item.icon} />
                  {item.label}
                  <span className="mock-count">{item.count}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="mock-main">{children}</main>
      </div>
    </div>
  );
}
