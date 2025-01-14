import styles from '@/styles/modules/Layout.module.css'
import { yourFont } from '@/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={yourFont.variable}>
      <body>
        <div className={styles.container}>
          <header className={styles.header}>{/* Header content */}</header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>{/* Footer content */}</footer>
        </div>
      </body>
    </html>
  )
}
