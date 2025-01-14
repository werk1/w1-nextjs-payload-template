import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook that provides the current scroll Y position, the clamped scroll Y
 * position, the maximum scroll Y position, the clamped maximum scroll Y
 * position.
 * @returns An object with the following properties: `scrollY`, `scrollYClamped`,
 * `maxScrollY`and `maxScrollYClamped`.
 */

export type ScrollType = {
  scrollY: number
  scrollYClamped: number
  maxScrollY: number
  maxScrollYClamped: number
}
const useScroll = (): ScrollType => {
  const [scrollY, setScrollY] = useState<number>(0)
  const scrollYClamped = useRef<number>(0)

  // The maximal scroll Y position.
  const maxScrollY = document.body.scrollHeight - window.innerHeight

  // The height of the footer tab.
  const footerTabHeight = window.screen.availHeight - window.innerHeight

  // The maximum scroll Y position, but clamped to the height of the
  // footer tab.
  const maxScrollYClamped = document.body.offsetHeight - window.innerHeight - footerTabHeight

  // The function that updates the scroll position and direction.
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
    scrollYClamped.current = Math.min(Math.max(scrollY, 0), maxScrollYClamped)
  }, [maxScrollYClamped, scrollY])

  // Add an event listener to the window that calls `handleScroll` on scroll.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return {
    scrollY,
    scrollYClamped: scrollYClamped.current,
    maxScrollY,
    maxScrollYClamped,
  }
}

export { useScroll }
