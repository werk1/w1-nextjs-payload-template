'use client'

import { useBoundStore } from '../boundStore'
import { useEffect } from 'react'

/**
 * Hook that provides the current scroll Y position, the clamped scroll Y
 * position, the maximum scroll Y position, the clamped maximum scroll Y
 * position.
 * @returns An object with the following properties: `scrollY`, `scrollYClamped`,
 * `maxScrollY`and `maxScrollYClamped`.
 */
export const useScroll = () => {
  const { scroll, updateScroll } = useBoundStore()

  useEffect(() => {
    // Initial update
    updateScroll()

    // Add event listener
    window.addEventListener('scroll', updateScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [updateScroll])

  return scroll
}