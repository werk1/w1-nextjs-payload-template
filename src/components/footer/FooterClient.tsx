'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useRemainingSpace } from '../../hooks/useRemainingSpace'

interface FooterClientProps {
  children: React.ReactNode
  className: string
}

const FooterClient = forwardRef<{ getRemainingSpace: () => number }, FooterClientProps>(
  ({ children, className }, ref) => {
    const footerRef = useRef<HTMLDivElement>(null)
    const remainingSpace = useRemainingSpace(footerRef as React.RefObject<HTMLElement>)

    useImperativeHandle(ref, () => ({
      getRemainingSpace: () => remainingSpace.current,
    }))

    return (
      <footer ref={footerRef} className={className}>
        {children}
      </footer>
    )
  },
)

FooterClient.displayName = 'FooterClient'
export default FooterClient
