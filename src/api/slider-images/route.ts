import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Slide } from '@/components/image-slider/types/typesImageSlider'

export const GET = async (req: Request) => {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const mediaResponse = await payload.find({
      collection: 'media',
      limit: 10,
      depth: 0,
      overrideAccess: true, // Use this instead of local
    })

    console.log('Media response:', mediaResponse)

    const slides: Slide[] = mediaResponse.docs.map((doc: any) => ({
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
    console.error('Error in slider-images route:', error)
    return Response.json({ error: 'Failed to fetch slider images' }, { status: 500 })
  }
}