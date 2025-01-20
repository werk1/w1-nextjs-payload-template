// Header Position
export type HeaderPosition = 'center' | 'left' | 'right';
export type ScrollMode = 'contentScroll' | 'pageScroll';

// Helper function to get CSS variables
const getCSSVariable = (variableName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  return '0';
};

// CSS Variables converted to numbers (remove 'px', 'rem', etc. and convert to number)
const parseCSSValue = (value: string): number => {
  const numericValue = parseFloat(value);
  return isNaN(numericValue) ? 0 : numericValue;
};


// export const HEADER_HEIGHT = 200;
// export const FOOTER_HEIGHT = 200;
export const HEADER_HEIGHT = parseCSSValue(getCSSVariable('--measure_header_height_mobile_portrait'));
export const FOOTER_HEIGHT = parseCSSValue(getCSSVariable('--measure_footer_height_mobile_portrait'));
export const HEADER_POSITION: HeaderPosition = 'center';
export const SCROLL_MODE: ScrollMode = 'pageScroll';

