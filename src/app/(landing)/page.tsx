'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/modules/Layout.module.css';
import stylesTypography from '@/styles/modules/Typography.module.css';
import { DeviceLayout } from '@/components/device-layout/DeviceLayout';
import { SectionTwo } from '@/components/landing-page/SectionTwo';
import Header from '@/components/header/Header';
import { ImageSliderUseTransition } from '@/components/image-slider/ImageSliderUseTransition';
import { ImageSliderUseSpring } from '@/components/image-slider/imageSliderUseSpring';
import defaultSliderUseSpringStyles from '@/components/image-slider/styles/SliderUseSpringDefault.module.css';
import defaultControlUseSpringStyles from '@/components/image-slider/styles/slider-controls/SliderControlUseSpringDefault.module.css';
import defaultDescriptionUseSpringStyles from '@/components/image-slider/styles/slider-description/SliderDescriptionUseSpringDefault.module.css';
import defaultSliderUseTransitionStyles from '@/components/image-slider/styles/SliderUseTransitionDefault.module.css';
import defaultControlUseTransitionStyles from '@/components/image-slider/styles/slider-controls/SliderControlUseTransitionDefault.module.css';
import defaultDescriptionUseTransitionStyles from '@/components/image-slider/styles/slider-description/SliderDescriptionUseTransitionDefault.module.css';
import Navigation from '@/components/navigation/Navigation';
import { Slide } from '@/components/image-slider/types/typesImageSlider';
import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';
import { getSlides } from '../../actions/getSlides';
import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { BlockRenderer } from '@/components/text-content/block-renderer/BlockRenderer'
import { Block } from '@/components/text-content/block-renderer/types/blockRendererTypes';
import { getTextContent } from '@/actions/getTextContent'



function SliderComponent({ topSlides = [], bottomSlides = [] }: { topSlides?: Slide[], bottomSlides?: Slide[] }) {
  if (!topSlides?.length && !bottomSlides?.length) {
    return null;
  }

  return (
    <>
      {topSlides?.length > 0 && (
        <ImageSliderUseSpring
          slides={topSlides}
          sliderStyles={defaultSliderUseSpringStyles}
          controlStyles={defaultControlUseSpringStyles}
          descriptionStyles={defaultDescriptionUseSpringStyles}
        />
      )}
      {bottomSlides?.length > 0 && (
        <ImageSliderUseTransition
          slides={bottomSlides}
          sliderStyles={defaultSliderUseTransitionStyles}
          controlStyles={defaultControlUseTransitionStyles}
          descriptionStyles={defaultDescriptionUseTransitionStyles}
        />
      )}
    </>
  );
}


export default function LandingPage() {
  const [topSlides, setTopSlides] = useState<Slide[]>([])
  const [bottomSlides, setBottomSlides] = useState<Slide[]>([])
  const [blockContent, setBlockContent] = useState<Block[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { headerClass, footerClass, deviceState } = useDeviceLayout()

  useEffect(() => {
    async function fetchData() {
      try {
        const [slidesResponse, contentResponse] = await Promise.all([
          getSlides(),
          getTextContent('landing-page')
        ])

        if ('error' in slidesResponse) {
          console.error(slidesResponse.error)
          return
        }

        if ('error' in contentResponse) {
          console.error(contentResponse.error)
          return
        }

        setTopSlides(slidesResponse.topSlides)
        setBottomSlides(slidesResponse.bottomSlides)
        setBlockContent(contentResponse.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DeviceLayout>
      <Header headerClass={headerClass}>
        <h1 className={stylesTypography.headerTitle}>now!</h1>
        <Navigation />
      </Header>
      <div className={styles.container} style={{ marginTop: 140 }}>
        <h1 className={stylesTypography.mainTitle}>
          Welcome <br /> to Your <br /> new App
        </h1>
        <section>
          <SliderComponent topSlides={topSlides} bottomSlides={bottomSlides} />
          <SectionTwo />
          <BlockRenderer content={blockContent} />
          <h2 className={styles.title}>
            Some things <br />about
          </h2>
          <p className={styles.text}>
            This is your landing page. Customize this content to match your needs.
          </p>
          <h2 className={styles.title}>Features</h2>
          <ul className={styles.list}>
            <li className={stylesTypography.listItemCustom}>Payload CMS Integration</li>
            <li className={stylesTypography.listItemCustom}>Next.js App Router</li>
            <li className={stylesTypography.listItemCustom}>TypeScript Support</li>
            <li className={stylesTypography.listItemCustom}>Custom Font Integration</li>
          </ul>
          <h2 className={styles.title}>
            You don&apos;t <br />know!
          </h2>
        </section>
      </div>
      <Footer footerClass={footerClass} isDesktop={deviceState.isDesktop}>
        <FooterIcons />
      </Footer>
    </DeviceLayout>
  );
}
