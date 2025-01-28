import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Slide } from '@/components/image-slider/types/typesImageSlider'
import { Media } from '@/payload-types'

export const GET = async () => {
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

    const slides: Slide[] = mediaResponse.docs.map((doc: Media) => ({
      type: 'payload',
      image: {
        id: String(doc.id),
        url: doc.url || '',
        filename: doc.filename || '',
        mimeType: doc.mimeType || '',
        filesize: doc.filesize || 0,
        alt: doc.alt || 'Slider image',
        width: doc.width || 1920,
        height: doc.height || 1080,

      },
      title: doc.title || undefined,
      description: doc.description || undefined,
    }))

    console.log('Slides:', slides)
    return Response.json(slides)
  } catch (error) {
    console.error('Error in slider-images route:', error)
    return Response.json({ error: 'Failed to fetch slider images' }, { status: 500 })
  }
}