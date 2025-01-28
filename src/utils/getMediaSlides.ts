import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Media } from '@/payload-types';
import { Slide } from '@/components/image-slider/types/typesImageSlider';

/**
 * Fetches media slides from Payload CMS
 * @returns Promise<Slide[]> Array of slides with optimized images
 */
export async function getMediaSlides(): Promise<Slide[]> {
  const payload = await getPayload({
    config: configPromise,
  });

  const mediaResponse = await payload.find({
    collection: 'media',
    depth: 0,
  });

  return mediaResponse.docs.map((doc: Media): Slide => ({
    type: 'payload' as const,
    image: {
      id: String(doc.id),
      url: doc.sizes?.slider?.url || doc.url || '',
      fileName: doc.filename || '',
      mimeType: doc.mimeType || '',
      fileSize: doc.filesize || 0,
      alt: doc.alt,
      width: doc.sizes?.slider?.width || doc.width || 0,
      height: doc.sizes?.slider?.height || doc.height || 0,
    },
    title: doc.title || undefined,
    description: doc.description || undefined,
  }))
}
