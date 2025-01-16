'use client';

import { RemainingSpaceTracker } from '@/stores/remaining-space';
import { ReactNode } from 'react';
import styles from '../../styles/modules/Footer.module.css';
import { useBoundStore } from '@/stores/boundStore';
import FillBottomSpace from '@/components/footer/FillBottomSpace';

interface FooterProps {
	children: ReactNode;
	className?: string;
}

const Footer = ({ children }: FooterProps) => {
	const { isPhonePortrait, isPhoneLandscape, isDesktop } = useBoundStore((state) => state.device);
	const classFooter = isPhonePortrait
		? styles.layoutMobilePortrait
		: isPhoneLandscape ? styles.layoutMobileLandscapeCenter : styles.layoutDesktop;

	return (
		<div>
			<RemainingSpaceTracker />
			<div className={classFooter}>{children}</div>
			{isDesktop && <FillBottomSpace />}
		</div>
	);
};

Footer.displayName = 'Footer';
export default Footer;
