import { StateCreator } from 'zustand'
import { calculateScrollVelocity } from './utils/calculateScrollVelocity'

export interface ScrollDirectionSlice {
  scrollDirection: {
    isScrollingDown: boolean
    previousScrollY: number
    previousTimestamp: number
    velocity: number
  }
  updateScrollDirection: (
    currentScrollY: number,
    velocityUp?: number,
    velocityDown?: number,
    velocityMode?: "time-sensitive" | "none",
    reset?: number,
    velocity?: number
  ) => void
}

export const createScrollDirectionSlice: StateCreator<ScrollDirectionSlice> = (set, get) => ({
  scrollDirection: {
    isScrollingDown: false,
    velocity: 0,
    previousScrollY: 0,
    previousTimestamp: typeof performance !== 'undefined' ? performance.now() : 0
  },

  updateScrollDirection: (
    currentScrollY: number,
    velocityUp = 0,
    velocityDown = 0,
    velocityMode = "none",
    reset = 0
  ) => {
    const { previousScrollY, previousTimestamp } = get().scrollDirection

    const velocity = calculateScrollVelocity({
      currentScrollY,
      previousScrollY,
      previousTimestamp,
      mode: velocityMode
    })

    let isScrollingDown = get().scrollDirection.isScrollingDown

    if (currentScrollY > previousScrollY && velocity >= velocityDown) {
      isScrollingDown = true
    } else if (currentScrollY < previousScrollY && velocity >= velocityUp) {
      isScrollingDown = false
    }

    if (currentScrollY <= reset) {
      isScrollingDown = false
    }

    set({
      scrollDirection: {
        isScrollingDown,
        velocity,
        previousScrollY: currentScrollY,
        previousTimestamp: performance.now()
      }
    })
  }
})