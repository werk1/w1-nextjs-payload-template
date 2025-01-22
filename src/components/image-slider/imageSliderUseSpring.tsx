import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './styles/ImageSliderUseSpring.module.css';
import { ImageSliderProps } from './types/typesImageSlider';
import { getImageProps, clamp } from './utils/utilsImageSlider';
import { SliderControls } from './components/ImageSliderControls';
import { useSliderAutoplay } from './hooks/useSliderAutoplay';
import { useSliderWidth } from './hooks/useImageSliderWidth';
import { SlideContent } from './components/ImageSliderContent';

export const ImageSliderUseSpring = ({
	slides,
	autoPlay = false,
	autoPlayInterval = 5000,
	showDots = true,
	showArrows = false,
	className = ''
}: ImageSliderProps) => {
	const [ index, setIndex ] = useState(0);
	const [ isAutoPlaying, setIsAutoPlaying ] = useState(autoPlay);
	const sliderRef = useRef<HTMLDivElement>(null);
	const sliderWidth = useSliderWidth(sliderRef as React.RefObject<HTMLElement>);
	const AnimatedDiv = animated('div');

	const [ { x }, api ] = useSpring(() => ({
		x: 0,
		config: {
			tension: 270,
			friction: 32,
			precision: 0.01
		}
	}));

	const nextSlide = useCallback(
		() => {
			const newIndex = (index + 1) % slides.length;
			setIndex(newIndex);
			api.start({
				x: -newIndex * sliderWidth.current
			});
		},
		[ index, slides.length, api, sliderWidth ]
	);

	const previousSlide = useCallback(
		() => {
			const newIndex = (index - 1 + slides.length) % slides.length;
			setIndex(newIndex);
			api.start({
				x: -newIndex * sliderWidth.current
			});
		},
		[ index, slides.length, api, sliderWidth ]
	);

	useSliderAutoplay(nextSlide, isAutoPlaying, autoPlayInterval);

	const bind = useGesture(
		{
			onDrag: ({ down, movement: [ mx ], velocity: [ vx ], direction: [ dx ] }) => {
				const currentX = -index * sliderWidth.current;
				if (down) {
					api.start({ x: currentX + mx, immediate: true });
				} else {
					const trigger = Math.abs(mx) > sliderWidth.current * 0.2 || Math.abs(vx) > 0.5;
					if (trigger) {
						const newIndex = clamp(index + (dx > 0 ? -1 : 1), 0, slides.length - 1);
						setIndex(newIndex);
						api.start({
							x: -newIndex * sliderWidth.current,
							config: { velocity: vx, tension: 270, friction: 32 }
						});
					} else {
						api.start({
							x: currentX,
							config: { velocity: vx, tension: 270, friction: 32 }
						});
					}
				}
			}
		},
		{
			drag: {
				axis: 'x',
				filterTaps: true,
				rubberband: true
			},
			touchAction: 'pan-y'
		}
	);

	return (
		<div
			className={`${styles.container} ${className}`}
			ref={sliderRef}
			onMouseEnter={() => setIsAutoPlaying(false)}
			onMouseLeave={() => setIsAutoPlaying(true)}
		>
			<AnimatedDiv {...bind()} className={styles.slider} style={{ x }}>
				{slides.map((slide, i) => {
					const imageProps = getImageProps(slide);
					return (
						<div key={i} className={styles.slide}>
							<Image
								src={imageProps.src}
								alt={imageProps.alt}
								fill
								className={styles.image}
								priority={i === 0}
							/>
							<SlideContent slide={slide} />
						</div>
					);
				})}
			</AnimatedDiv>

			<SliderControls
				onNext={nextSlide}
				onPrevious={previousSlide}
				onDotClick={(i) => {
					setIndex(i);
					api.start({ x: -i * sliderWidth.current });
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
