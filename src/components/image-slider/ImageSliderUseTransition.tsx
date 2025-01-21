import { useTransition, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageSliderUseTransition.module.css';

interface Slide {
	src: string | StaticImageData;
	alt: string;
	type?: 'local';
	width?: number;
	height?: number;
}

interface ImageSliderProps {
	slides: Slide[];
	width?: number;
}

export const ImageSliderUseTransition = ({ slides }: ImageSliderProps) => {
	const [ index, setIndex ] = useState(0);
	const [ direction, setDirection ] = useState(0); // Track slide direction
	const AnimatedDiv = animated('div');

	const transitions = useTransition(index, {
		from: {
			opacity: 0,
			transform: `translate3d(${direction >= 0 ? '100%' : '-100%'},0,0)`
		},
		enter: {
			opacity: 1,
			transform: 'translate3d(0%,0,0)'
		},
		leave: {
			opacity: 0,
			transform: `translate3d(${direction >= 0 ? '-100%' : '100%'},0,0)`
		},
		config: {
			mass: 3,
			tension: 270,
			friction: 32
		}
	});

	const bind = useGesture({
		onDrag: ({ movement: [ mx ], velocity: [ vx ], direction: [ dx ], down }) => {
			if (!down) {
				const trigger = Math.abs(mx) > 50 || Math.abs(vx) > 0.5;
				if (trigger) {
					const newDirection = dx > 0 ? -1 : 1;
					setDirection(newDirection);
					const newIndex = clamp(index + newDirection, 0, slides.length - 1);
					setIndex(newIndex);
				}
			}
		}
	});

	return (
		<div className={styles.container}>
			{transitions((style, i) => (
				<AnimatedDiv
					{...bind()}
					className={styles.slide}
					style={style} // Spring transitions need inline style
				>
					<Image src={slides[i].src} alt={slides[i].alt} fill className={styles.image} priority={i === 0} />
				</AnimatedDiv>
			))}

			<div className={styles.dotsContainer}>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setIndex(i)}
						className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
					/>
				))}
			</div>
		</div>
	);
};

// Helper function
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
