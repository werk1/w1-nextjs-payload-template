'use client';

import styles from '@/styles/modules/Layout.module.css';
import stylesTypography from '@/styles/modules/Typography.module.css';
import { useBoundStore } from '@/stores/boundStore';

export function SectionTwo() {
	const contentIsScrollingDown = useBoundStore((state) => state.scrollDirection.isScrollingDown);

	return contentIsScrollingDown ? (
		<h2 className={stylesTypography.mainTitle}>
			Beam <br />me up!
		</h2>
	) : (
		<h2 className={stylesTypography.mainTitle} style={{ color: 'rgba(130, 20, 20, 0.3)' }}>
			Bring me <br />down!
		</h2>
	);
}
