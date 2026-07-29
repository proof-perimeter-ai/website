import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy } from '@/lib/case-studies'

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-line bg-panel transition-colors hover:bg-paper-2"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-2">
        <Image
          src={caseStudy.banner.src}
          alt={caseStudy.banner.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mt-3 text-[16.5px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-signal">
          {caseStudy.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-ink-2">{caseStudy.description}</p>
        <div className="mt-4 flex items-center gap-2 pt-4 font-mono text-[11.5px] text-ink-2">
          <span>{caseStudy.company.name}</span>
          <span aria-hidden>·</span>
          <span>{caseStudy.readingTimeMinutes} min read</span>
        </div>
      </div>
    </Link>
  )
}
