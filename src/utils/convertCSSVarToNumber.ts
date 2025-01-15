export const getCSSVarAsNumber = (varName: string): number => {
  return Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .replace(/[^\d.-]/g, "")
  );
};