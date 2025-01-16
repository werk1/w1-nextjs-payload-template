'use client';

import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import styles from '@/styles/modules/Layout.module.css';
import stylesContent from '@/styles/modules/Content.module.css';
import Header from '@/components/header/Header';
import { useBoundStore } from '@/stores/boundStore';
import { SectionTwo } from '@/components/page-one/SectionTwo';

export enum HeaderPosition {
	Center = 'center',
	Left = 'left',
	Right = 'right'
  }

  
export default function HomePage() {
	const headerPosition: HeaderPosition = HeaderPosition.Center;
	const isHeaderLeft = true;
	const contentScrollMode = false;
	const { isPhonePortrait, isPhoneLandscape, isDesktop } = useBoundStore((state) => state.device);

	const classContent = (() => {
		if (isPhoneLandscape && headerPosition === HeaderPosition.Left as HeaderPosition) return stylesContent.contentMobileLandscapeLeft;
		if (isPhoneLandscape && headerPosition === HeaderPosition.Right as HeaderPosition) return stylesContent.contentMobileLandscapeRight;
		if (isPhoneLandscape && headerPosition === HeaderPosition.Center as HeaderPosition) return stylesContent.contentMobileLandscape;
		if (isPhonePortrait) return stylesContent.contentMobilePortrait;
		if (isDesktop && contentScrollMode) return stylesContent.contentDesktopContentScroll;
		if (isDesktop && !contentScrollMode) return stylesContent.contentDesktopPageScroll;
		return stylesContent.contentDesktopPageScroll; // default fallback
	})();

	return (
		<div className={classContent}>
			<Header hideHeaderOnContentScroll={false} isHeaderLeft={isHeaderLeft} headerPosition={headerPosition} />
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
		</div>
	);
}
