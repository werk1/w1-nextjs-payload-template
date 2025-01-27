'use client';

import stylesTypography from '@/styles/modules/Typography.module.css';
import { useScrollDirection } from '@/stores/scroll-direction';

export function SectionTwo() {
	const { isScrollingDown } = useScrollDirection(0.33, 0.33, 'time-sensitive');
	return isScrollingDown ? (
		<h2 className={stylesTypography.mainTitle}>
			Beam <br />me up!
		</h2>
	) : (
		<h2 className={stylesTypography.mainTitle} style={{ color: 'rgba(130, 20, 20, 0.3)' }}>
			Bring me <br />down!
		</h2>
	);
}
