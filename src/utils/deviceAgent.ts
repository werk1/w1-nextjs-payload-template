interface DeviceInfo {
  isMobile: boolean;
  isDesktop: boolean;
  hasTouchSupport: boolean;
}
/**
 * Represents information about the device and its capabilities.
 */
interface DeviceInfo {
  /** Indicates whether the device is a mobile device. */
  isMobile: boolean;
  /** Indicates whether the device is a desktop computer. */
  isDesktop: boolean;
  /** Indicates whether the device has touch support. */
  hasTouchSupport: boolean;
}

/**
 * Determines the device type and capabilities based on the user agent and device features.
 *
 * @returns {DeviceInfo} An object containing information about the device.
 */

export function getDeviceAgent(): DeviceInfo {
  const userAgent = navigator.userAgent.toLowerCase();

  // List of common mobile and tablet identifiers
  const mobileKeywords = [
    'android',
    'webos',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'opera mini',
    'iemobile',
    'mobile',
    'tablet',
    'silk'
  ];

  // Check if the user agent contains any mobile keywords
  const isMobileOrTablet = mobileKeywords.some(keyword => userAgent.includes(keyword));

  // Check for touch support
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check for mobile-specific browser features
  const hasMobileSpecificFeatures = 'orientation' in window || 'mozOrientation' in window;

  const isMobile = isMobileOrTablet || (hasTouchSupport && hasMobileSpecificFeatures);
  const isDesktop = !isMobile;

  return {
    isMobile,
    isDesktop,
    hasTouchSupport
  };
}
