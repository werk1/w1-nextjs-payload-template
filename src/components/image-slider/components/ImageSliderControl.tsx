import defaultStyles from '../styles/image-slider-controls/ImageSliderControlDefault.module.css';
import { ImageSliderControlStyles } from '../types/typesImageSlider';

interface ImageSliderControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onDotClick: (index: number) => void;
  currentIndex: number;
  totalSlides: number;
  showDots?: boolean;
  showArrows?: boolean;
  controlStyles?: ImageSliderControlStyles;
}

export const ImageSliderControls = ({
  onNext,
  onPrevious,
  onDotClick,
  currentIndex, 
  totalSlides,
  showDots = true,
  showArrows = true,
  controlStyles = {} // Default to empty object
}: ImageSliderControlsProps) => {
  return (
    <>
      {showArrows && totalSlides > 1 && (
        <>
          <button
            className={`${defaultStyles.arrow} ${defaultStyles.prev} ${controlStyles.arrow || ''} ${controlStyles.prev || ''}`}
            onClick={onPrevious}
            aria-label="Previous slide"
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className={`${defaultStyles.arrow} ${defaultStyles.next} ${controlStyles.arrow || ''} ${controlStyles.next || ''}`}
            onClick={onNext}
            aria-label="Next slide"
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      {showDots && totalSlides > 1 && (
        <div className={`${defaultStyles.dotsContainer} ${controlStyles.dotsContainer || ''}`}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className={`${defaultStyles.dot} ${i === currentIndex ? defaultStyles.dotActive : ''} 
                ${controlStyles.dot || ''} ${i === currentIndex ? controlStyles.dotActive || '' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentIndex}
            />
          ))}
        </div>
      )}
    </>
  );
};