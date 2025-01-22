import { useEffect, useRef } from 'react';

export const useSliderWidth = (sliderRef: React.RefObject<HTMLElement>) => {
  const sliderWidth = useRef(0);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        sliderWidth.current = sliderRef.current.offsetWidth;
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [sliderRef]);

  return sliderWidth;
};