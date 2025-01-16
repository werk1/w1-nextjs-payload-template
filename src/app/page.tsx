'use client';
import styles from '@/styles/modules/Layout.module.css';
import { DeviceLayout } from '@/components/device-layout/DeviceLayout';
import { SectionTwo } from '@/components/landing-page/SectionTwo';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';

export default function LandingPage() {
	const { headerClass, footerClass, deviceState } = useDeviceLayout();

	return (
		<DeviceLayout>
			<Header headerClass={headerClass} />
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
						<li className={styles.listItemCustom}>Payload CMS Integration</li>
						<li className={styles.listItemCustom}>Next.js App Router</li>
						<li className={styles.listItemCustom}>TypeScript Support</li>
						<li className={styles.listItemCustom}>Custom Font Integration</li>
					</ul>
					<h2 className={styles.title}>
						You don't <br />know!
					</h2>
				</section>
			</div>
			<Footer footerClass={footerClass} isDesktop={deviceState.isDesktop}>
				<FooterIcons />
			</Footer>
		</DeviceLayout>
	);
}
