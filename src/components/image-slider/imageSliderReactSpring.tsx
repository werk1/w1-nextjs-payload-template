import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageSliderReactSpring.module.css';

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

export const ImageSliderReactSpring = ({ slides }: ImageSliderProps) => {
	const [ index, setIndex ] = useState(0);
	const sliderWidth = useRef(0);
	const sliderRef = useRef<HTMLDivElement>(null);
	const AnimatedDiv = animated('div');

	const [ { x }, api ] = useSpring(() => ({
		x: 0,
		config: {
			tension: 270,
			friction: 32,
			precision: 0.01
		}
	}));

	const bind = useGesture(
		{
			onDrag: ({ down, movement: [ mx ], velocity: [ vx ], direction: [ dx ] }) => {
				const currentX = -index * sliderWidth.current;

				if (down) {
					api.start({
						x: currentX + mx,
						immediate: true
					});
				} else {
					const trigger = Math.abs(mx) > sliderWidth.current * 0.2 || Math.abs(vx) > 0.5;

					if (trigger) {
						const newIndex = clamp(index + (dx > 0 ? -1 : 1), 0, slides.length - 1);
						setIndex(newIndex);

						api.start({
							x: -newIndex * sliderWidth.current,
							config: {
								velocity: vx,
								tension: 270,
								friction: 32
							}
						});
					} else {
						api.start({
							x: currentX,
							config: {
								velocity: vx,
								tension: 270,
								friction: 32
							}
						});
					}
				}
			}
		},
		{
			drag: {
				axis: 'x', // Only track horizontal movement
				filterTaps: true,
				rubberband: true
			},
			touchAction: 'pan-y' // Allow vertical scrolling
		}
	);

	useEffect(() => {
		const updateWidth = () => {
			if (sliderRef.current) {
				sliderWidth.current = sliderRef.current.offsetWidth;
			}
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	return (
		<div className={styles.container} ref={sliderRef}>
			<AnimatedDiv
				{...bind()}
				className={styles.slider}
				style={{ x }} // Spring animation needs inline style
			>
				{slides.map((slide, i) => (
					<div key={i} className={styles.slide}>
						<Image src={slide.src} alt={slide.alt} fill className={styles.image} priority={i === 0} />
					</div>
				))}
			</AnimatedDiv>

			<div className={styles.dotsContainer}>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => {
							setIndex(i);
							api.start({
								x: -i * sliderWidth.current
							});
						}}
						className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
					/>
				))}
			</div>
		</div>
	);
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
