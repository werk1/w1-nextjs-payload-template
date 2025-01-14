'use client'

import Footer from '@/components/footer/Footer'
import FooterIcons from '@/components/footer/FooterIcons'
import styles from '@/styles/modules/Layout.module.css'
import { DeviceContext } from '@/context/DeviceContext'
import { useContext, useRef } from 'react'
import FillBottomSpace from '@/components/footer/FillBottomSpace'

export default function HomePage() {
  const deviceInfo = useContext(DeviceContext)
  const footerRef = useRef<{ getRemainingSpace: () => number }>(null) // Create a ref

  const { isDesktop } = deviceInfo ?? {}

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>
          Welcome <br /> to Your <br /> Application
        </h1>

        <section>
          <h2 className={styles.title}>About</h2>
          <p className={styles.text}>
            This is your landing page. Customize this content to match your needs.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>Features</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Payload CMS Integration</li>
            <li className={styles.listItem}>Next.js App Router</li>
            <li className={styles.listItem}>TypeScript Support</li>
            <li className={styles.listItem}>Custom Font Integration</li>
          </ul>
        </section>
      </div>
      <Footer ref={footerRef}>
        <FooterIcons />
      </Footer>
      {isDesktop && (
        <FillBottomSpace
          height={footerRef.current?.getRemainingSpace ? footerRef.current.getRemainingSpace() : 0}
        ></FillBottomSpace>
      )}
    </div>
  )
}
