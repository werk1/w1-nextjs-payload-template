import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Media } from '@/payload-types';
import { Slide } from '@/components/image-slider/types/typesImageSlider';

export async function getMediaSlides(): Promise<Slide[]> {
  const payload = await getPayload({
    config: configPromise,
  });

  const mediaResponse = await payload.find({
    collection: 'media',
    limit: 10,
    depth: 0,
  });

  return mediaResponse.docs.map((doc: Media): Slide => ({
    type: 'payload' as const,
    image: {
      id: String(doc.id),
      url: doc.url || '',
      filename: doc.filename || '',
      mimeType: doc.mimeType || '',
      filesize: doc.filesize || 0,
      alt: doc.alt,
      width: doc.width || 0,
      height: doc.height || 0,
    },
    title: doc.title || undefined,
    description: doc.description || undefined,
  }))
