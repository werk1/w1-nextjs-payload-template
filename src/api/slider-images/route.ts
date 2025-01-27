import payload from 'payload'
import { Slide } from '@/components/image-slider/types/typesImageSlider'
import configPromise from '@/payload.config'

export const GET = async () => {
  try {
    await payload.init({
      config: configPromise,
    })

    const media = await payload.find({
      collection: 'media',
      limit: 10,
      // Add public access
      overrideAccess: true,
    })

    const slides: Slide[] = media.docs.map((doc: any): Slide => ({
      type: 'payload',
      image: {
        id: String(doc.id),
        url: doc.url || '',
        alt: doc.alt || 'Slider image',
        width: doc.width || 1920,
        height: doc.height || 1080,
      },
      title: doc.title || undefined,
      description: doc.description || undefined,
    }))

    return Response.json(slides)
  } catch (error) {
    console.error('Error fetching slider images:', error)
    return Response.json({ error: 'Failed to fetch slider images' }, { status: 500 })
  }
}