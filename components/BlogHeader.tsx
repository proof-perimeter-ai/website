import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'
import { Eyebrow } from '@/components/Eyebrow'
import { AuthorSection } from '@/components/AuthorSection'
import { formatBlogDate } from '@/lib/formatBlogDate'

export function BlogHeader({ post }: { post: BlogPost }) {
  return (
    <header>
      <Eyebrow>{post.category}</Eyebrow>
      <h1 className="mt-4.5 text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">{post.title}</h1>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <AuthorSection author={post.author} />
        <div className="font-mono text-[12.5px] text-ink-2">
          <span>Published {formatBlogDate(post.createdAt)}</span>
          {post.updatedAt !== post.createdAt && <span> · Updated {formatBlogDate(post.updatedAt)}</span>}
          <span> · {post.readingTimeMinutes} min read</span>
        </div>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md bg-paper-2">
        <Image
          src={post.banner.src}
          alt={post.banner.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover"
        />
      </div>
    </header>
  )
}
