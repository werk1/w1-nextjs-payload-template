'use client';
import styles from '@/styles/modules/Layout.module.css';
import stylesTypography from '@/styles/modules/Typography.module.css';
import { DeviceLayout } from '@/components/device-layout/DeviceLayout';
import { SectionTwo } from '@/components/landing-page/SectionTwo';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';
import roseImage_1 from './_assets/DSF9873_FB.png'; // Import the image
import roseImage_2 from './_assets/DSF9810_FB.png'; // Import the image
import { useEffect, useState } from 'react';
import { Slide } from '@/components/image-slider/types/typesImageSlider';

import { ImageSliderUseTransition } from '@/components/image-slider/ImageSliderUseTransition';
import { ImageSliderUseSpring } from '@/components/image-slider/imageSliderUseSpring';
//Import styles they override the intermnal Default Styles if needed
import defaultSliderUseSpringStyles from '@/components/image-slider/styles/SliderUseSpringDefault.module.css';
import defaultControlUseSpringStyles from '@/components/image-slider/styles/slider-controls/SliderControlUseSpringDefault.module.css';
import defaultDescriptionUseSpringStyles from '@/components/image-slider/styles/slider-description/SliderDescriptionUseSpringDefault.module.css';
import defaultSliderUseTransitionStyles from '@/components/image-slider/styles/SliderUseTransitionDefault.module.css';
import defaultControlUseTransitionStyles from '@/components/image-slider/styles/slider-controls/SliderControlUseTransitionDefault.module.css';
import defaultDescriptionUseTransitionStyles from '@/components/image-slider/styles/slider-description/SliderDescriptionUseTransitionDefault.module.css';
import Navigation from '@/components/navigation/Navigation';


export default function LandingPage() {

	const localSlides = [
  {
    type: 'local' as const,
    src: roseImage_1,  // StaticImageData from next/image import
    alt: 'Image 1',
    width: roseImage_1.width,
    height: roseImage_1.height
  },
  {
    type: 'local' as const,
    src: roseImage_2,  // string URL
    alt: 'Image 2',
    width: roseImage_2.width,
    height: roseImage_2.height
  }
	];

	const [slides, setSlides] = useState<Slide[]>(localSlides);
	const [ isLoaded, setIsLoaded ] = useState(false);
	const { headerClass, footerClass, deviceState } = useDeviceLayout();

  // Add effect to fetch Payload slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slider-images');
        const data = await response.json();
        if (data.length > 0) {
          setSlides(data); // Use Payload slides if available
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        // Keep using localSlides on error (already set in initial state)
      }
    };

    fetchSlides();
    document.body.classList.add('loaded');
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className={styles.loadingScreen}>Loading...</div>;
  }



	return (
		<DeviceLayout>
			{/* <Header headerClass={headerClass}>
				<h1 className={stylesTypography.headerTitle}>now!</h1>
				<Navigation />
			</Header> */}
			<div className={styles.container} style={{ marginTop: 140 }}>
				<h1 className={stylesTypography.mainTitle}>
					Welcome <br /> to Your <br /> new App
				</h1>
				<section>
					<SectionTwo />
					<ImageSliderUseSpring slides={slides}
						sliderStyles={defaultSliderUseSpringStyles}
						controlStyles={defaultControlUseSpringStyles}
						descriptionStyles={defaultDescriptionUseSpringStyles}
					/>
					<ImageSliderUseTransition slides={slides} 
						sliderStyles={defaultSliderUseTransitionStyles}
						controlStyles={defaultControlUseTransitionStyles}
						descriptionStyles={defaultDescriptionUseTransitionStyles}
					/>
				{/* <Image
						src={roseImage_1} // Use the imported image
						alt="Featured Image"
						sizes="100%"
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							width: '100%',
							height: '100%'
						}}
						priority // If this is above the fold
						className={styles.heroImage} // Optional: for styling
					/> */}
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
						You don't <br />know!
					</h2>
				</section>
			</div>
			<Footer footerClass={footerClass} isDesktop={deviceState.isDesktop}>
				<FooterIcons />
			</Footer>
		</DeviceLayout>
	);
}
