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

export type PayloadBlock = PayloadTitleBlock | PayloadTextBlock

export function transformBlocks(payloadBlocks: PayloadBlock[] | null): Block[] {
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
