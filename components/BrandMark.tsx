import { siteConfig } from "@/lib/metadata";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink ${className}`}>
      <span className="relative inline-block h-[18px] w-[18px] rounded-[3px] border-2 border-signal">
        <span className="absolute -right-px -bottom-px h-[7px] w-[7px] rounded-full border border-paper bg-live" />
      </span>
      {siteConfig.name}
    </span>
  );
}
