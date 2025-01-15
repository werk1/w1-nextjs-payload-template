import { StateCreator } from 'zustand'

export interface RemainingSpaceSlice {
  remainingSpace: {
    value: number
  }
  updateRemainingSpace: () => void
}

export const createRemainingSpaceSlice: StateCreator<RemainingSpaceSlice> = (set) => ({
  remainingSpace: {
    value: 0
  },
  updateRemainingSpace: () => {
    if (typeof window === 'undefined') return

    const footer = document.querySelector('footer')
    const innerHeight = window.innerHeight

    if (footer) {
      const rect = footer.getBoundingClientRect()
      set({
        remainingSpace: {
          value: Math.max(0, innerHeight - rect.bottom)
        }
      })
    }
  }
})