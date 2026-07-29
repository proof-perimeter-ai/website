export function CaseStudyMetrics({ metrics }: { metrics?: { label: string; value: string }[] }) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-md border border-line bg-panel px-4 py-3.5">
          <div className="text-[22px] font-bold tracking-[-0.02em] text-signal">{metric.value}</div>
          <div className="mt-0.5 text-[13px] text-ink-2">{metric.label}</div>
        </div>
      ))}
    </div>
  )
}
