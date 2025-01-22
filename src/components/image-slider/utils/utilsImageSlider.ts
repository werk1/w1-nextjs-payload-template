import { ImageProps } from 'next/image';
import { Slide } from '../types/typesImageSlider';

type RequiredImageProps = {
  src: ImageProps['src'];
  alt: string;
};

export const getImageProps = (slide: Slide): RequiredImageProps => {
  if (slide.type === 'local') {
    return {
      src: slide.src,
      alt: slide.alt,
    };
  }
  return {
    src: slide.image.url,
    alt: slide.image.alt,
  };
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);