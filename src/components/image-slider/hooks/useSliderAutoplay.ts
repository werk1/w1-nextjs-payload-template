import { useEffect } from "react";

export const useSliderAutoplay = (
  nextSlide: () => void,
  isAutoPlaying: boolean,
  interval: number
) => {
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, nextSlide]);
};