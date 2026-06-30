'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(
  options?: { threshold?: number; rootMargin?: string }
): [React.RefObject<Element | null>, boolean] {
  const ref = useRef<Element | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
