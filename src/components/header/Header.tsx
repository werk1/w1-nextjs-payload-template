'use client';

import { useSpring, animated } from '@react-spring/web';
import { useScrollDirection } from '@/stores/scroll-direction';
import { HEADER_HEIGHT } from '@/styles/constants/constants';

type HeaderProps = {
	headerClass: string;
	children?: React.ReactNode;
};

const AnimatedHeader = animated('header');

export default function Header({ headerClass, children }: HeaderProps) {
	const { isScrollingDown } = useScrollDirection(0.33, 0.33, 'time-sensitive');

	const animated_top_style = useSpring({
		top: isScrollingDown ? -HEADER_HEIGHT * 1.2 : 0,
		// height: isScrollingDown ? 0 : HEADER_HEIGHT,
		opacity: !isScrollingDown ? 0.7 : 0,
		config: {
			mass: 4,
			tension: 133,
			friction: 22,
			clamp: false
		}
	});

	return (
		<AnimatedHeader role="header" className={headerClass} style={animated_top_style}>
			{children}
		</AnimatedHeader>
	);
}
