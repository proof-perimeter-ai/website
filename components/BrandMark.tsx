import Image from "next/image";
import { siteConfig } from "@/lib/metadata";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink ${className}`}>
      {/* <Image src="/assets/brand/logo.png" alt="" width={22} height={22} className="rounded-[5px]" /> */}
      {siteConfig.name}
    </span>
  );
}
