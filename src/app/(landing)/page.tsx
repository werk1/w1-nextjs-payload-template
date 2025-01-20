'use client';
import styles from '@/styles/modules/Layout.module.css';
import stylesTypography from '@/styles/modules/Typography.module.css';
import { DeviceLayout } from '@/components/device-layout/DeviceLayout';
import { SectionTwo } from '@/components/landing-page/SectionTwo';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import FooterIcons from '@/components/footer/FooterIcons';
import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';
import Image from 'next/image';
import roseImage_1 from './_assets/DSF9873_FB.png'; // Import the image
import roseImage_2 from './_assets/DSF9810_FB.png'; // Import the image
import { useEffect, useState } from 'react';
import { ImageSlider } from '@/components/image-slider/ImageSlider';

export default function LandingPage() {
	const [ isLoaded, setIsLoaded ] = useState(false);

	const { headerClass, footerClass, deviceState } = useDeviceLayout();

	useEffect(() => {
		document.body.classList.add('loaded');
		setIsLoaded(true);
	}, []);

	if (!isLoaded) {
		return <div className={styles.loadingScreen}>Loading...</div>;
	}

	const localSlides = [
  {
    type: 'local' as const,
    src: roseImage_1,
    alt: 'Featured Image',
    width: roseImage_1.width,
    height: roseImage_1.height,
    // title: 'Welcome',
    // description: 'Experience something new'
  },
  {
			type: 'local' as const,
			src: roseImage_2,
			alt: 'Second Slide',
			width: roseImage_2.width,
			height: roseImage_2.height,
			// title: 'Discover',
			// description: 'Find what you love'
  }
	];

	return (
		<DeviceLayout>
			<Header headerClass={headerClass}>
				<h1 className={stylesTypography.headerTitle}>now!</h1>
			</Header>
			<div className={styles.container} style={{ marginTop: 140 }}>
				<h1 className={stylesTypography.mainTitle}>
					Welcome <br /> to Your <br /> new App
				</h1>
				<section>
					<SectionTwo />
        <ImageSlider 
          slides={localSlides}
          autoPlayInterval={5000}
          showDots={true}
          showArrows={false}
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
