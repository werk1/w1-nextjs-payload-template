'use client';

import styles from '../../styles/modules/Content.module.css';
import { useBoundStore } from '@/stores/boundStore';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	const isHeaderLeft = true;
	const contentScrollMode = true;

	const classContent = (() => {
		const { isPhonePortrait, isPhoneLandscape, isDesktop } = useBoundStore((state) => state.device);
		if (isPhoneLandscape && isHeaderLeft) return styles.contentMobileLandscapeLeft;
		if (isPhoneLandscape) return styles.contentMobileLandscapeRight;
		if (isPhonePortrait) return styles.contentMobilePortrait;
		if (isDesktop && contentScrollMode) return styles.contentDesktopContentScroll;
		if (isDesktop && !contentScrollMode) return styles.contentDesktopPageScroll;

		return styles.contentDesktopPageScroll;
	})();
	return (
		<div className={classContent}>
			<main>{children}</main>
		</div>
	);
}
