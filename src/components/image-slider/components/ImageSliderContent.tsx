import styles from '@/styles/modules/ImageSlider.module.css';

interface ImageSliderContentProps {
	slide: {
		title?: string;
		description?: string;
	};
}

export const ImageSliderContent = ({ slide }: ImageSliderContentProps) => {
	if (!slide.title && !slide.description) return null;

	return (
		<div className={styles.slideContent}>
			{slide.title && <h2 className={styles.slideTitle}>{slide.title}</h2>}
			{slide.description && <p className={styles.slideDescription}>{slide.description}</p>}
		</div>
	);
};
