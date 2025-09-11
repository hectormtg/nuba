import { useCallback, useRef } from 'preact/hooks'

interface Params {
  onEntering?: () => void
  onLeaving?: () => void
  disabled?: boolean
  options?: Record<any, unknown>
  deps?: Array<any>
}

export const useIntersectionObserver = ({
  onEntering,
  onLeaving,
  disabled,
  options = {},
  deps = [],
}: Params) => {
  const observer = useRef<IntersectionObserver>()
  const ref = useCallback(
    (node: any) => {
      if (disabled) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && onEntering) {
            onEntering()
            return
          }
          if (!entry.isIntersecting && onLeaving) {
            onLeaving()
          }
        },
        { ...options }
      )
      if (node) observer.current.observe(node)
    },
    [disabled, ...deps, options]
  )

  return ref
}
