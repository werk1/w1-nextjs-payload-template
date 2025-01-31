import { BlockRendererProps } from './types/blockRendererTypes'
import { Title } from './Title'
import { TextBody } from './TextBody'
import styles from './styles/BlockRenderer.module.css'

export const BlockRenderer: React.FC<BlockRendererProps> = ({ content }) => {
  if (!content || content.length === 0) return null

  return (
    <div className={styles.wrapper}>
      {content.map((block) => {
        switch (block.blockType) {
          case 'title':
            return (
              <Title
                key={block.id}
                id={block.id}
                blockType={block.blockType}
                text={block.text}
                level={block.level}
              />
            )

          case 'textBody':
            return (
              <TextBody
                key={block.id}
                id={block.id}
                blockType={block.blockType}
                content={block.content}
                variant={block.variant}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}