'use client';

import { useEffect, useState } from 'react';
import stylesLayout from '@/styles/modules/Layout.module.css';
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

export default function LandingPage() {
	const [ slides, setSlides ] = useState<Slide[]>([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const { headerClass, footerClass, deviceState } = useDeviceLayout();

	useEffect(() => {
		async function fetchSlides() {
			try {
				const result = await getSlides();
				if ('slides' in result && result.slides) {
					setSlides([ ...result.slides ]);
				}
			} catch (error) {
				console.error('Error fetching slides:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchSlides();
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<DeviceLayout>
			<Header headerClass={headerClass}>
				<h1 className={stylesTypography.headerTitle}>now!</h1>
				<Navigation />
			</Header>
			<div className={stylesLayout.container} style={{ marginTop: 140 }}>
				<h1 className={stylesTypography.mainTitle}>
					Welcome <br /> to Your <br /> new App
				</h1>
				<section>
					<SectionTwo />
					<ImageSliderUseSpring
						slides={slides}
						sliderStyles={defaultSliderUseSpringStyles}
						controlStyles={defaultControlUseSpringStyles}
						descriptionStyles={defaultDescriptionUseSpringStyles}
					/>
					<ImageSliderUseTransition
						slides={slides}
						sliderStyles={defaultSliderUseTransitionStyles}
						controlStyles={defaultControlUseTransitionStyles}
						descriptionStyles={defaultDescriptionUseTransitionStyles}
					/>
					<h2 className={stylesLayout.title}>
						Some things <br />about
					</h2>
					<p className={stylesLayout.text}>
						This is your landing page. Customize this content to match your needs.
					</p>
					<h2 className={stylesLayout.title}>Features</h2>
					<ul className={stylesLayout.list}>
						<li className={stylesTypography.listItemCustom}>Payload CMS Integration</li>
						<li className={stylesTypography.listItemCustom}>Next.js App Router</li>
						<li className={stylesTypography.listItemCustom}>TypeScript Support</li>
						<li className={stylesTypography.listItemCustom}>Custom Font Integration</li>
					</ul>
					<h2 className={stylesLayout.title}>
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
