import { TextBlock } from './types/blockRendererTypes'
import styles from './styles/BlockRenderer.module.css'

export const TextBody: React.FC<TextBlock> = ({ content, variant }) => {
  return (
    <div className={`${styles.textBody} ${styles[variant]}`}>
      {content}
    </div>
  )
}