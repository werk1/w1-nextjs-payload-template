'use server';

import { getMediaSlides } from '../utils/getMediaSlides';
import { Slide } from '@/components/image-slider/types/typesImageSlider';

export type SlidesResponse = {
  slides: Slide[];
  error?: never;
} | {
  slides?: never;
  error: string;
};

export async function getSlides(): Promise<SlidesResponse> {
  try {
    const slides = await getMediaSlides();
    return { slides };
  } catch (error) {
    console.error('Error fetching slides:', error);
    return { error: 'Failed to fetch slides' };
  }
}
