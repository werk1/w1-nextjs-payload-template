import styles from '@/styles/modules/Layout.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Application</h1>

      <section>
        <h2>About</h2>
        <p className={styles.text}>
          This is your landing page. Customize this content to match your needs.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Payload CMS Integration</li>
          <li>Next.js App Router</li>
          <li>TypeScript Support</li>
          <li>Custom Font Integration</li>
        </ul>
      </section>
    </div>
  )
}
