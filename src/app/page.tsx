import styles from '@/styles/modules/Layout.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Application</h1>

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
  )
}
