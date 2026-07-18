import Image from 'next/image'
import type { Author } from '@/lib/authors'

export function AuthorSection({
  author,
  variant = 'byline',
}: {
  author: Author
  variant?: 'byline' | 'card'
}) {
  if (variant === 'card') {
    return (
      <div className="flex items-start gap-4 rounded-md border border-line bg-panel p-6">
        <Image
          src={author.avatarSrc}
          alt={author.name}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <div className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-2">About the author</div>
          <div className="mt-1.5 text-[16.5px] font-semibold text-ink">{author.name}</div>
          <div className="text-sm text-ink-2">{author.role}</div>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.65] text-ink-2">{author.bio}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Image src={author.avatarSrc} alt={author.name} width={36} height={36} className="rounded-full" />
      <div>
        <div className="text-sm font-medium text-ink">{author.name}</div>
        <div className="text-xs text-ink-2">{author.role}</div>
      </div>
    </div>
  )
}
