/**
 * Calculates the scroll velocity from the given scroll position.
 * Returns the scroll velocity in pixels per second, capped at 100px.
 *
 * @param {number} scrollPosition The current scroll position
 * @param {number} previousScrollPosition The previous scroll position
 * @param {number} previousTimestamp The previous timestamp
 * @param {string} [mode="none"] - The mode of calculation:
 *   - `"time-sensitive"`: Uses timestamp to calculate velocity in pixels per second. Not clamped.
 *   - `"none"`: Uses scroll delta, mapped to range between 0 - 1.
 * @returns {number} The scroll velocity
 */
export const calculateScrollVelocity = ({
  currentScrollY,
  previousScrollY,
  previousTimestamp,
  mode = "none"
}: {
  currentScrollY: number
  previousScrollY: number
  previousTimestamp: number
  mode: "time-sensitive" | "none"
}): number => {
  if (mode === "none") {
    // Calculate the scroll velocity based on the scroll delta
    const delta = Math.abs(currentScrollY - previousScrollY)
    return Math.min(delta, 100) * 0.01
  } else if (mode === "time-sensitive") {
    // Calculate the scroll velocity based on the scroll delta and timestamp
    const delta = Math.abs(currentScrollY - previousScrollY)
    const timeDelta = performance.now() - previousTimestamp
    return delta / timeDelta
  }

  throw new Error(`Invalid mode: ${mode}`)
}