import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import styles from '@/styles/modules/Layout.module.css';
// import FillBottomSpace from '@/components/footer/FillBottomSpace'
import Header from '@/components/header/Header';
// import { useBoundStore } from '@/stores/boundStore'
import { SectionTwo } from '@/components/page-one/SectionTwo';

export default function HomePage() {
	// const isDesktop = useBoundStore((state) => state.device.isDesktop)

	return (
		<div>
			<Header hideHeaderOnContentScroll={false} isHeaderLeft={true} />
			<div className={styles.container}>
				<h1 className={styles.mainTitle}>
					Welcome <br /> to Your <br /> new App
				</h1>
				<section>
					<SectionTwo />
					<h2 className={styles.title}>
						Some things <br />about
					</h2>
					<p className={styles.text}>
						This is your landing page. Customize this content to match your needs.
					</p>
					<h2 className={styles.title}>Features</h2>
					<ul className={styles.list}>
						<li className={styles.listItem}>Payload CMS Integration</li>
						<li className={styles.listItem}>Next.js App Router</li>
						<li className={styles.listItem}>TypeScript Support</li>
						<li className={styles.listItem}>Custom Font Integration</li>
					</ul>
					<h2 className={styles.title}>
						You don't <br />know!
					</h2>
				</section>
			</div>
			<Footer>
				<FooterIcons />
			</Footer>
			{/* {isDesktop && (
        <FillBottomSpace />
      )} */}
		</div>
	);
}
