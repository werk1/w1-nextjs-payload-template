import styles from '../styles/ImageSliderControl.module.css';

interface ImageSliderControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onDotClick: (index: number) => void;
  currentIndex: number;
  totalSlides: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export const ImageSliderControls = ({
  onNext,
  onPrevious,
  onDotClick,
  currentIndex,
  totalSlides,
  showDots = true,
  showArrows = true
}: ImageSliderControlsProps) => {
  return (
    <>
      {showArrows && totalSlides > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.prev}`}
            onClick={onPrevious}
            aria-label="Previous slide"
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            onClick={onNext}
            aria-label="Next slide"
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      {showDots && totalSlides > 1 && (
        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentIndex}
            />
          ))}
        </div>
      )}
    </>
  );
};