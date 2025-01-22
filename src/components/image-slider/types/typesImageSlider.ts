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

// Control styles interface
export interface ImageSliderControlStyles {
  arrow?: string;
  prev?: string;
  next?: string;
  dotsContainer?: string;
  dot?: string;
  dotActive?: string;
}

// Description styles interface
export interface ImageSliderDescriptionStyles {
  descriptionContainer?: string;  // Changed from container
  descriptionTitle?: string;      // Changed from title
  descriptionText?: string;       // Changed from text
}

// Combined type
export type Slide = LocalSlide | PayloadSlide;

// Base props interface
export interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

// Extended props interface with control styles
export interface ImageSliderPropsWithControls extends ImageSliderProps {
  controlStyles?: ImageSliderControlStyles;
}

