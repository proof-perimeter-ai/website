import type { CaseStudy } from '@/lib/case-studies'
import { AuthorSection } from '@/components/AuthorSection'
import { formatBlogDate } from '@/lib/formatBlogDate'

export function CaseStudyHeader({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <header>
      <h1 className=" text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">{caseStudy.title}</h1>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <AuthorSection author={caseStudy.author} />
        <div className="font-mono text-[12.5px] text-ink-2">
          <span>Published {formatBlogDate(caseStudy.createdAt)}</span>
          {caseStudy.updatedAt !== caseStudy.createdAt && <span> · Updated {formatBlogDate(caseStudy.updatedAt)}</span>}
          <span> · {caseStudy.readingTimeMinutes} min read</span>
        </div>
      </div>
    </header>
  )
}
