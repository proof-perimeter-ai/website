export function Eyebrow({
  children,
  className = "",
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "band";
}) {
  const toneClass = tone === "band" ? "text-[#9DC3EC]" : "text-signal";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] ${toneClass} ${className}`}
    >
      <span className="h-[7px] w-[7px] rounded-full bg-live ring-3 ring-live/20" />
      {children}
    </span>
  );
}
