import './global.css'; // Global styles
import { installedLocalFonts } from '@/styles/fonts';
import { Metadata, Viewport } from 'next';
import { ScrollTracker } from '@/stores/scroll-observer';
import { DeviceInfoTracker } from '@/stores/device-info';

// Separate viewport export
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
};

// Regular metadata export
export const metadata: Metadata = {
	title: {
		template: '%s | Your Site Name',
		default: 'Your Site Name'
	},
	description: 'Your site description',
	metadataBase: new URL('https://your-domain.com'),
	openGraph: {
		title: 'Your Site Name',
		description: 'Your site description',
		type: 'website'
	},
	robots: {
		index: true,
		follow: true
	}
	// other metadata like icons, manifest, etc.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={installedLocalFonts.join(' ')} suppressHydrationWarning>
			<body>
				<ScrollTracker />
				<DeviceInfoTracker />
				{children}
			</body>
		</html>
	);
}
