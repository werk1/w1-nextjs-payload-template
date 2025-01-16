import { RemainingSpaceTracker } from '@/stores/remaining-space';
import { ReactNode } from 'react';
import FillBottomSpace from '@/components/footer/FillBottomSpace';

interface FooterProps {
	children: ReactNode;
	footerClass: string;
	isDesktop: boolean;
}

const Footer = ({ children, footerClass, isDesktop }: FooterProps) => {
	return (
		<div>
			<RemainingSpaceTracker />
			<div className={footerClass}>{children}</div>
			{isDesktop && <FillBottomSpace />}
		</div>
	);
};

Footer.displayName = 'Footer';
export default Footer;
