import { StateCreator } from 'zustand'

export interface ScrollSlice {
  scroll: {
    scrollY: number
    scrollYClamped: number
    maxScrollY: number
    maxScrollYClamped: number
  }
  updateScroll: () => void
}

export const createScrollSlice: StateCreator<ScrollSlice> = (set) => ({
  scroll: {
    scrollY: 0,
    scrollYClamped: 0,
    maxScrollY: 0,
    maxScrollYClamped: 0,
  },
  updateScroll: () => {
    if (typeof window === 'undefined') return

    const scrollY = window.scrollY
    const maxScrollY = document.body.scrollHeight - window.innerHeight
    const footerTabHeight = window.screen.availHeight - window.innerHeight
    const maxScrollYClamped = document.body.offsetHeight - window.innerHeight - footerTabHeight

    set((state) => ({
      scroll: {
        scrollY,
        scrollYClamped: Math.min(Math.max(scrollY, 0), maxScrollYClamped),
        maxScrollY,
        maxScrollYClamped,
      }
    }))
  },
})