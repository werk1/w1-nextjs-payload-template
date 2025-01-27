/**
 * Navigation Component
 *
 * This component renders the appropriate navigation bar based on the device type.
 * It uses the DeviceContext to determine whether the device is a phone in portrait mode,
 * a phone in landscape mode, or a desktop/tablet.
 *
 * @component
 * @returns {JSX.Element} The appropriate navigation component for the current device
 */
'use client';

import DesktopNav from "./DesktopNav";
import MobilePortraitNav from "./PhonePortraitNav";
import MobileLandscapeNav from "./PhoneLandscapeNav";
import { useDeviceInfo } from "@/stores/device-info";

const Navigation = () => {
    // Get device information from context
    const deviceInfo = useDeviceInfo();
    const { isPhonePortrait, isPhoneLandscape } = deviceInfo ?? {};

    // Render MobilePortraitNav for phones in portrait mode
    if (isPhonePortrait) {
        return (
            <MobilePortraitNav
                singleSubmenuMode={true}
                closeAllSubmenus={true}
            />
        );
        // Render MobileLandscapeNav for phones in landscape mode
    } else if (isPhoneLandscape) {
        return (
            <MobileLandscapeNav
                singleSubmenuMode={true}
                closeAllSubmenus={true}
            />
        );
        // Render DesktopNav for all other devices (desktop, tablet)
    } else {
        return <DesktopNav singleSubmenuMode={true} closeAllSubmenus={true} />;
    }
};

export default Navigation;
