import { useState, useEffect } from 'react';
import { getDeviceAgent } from '../utils/deviceAgent';

/**
 * Custom hook that provides detailed information about the device and its current state.
 *
 * @returns {DeviceInfoType} An object containing various device-related properties:
 *   - isMobile: boolean - Indicates if the device is a mobile device.
 *   - isDesktop: boolean - Indicates if the device is a desktop computer.
 *   - hasTouchSupport: boolean - Indicates if the device has touch support.
 *   - isPhone: boolean - Indicates if the device is specifically a phone (mobile with touch support).
 *   - isMobileDeviceLandscape: boolean - Indicates if the mobile device is in landscape orientation.
 *   - isMobileDevicePortrait: boolean - Indicates if the mobile device is in portrait orientation.
 *   - isPhoneLandscape: boolean - Indicates if the phone is in landscape orientation.
 *   - isPhonePortrait: boolean - Indicates if the phone is in portrait orientation.
 *   - width: number - The current width of the window.
 *   - height: number - The current height of the window.
 *
 * This hook uses the `getDeviceAgent` function from '../utils/deviceAgent' to determine
 * the basic device characteristics. It then combines this information with the current
 * window dimensions to provide a comprehensive set of device-related properties.
 *
 * The hook also sets up an event listener for the 'resize' event, ensuring that the
 * device information is updated whenever the window size changes.
 *
 * @example
 * const deviceInfo = useDeviceInfo();
 * console.log(deviceInfo.isMobile); // true if the device is mobile
 * console.log(deviceInfo.isPhoneLandscape); // true if the device is a phone in landscape orientation
 */

export type DeviceInfoType = {
  isMobile: boolean;
  isDesktop: boolean;
  hasTouchSupport: boolean;
  isPhone: boolean;
  isMobileDeviceLandscape: boolean;
  isMobileDevicePortrait: boolean;
  isPhoneLandscape: boolean;
  isPhonePortrait: boolean;
  width: number;
  height: number;
};


const useDeviceInfo = (): DeviceInfoType => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(() => {
    const { isMobile, isDesktop, hasTouchSupport } = getDeviceAgent();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;

    return {
      isMobile,
      isDesktop,
      hasTouchSupport,
      isPhone: isMobile && hasTouchSupport,
      isMobileDeviceLandscape: isMobile && isLandscape,
      isMobileDevicePortrait: isMobile && !isLandscape,
      isPhoneLandscape: isMobile && hasTouchSupport && isLandscape,
      isPhonePortrait: isMobile && hasTouchSupport && !isLandscape,
      width,
      height,
    };
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const { isMobile, isDesktop, hasTouchSupport } = getDeviceAgent();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;

      setDeviceInfo({
        isMobile,
        isDesktop,
        hasTouchSupport,
        isPhone: isMobile && hasTouchSupport,
        isMobileDeviceLandscape: isMobile && isLandscape,
        isMobileDevicePortrait: isMobile && !isLandscape,
        isPhoneLandscape: isMobile && hasTouchSupport && isLandscape,
        isPhonePortrait: isMobile && hasTouchSupport && !isLandscape,
        width,
        height,
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
