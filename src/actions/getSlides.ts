'use server';

import { getMediaSlides } from '../utils/getMediaSlides';
import { Slide } from '@/components/image-slider/types/typesImageSlider';

export type SlidesResponse = {
  topSlides: Slide[];
  bottomSlides: Slide[];
  error?: never;
} | {
  topSlides?: never;
  bottomSlides?: never;
  error: string;
};

export async function getSlides(): Promise<SlidesResponse> {
  try {
    const [topSlides, bottomSlides] = await Promise.all([
      getMediaSlides('slider-top'),
      getMediaSlides('slider-bottom'),
    ]);
    return { topSlides, bottomSlides };
  } catch (error) {
    console.error('Error fetching slides:', error);
    return { error: 'Failed to fetch slides' };
  }
}
