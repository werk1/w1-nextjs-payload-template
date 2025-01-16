'use client';

import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';

type DeviceLayoutProps = {
	children: React.ReactNode;
};

export function DeviceLayout({ children }: DeviceLayoutProps) {
	const { contentClass } = useDeviceLayout();

	return <div className={contentClass}>{children}</div>;
}
