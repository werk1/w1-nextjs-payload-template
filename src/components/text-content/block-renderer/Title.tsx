import { TitleBlock } from './types/blockRendererTypes'
import styles from './styles/BlockRenderer.module.css'
import { JSX } from 'react'


export const Title: React.FC<TitleBlock> = ({ text, level }) => {
  const Tag = level as keyof JSX.IntrinsicElements
  return <Tag className={styles[level]}>{text}</Tag>
}