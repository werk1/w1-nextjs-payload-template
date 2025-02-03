// Basic block types
export type BlockType = 'title' | 'textBody'

// Simple blocks without any complex types
export interface BaseBlock {
  id: string
  blockType: BlockType
}

export interface TitleBlock extends BaseBlock {
  blockType: 'title'
  text: string
  level: 'h1' | 'h2' | 'h3'
}

export interface TextBlock extends BaseBlock {
  blockType: 'textBody'
  content: string
  variant: 'standard' | 'highlight' | 'small'
}

export type Block = TitleBlock | TextBlock

export interface BlockRendererProps {
  content: Block[]
}
