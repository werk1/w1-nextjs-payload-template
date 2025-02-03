import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type {
  Block,
  TitleBlock,
  TextBlock,
} from '@/components/text-content/block-renderer/types/blockRendererTypes'

// Define the expected Payload block types
interface PayloadBaseBlock {
  id?: string | null
  blockType: string
}

interface PayloadTitleBlock extends PayloadBaseBlock {
  blockType: 'title'
  text: string
  level?: 'h1' | 'h2' | 'h3' | null
}

interface PayloadTextBlock extends PayloadBaseBlock {
  blockType: 'textBody'
  content: string
  variant?: 'standard' | 'highlight' | 'small' | null
}

type PayloadBlock = PayloadTitleBlock | PayloadTextBlock

function transformBlocks(payloadBlocks: PayloadBlock[] | null): Block[] {
  if (!payloadBlocks) return []

  return payloadBlocks.map((block) => {
    if (block.blockType === 'title') {
      return {
        id: block.id || String(Math.random()),
        blockType: 'title',
        text: block.text,
        level: block.level || 'h2',
      } as TitleBlock
    }

    return {
      id: block.id || String(Math.random()),
      blockType: 'textBody',
      content: String(block.content || ''),
      variant: block.variant || 'standard',
    } as TextBlock
  })
}

export async function getBlockContent(identifier: string): Promise<Block[]> {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const content = await payload.find({
      collection: 'text-content',
      where: {
        and: [{ identifier: { equals: identifier } }, { type: { equals: 'blocks' } }],
      },
    })

    if (!content?.docs?.length) {
      return []
    }

    return transformBlocks(content.docs[0].blocks as PayloadBlock[])
  } catch (error) {
    console.error('Error fetching block content:', error)
    return []
  }
}
