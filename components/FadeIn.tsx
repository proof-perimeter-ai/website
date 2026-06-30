'use client'

import { useInView } from '@/hooks/useInView'

type Direction = 'up' | 'left' | 'right' | 'none'

type FadeInProps<T extends React.ElementType = 'div'> = {
  as?: T
  delay?: number
  direction?: Direction
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'delay' | 'direction' | 'className' | 'children'>

const hiddenTranslate: Record<Direction, string> = {
  up: 'translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
}

const visibleTranslate: Record<Direction, string> = {
  up: 'translate-y-0',
  left: 'translate-x-0',
  right: 'translate-x-0',
  none: '',
}

export function FadeIn<T extends React.ElementType = 'div'>({
  as,
  delay,
  direction = 'up',
  className = '',
  children,
  ...rest
}: FadeInProps<T>) {
  const [ref, inView] = useInView()
  const Tag = (as ?? 'div') as React.ElementType

  const opacityClass = inView ? 'opacity-100' : 'opacity-0'
  const translateClass = inView ? visibleTranslate[direction] : hiddenTranslate[direction]

  return (
    <Tag
      ref={ref}
      data-fadein=""
      className={`transition-[opacity,transform] duration-700 ease-out ${opacityClass} ${translateClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
