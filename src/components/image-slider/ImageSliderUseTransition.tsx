import { useTransition, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './styles/ImageSliderUseTransition.module.css';
import { ImageSliderProps } from './types/typesImageSlider';
import { getImageProps, clamp } from './utils/utilsImageSlider';
import { SliderControls } from './components/ImageSliderControls';
import { useSliderAutoplay } from './hooks/useSliderAutoplay';
import { SlideContent } from './components/ImageSliderContent';

export const ImageSliderUseTransition = ({
	slides,
	autoPlay = false,
	autoPlayInterval = 5000,
	showDots = true,
	showArrows = false,
	className = ''
}: ImageSliderProps) => {
	const [ index, setIndex ] = useState(0);
	const [ direction, setDirection ] = useState(0);
	const [ isAutoPlaying, setIsAutoPlaying ] = useState(autoPlay);
	const AnimatedDiv = animated('div');

	const nextSlide = useCallback(
		() => {
			setDirection(1);
			setIndex((prev) => (prev + 1) % slides.length);
		},
		[ slides.length ]
	);

	const previousSlide = useCallback(
		() => {
			setDirection(-1);
			setIndex((prev) => (prev - 1 + slides.length) % slides.length);
		},
		[ slides.length ]
	);

	useSliderAutoplay(nextSlide, isAutoPlaying, autoPlayInterval);

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
		<div
			className={`${styles.container} ${className}`}
			onMouseEnter={() => setIsAutoPlaying(false)}
			onMouseLeave={() => setIsAutoPlaying(true)}
		>
			{transitions((style, i) => {
				const imageProps = getImageProps(slides[i]);

				return (
					<AnimatedDiv {...bind()} className={styles.slide} style={style}>
						<Image
							src={imageProps.src}
							alt={imageProps.alt}
							fill
							className={styles.image}
							priority={i === 0}
						/>
						<SlideContent slide={slides[i]} />
					</AnimatedDiv>
				);
			})}

			<SliderControls
				onNext={nextSlide}
				onPrevious={previousSlide}
				onDotClick={(i) => {
					setDirection(i > index ? 1 : -1);
					setIndex(i);
				}}
				currentIndex={index}
				totalSlides={slides.length}
				showDots={showDots}
				showArrows={showArrows}
			/>

			<div className={styles.progress}>
				<div
					className={styles.progressBar}
					style={{
						width: `${(index + 1) / slides.length * 100}%`
					}}
				/>
			</div>
		</div>
	);
};
