'use client'

import { useBoundStore } from '../boundStore'
import { useEffect } from 'react'
import { calculateScrollVelocity } from './utils/calculateScrollVelocity'

export const useScrollDirection = (
  velocityUp = 0,
  velocityDown = 0,
  velocityMode: "time-sensitive" | "none" = "none",
  reset = 0
) => {
  const { scrollDirection, updateScrollDirection } = useBoundStore()
  const { scroll } = useBoundStore()

  useEffect(() => {
    const { scrollY: currentScrollY } = scroll
    const { previousScrollY, previousTimestamp } = scrollDirection

    // Calculate velocity
    const velocity = calculateScrollVelocity({
      currentScrollY,
      previousScrollY,
      previousTimestamp,
      mode: velocityMode
    })

    // Update direction
    updateScrollDirection(currentScrollY, velocityUp, velocityDown, velocityMode, reset)
  }, [scroll.scrollY, velocityUp, velocityDown, velocityMode, reset])

  return {
    isScrollingDown: scrollDirection.isScrollingDown,
    velocity: scrollDirection.velocity
  }
}