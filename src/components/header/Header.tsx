'use client';

import styles from '../../styles/modules/Header.module.css';
import { useSpring, animated } from '@react-spring/web';
import { useBoundStore } from '@/stores/boundStore';
import { useScrollDirection } from '@/stores/scroll-direction';
import { HEADER_HEIGHT } from '@/styles/constants/constants';
// import { useResponsiveClass } from '@/styles/components/getResponsiveCless';

// Create a properly typed animated header component
const AnimatedHeader = animated('header');

type HeaderPosition = 'center' | 'left' | 'right';

export type HeaderProps = {
	hideHeaderOnContentScroll: boolean;
	isHeaderLeft: boolean;
	children?: React.ReactNode;
	headerPosition: HeaderPosition;
};

/**
 * Header component that adapts to different device types and scroll behavior.
 */
function Header(props: HeaderProps) {
	const { isPhonePortrait, isPhoneLandscape, isDesktop } = useBoundStore((state) => state.device);
	const { isScrollingDown } = useScrollDirection(
		0.33, // velocityUp
		0.33, // velocityDown
		'time-sensitive' // velocityMode
	);

	// Determine base header class based on device type and orientation
	let baseHeader = styles.baseDesktop; // default value

	if (isPhoneLandscape && props.headerPosition === 'left') {
		baseHeader = styles.baseMobileLandscape;
	} else if (isPhoneLandscape && props.headerPosition === 'right') {
		baseHeader = styles.baseRightMobileLandscape;
	} else if (isPhonePortrait) {
		baseHeader = styles.baseMobilePortrait;
	} else if (isPhoneLandscape && props.headerPosition === 'center') {
		baseHeader = styles.baseMobileLandscape;
	}

	// const baseHeader = useResponsiveClass({
	// 	phonePortrait: styles.baseMobilePortrait,
	// 	phoneLandscapeLeft: styles.baseLeftMobileLandscape,
	// 	phoneLandscapeRight: styles.baseRightMobileLandscape,
	// 	desktop: styles.baseDesktop,
	// 	isHeaderLeft: props.isHeaderLeft,
	// 	contentScrollMode: props.hideHeaderOnContentScroll,
	// 	defaultClass: styles.baseDesktop
	// });

	// Configure spring animation for header visibility
	const animated_top_style = useSpring(
		isPhoneLandscape
			? {
					top: isScrollingDown ? -HEADER_HEIGHT * 1.2 : 0,
					height: isScrollingDown ? 0 : HEADER_HEIGHT,
					opacity: !isScrollingDown ? 0.7 : 0,
					config: {
						mass: 4,
						tension: 133,
						friction: 22,
						clamp: false
					}
				}
			: {
					top: isScrollingDown ? -HEADER_HEIGHT * 1.2 : 0,
					// height: isScrollingDown ? 0 : HEADER_HEIGHT,
					opacity: !isScrollingDown ? 0.7 : 0,
					config: {
						mass: 4,
						tension: 133,
						friction: 22,
						clamp: false
					}
				}
	);

	return (
		<AnimatedHeader role="header" className={baseHeader} style={animated_top_style}>
			{props.children}
		</AnimatedHeader>
	);
}

export default Header;
