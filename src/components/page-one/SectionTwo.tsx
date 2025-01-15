'use client';

import styles from '@/styles/modules/Layout.module.css';
import { useBoundStore } from '@/stores/boundStore';

export function SectionTwo() {
	const contentIsScrollingDown = useBoundStore((state) => state.scrollDirection.isScrollingDown);

	return contentIsScrollingDown ? (
		<h2 className={styles.mainTitle}>
			Beam <br />me up!
		</h2>
	) : (
		<h2 className={styles.mainTitle}>
			Bring me <br />down!
		</h2>
	);
}
