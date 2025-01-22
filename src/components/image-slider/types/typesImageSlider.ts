import { StaticImageData } from 'next/image';

// Base interfaces
interface BaseSlide {
  title?: string;
  description?: string;
}

// Local data interface
interface LocalSlide extends BaseSlide {
  type: 'local';
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

// Payload data interface
interface PayloadImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface PayloadSlide extends BaseSlide {
  type: 'payload';
  image: PayloadImage;
}

// Combined type
export type Slide = LocalSlide | PayloadSlide;

export interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean; // Add this prop
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}