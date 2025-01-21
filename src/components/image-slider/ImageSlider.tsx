'use client';
import { useState, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';  // Add StaticImageData import
import styles from '@/styles/modules/ImageSlider.module.css';

// Base interfaces
interface BaseSlide {
  title?: string;
  description?: string;
}

// Local data interface
interface LocalSlide extends BaseSlide {
  type: 'local';
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

// Payload data interface
interface PayloadImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface PayloadSlide extends BaseSlide {
  type: 'payload';
  image: PayloadImage;
}

// Combined type
type Slide = LocalSlide | PayloadSlide;

interface ImageSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const ImageSlider = ({
  slides,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Helper function to get image props
  const getImageProps = (slide: Slide) => {
    if (slide.type === 'local') {
      return {
        src: slide.src,
        alt: slide.alt,
        width: slide.width,
        height: slide.height,
      };
    }
    return {
      src: slide.image.url,
      alt: slide.image.alt,
      width: slide.image.width,
      height: slide.image.height,
    };
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isAutoPlaying, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide]);

  // // Touch handling
  // const minSwipeDistance = 50;

  // const onTouchStart = (e: React.TouchEvent) => {
  //   setTouchEnd(null);
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const onTouchMove = (e: React.TouchEvent) => {
  //   setTouchEnd(e.targetTouches[0].clientX);
  // };

  // const onTouchEnd = () => {
  //   if (!touchStart || !touchEnd) return;
    
  //   const distance = touchStart - touchEnd;
  //   const isLeftSwipe = distance > minSwipeDistance;
  //   const isRightSwipe = distance < -minSwipeDistance;

  //   if (isLeftSwipe) {
  //     nextSlide();
  //   } else if (isRightSwipe) {
  //     previousSlide();
  //   }
  // };

  // Early return if no slides
  if (!slides.length) {
    return null;
  }

  return (
    <div 
      className={`${styles.slider} ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      // onTouchStart={onTouchStart}
      // onTouchMove={onTouchMove}
      // onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Image Slider"
    >
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => {
          const imageProps = getImageProps(slide);
          
          return (
    <div
      key={`slide-${index}`} // Simple fix: just use the index as key
      className={`${styles.slide} ${
        index === currentIndex ? styles.active : ''
      }`}
      style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
      aria-hidden={index !== currentIndex}
    >
      <Image
        {...imageProps}
        priority={index === currentIndex}
        className={styles.image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        quality={90}
        loading={index === currentIndex ? 'eager' : 'lazy'}
      />
              {(slide.title || slide.description) && (
                <div className={styles.slideContent}>
                  {slide.title && (
                    <h2 className={styles.slideTitle}>{slide.title}</h2>
                  )}
                  {slide.description && (
                    <p className={styles.slideDescription}>{slide.description}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.prev}`}
            onClick={previousSlide}
            aria-label="Previous slide"
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            onClick={nextSlide}
            aria-label="Next slide"
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
              type="button"
            />
          ))}
        </div>
      )}

      <div className={styles.progress}>
        <div 
          className={styles.progressBar}
          style={{
            width: `${((currentIndex + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};