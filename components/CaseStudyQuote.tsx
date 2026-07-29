export function CaseStudyQuote({ quote }: { quote?: { text: string; attribution: string } }) {
  if (!quote) return null

  return (
    <blockquote className="my-8 max-w-[70ch] border-l-2 border-signal py-1 pl-6">
      <p className="text-[19px] leading-[1.6] text-ink italic">&ldquo;{quote.text}&rdquo;</p>
      <footer className="mt-3 font-mono text-[12.5px] not-italic text-ink-2">{quote.attribution}</footer>
    </blockquote>
  )
}
