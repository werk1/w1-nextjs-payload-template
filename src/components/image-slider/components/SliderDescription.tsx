import defaultStyles from '../styles/slider-description/SliderDescriptionDefault.module.css';
import { SliderDescriptionStyles } from '../types/typesImageSlider';

interface SliderDescriptionProps {
	slide: {
		title?: string;
		description?: string;
	};
	descriptionStyles?: SliderDescriptionStyles;
}

export const SliderDescription = ({
	slide,
	descriptionStyles = {} // Default to empty object
}: SliderDescriptionProps) => {
	if (!slide.title && !slide.description) return null;

	return (
		<div className={`${defaultStyles.descriptionContainer} ${descriptionStyles.descriptionContainer || ''}`}>
			{slide.title && (
				<h2 className={`${defaultStyles.descriptionTitle} ${descriptionStyles.descriptionTitle || ''}`}>
					{slide.title}
				</h2>
			)}
			{slide.description && (
				<p className={`${defaultStyles.descriptionText} ${descriptionStyles.descriptionText || ''}`}>
					{slide.description}
				</p>
			)}
		</div>
	);
};
