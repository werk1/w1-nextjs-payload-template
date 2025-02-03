'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Block } from '@/components/text-content/block-renderer/types/blockRendererTypes'
import { transformBlocks, PayloadBlock } from '../utils/textContentTransform'

export type TextContentResponse =
  | {
      content: Block[]
      error?: never
    }
  | {
      content?: never
      error: string
    }

export async function getTextContent(identifier: string): Promise<TextContentResponse> {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const content = await payload.find({
      collection: 'text-content',
      where: {
        identifier: { equals: identifier },
      },
      depth: 1,
    })

    if (!content?.docs?.length) {
      return { content: [] }
    }

    const blocks = content.docs[0].blocks
    const transformedBlocks = transformBlocks(blocks as PayloadBlock[])

    return { content: transformedBlocks }
  } catch (error) {
    console.error('Error fetching content:', error)
    return { error: 'Failed to fetch content' }
  }
}
