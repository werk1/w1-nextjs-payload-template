import styles from '../../styles/modules/Footer.module.css'
import { DeviceContext } from '../../context/DeviceContext'
import { forwardRef, useContext } from 'react'
import FooterClient from './FooterClient'

interface FooterProps {
  children?: React.ReactNode
}

const Footer = forwardRef<{ getRemainingSpace: () => number }, FooterProps>(({ children }, ref) => {
  const deviceInfo = useContext(DeviceContext)
  const { isPhonePortrait, isPhoneLandscape } = deviceInfo ?? {}

  const classFooter = isPhonePortrait
    ? styles.layoutMobilePortrait
    : isPhoneLandscape
      ? styles.layoutMobileLandscape
      : styles.layoutDesktop

  return (
    <FooterClient ref={ref} className={classFooter}>
      {children}
    </FooterClient>
  )
})

Footer.displayName = 'Footer'
export default Footer
