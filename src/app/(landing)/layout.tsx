import { installedLocalFonts } from '@/styles/fonts';
import '@/styles/global.css'; // Global styles

import { ScrollTracker } from '@/stores/scroll-observer';
import { DeviceInfoTracker } from '@/stores/device-info';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={installedLocalFonts.join(' ')}>
			<body>
				<ScrollTracker />
				<DeviceInfoTracker />
				{children}
			</body>
		</html>
	);
}
