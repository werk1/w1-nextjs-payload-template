export const getCSSVarAsNumber = (varName: string): number => {
  if (typeof window === 'undefined') return 0 // Return default during SSR

  return Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .replace(/[^\d.-]/g, "")
  )
}