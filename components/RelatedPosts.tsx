import type { BlogPost } from '@/lib/blog'
import { Eyebrow } from '@/components/Eyebrow'
import { BlogCard } from '@/components/BlogCard'

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <div className="mt-16 border-t border-line pt-10">
      <Eyebrow>Related reading</Eyebrow>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
