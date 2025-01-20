import { ScrollTracker } from '@/stores/scroll-observer';
import { DeviceInfoTracker } from '@/stores/device-info';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ScrollTracker />
			<DeviceInfoTracker />
			{children}
		</>
	);
}
