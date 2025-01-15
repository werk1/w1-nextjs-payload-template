import { RemainingSpaceTracker } from '@/stores/remaining-space'
import { ReactNode } from 'react'
import styles from '../../styles/modules/Footer.module.css'
import { useBoundStore } from '@/stores/boundStore'

interface FooterProps {
  children: ReactNode
  className?: string
}

const Footer = ({ children }: FooterProps) => {
  const deviceInfo = useBoundStore((state) => state.device)
  const { isPhonePortrait, isPhoneLandscape } = deviceInfo ?? {}

  const classFooter = isPhonePortrait
   ? styles.layoutMobilePortrait
   : isPhoneLandscape
     ? styles.layoutMobileLandscape
     : styles.layoutDesktop

  return (
    <>
      <RemainingSpaceTracker />
      <footer className={classFooter}>
        {children}
      </footer>
    </>
  )
}
Footer.displayName = 'Footer'
export default Footer
