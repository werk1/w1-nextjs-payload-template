'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useSpring, animated } from '@react-spring/web';
import styles from '@/styles/modules/ImageSlider.module.css';

// Interfaces
interface BaseSlide {
  title?: string;
  description?: string;
}

interface LocalSlide extends BaseSlide {
  type: 'local';
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

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

type Slide = LocalSlide | PayloadSlide;

interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const ImageSlider = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoPlay);
  const touchStartX = useRef<number>(0);
  const touchingSlider = useRef<boolean>(false);
  const minSwipeDistance = 50;
  const slideWidth = useRef<number>(0);
  const autoPlayTimer = useRef<NodeJS.Timeout>(null);

  const AnimatedDiv = animated('div');

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { 
      tension: 270,
      friction: 32,
      clamp: true
    }
  }));

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
    api.start({ x: 0, immediate: false });
  }, [api]);

  // Autoplay effect
  useEffect(() => {
    if (autoPlay && isAutoPlaying && slides.length > 1) {
      autoPlayTimer.current = setTimeout(nextSlide, autoPlayInterval);
    }
    return () => {
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
      }
    };
  }, [isAutoPlaying, currentIndex, nextSlide, slides.length, autoPlayInterval, autoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    touchingSlider.current = true;
    touchStartX.current = e.touches[0].clientX;
    slideWidth.current = e.currentTarget.clientWidth;
    api.start({ x: 0, immediate: true });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchingSlider.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
    
    api.start({ x: diff, immediate: true });
  };

  const handleTouchEnd = () => {
    if (!touchingSlider.current) return;
    
    touchingSlider.current = false;
    const movement = x.get();
    
    if (Math.abs(movement) > minSwipeDistance) {
      if (movement > 0) {
        previousSlide();
        api.start({ 
          x: 0,
          from: { x: movement },
          immediate: false,
          onRest: () => setIsAutoPlaying(autoPlay)
        });
      } else {
        nextSlide();
        api.start({ 
          x: 0,
          from: { x: movement },
          immediate: false,
          onRest: () => setIsAutoPlaying(autoPlay)
        });
      }
    } else {
      api.start({ 
        x: 0, 
        immediate: false,
        onRest: () => setIsAutoPlaying(autoPlay)
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsAutoPlaying(false);
    touchingSlider.current = true;
    touchStartX.current = e.clientX;
    slideWidth.current = e.currentTarget.clientWidth;
    api.start({ x: 0, immediate: true });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchingSlider.current) return;
    const diff = e.clientX - touchStartX.current;
    api.start({ x: diff, immediate: true });
  };

  const handleMouseUp = handleTouchEnd;

    // For click events (arrows), we want immediate transitions
  const handleArrowNext = () => {
    nextSlide();
    api.start({ 
      x: 0,
      from: { x: -slideWidth.current },
      immediate: false
    });
  };

  const handleArrowPrevious = () => {
    previousSlide();
    api.start({ 
      x: 0,
      from: { x: slideWidth.current },
      immediate: false
    });
  };

  if (!slides.length) return null;

  return (
    <div 
      className={`${styles.slider} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <AnimatedDiv 
        className={styles.slideContainer}
        style={{
          transform: x.to(x => `translateX(${x}px)`)
        }}
      >
        {slides.map((slide, index) => {
          const imageProps = getImageProps(slide);
          
          return (
            <div
              key={index}
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
      </AnimatedDiv>

      {showArrows && slides.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.prev}`}
            onClick={handleArrowPrevious}
            aria-label="Previous slide"
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            onClick={handleArrowNext}
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
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};