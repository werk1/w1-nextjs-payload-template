import styles from '../styles/image-slider-description/ImageSliderDescriptionDefault.module.css';

interface ImageSliderDescriptionProps {
	slide: {
		title?: string;
		description?: string;
	};
}

export const ImageSliderDescription = ({ slide }: ImageSliderDescriptionProps) => {
	if (!slide.title && !slide.description) return null;

	return (
		<div className={styles.descriptionContainer}>
			{slide.title && <h2 className={styles.descriptionTitle}>{slide.title}</h2>}
			{slide.description && <p className={styles.descriptionText}>{slide.description}</p>}
		</div>
	);
};
