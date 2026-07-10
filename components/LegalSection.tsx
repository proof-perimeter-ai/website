export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-[-0.01em] text-ink">{title}</h2>
      <div className="mt-3 space-y-3.5 text-[15.5px] leading-[1.62] text-ink-2 [&_a]:text-signal [&_a:hover]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
