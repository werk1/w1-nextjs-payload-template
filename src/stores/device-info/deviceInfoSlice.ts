import { StateCreator } from 'zustand'
import { getDeviceAgent } from '../../utils/deviceAgent'
import { HEADER_POSITION, SCROLL_MODE } from '../../styles/constants/constants'

export interface DeviceInfoSlice {
  device: {
    isDesktop: boolean
    hasTouchSupport: boolean
    isMobile: boolean
    isPhone: boolean
    isDesktopScrollModeContent: boolean
    isDesktopScrollModePage: boolean
    isMobileDeviceLandscape: boolean
    isMobileDeviceLandscapeCenter: boolean
    isMobileDeviceLandscapeLeft: boolean
    isMobileDeviceLandscapeRight: boolean
    isMobileDevicePortrait: boolean
    isPhoneLandscape: boolean
    isPhoneLandscapeCenter: boolean
    isPhoneLandscapeLeft: boolean
    isPhoneLandscapeRight: boolean
    isPhonePortrait: boolean
    width: number
    height: number
  }
  updateDeviceInfo: () => void
}

export const createDeviceInfoSlice: StateCreator<DeviceInfoSlice> = (set) => ({
  device: {
    isDesktop: true,
    hasTouchSupport: true,
    isMobile: false,
    isDesktopScrollModeContent: false,
    isDesktopScrollModePage: false,
    isPhone: false,
    isMobileDeviceLandscape: false,
    isMobileDeviceLandscapeCenter: false,
    isMobileDeviceLandscapeLeft: false,
    isMobileDeviceLandscapeRight: false,
    isMobileDevicePortrait: false,
    isPhoneLandscape: false,
    isPhonePortrait: false,
    isPhoneLandscapeCenter: false,
    isPhoneLandscapeLeft: false,
    isPhoneLandscapeRight: false,
    width: 0,
    height: 0,
  },

  updateDeviceInfo: () => {
    if (typeof window === 'undefined') return

    const { isMobile, isDesktop, hasTouchSupport } = getDeviceAgent()
    const width = window.innerWidth
    const height = window.innerHeight
    const isLandscape = width > height

    set({
      device: {
        isDesktop,
        hasTouchSupport,
        isMobile,
        isDesktopScrollModeContent: isDesktop && SCROLL_MODE === 'contentScroll',
        isDesktopScrollModePage: isDesktop && SCROLL_MODE === 'pageScroll',
        isPhone: isMobile && hasTouchSupport,
        isMobileDeviceLandscape: isMobile && isLandscape,
        isMobileDevicePortrait: isMobile && !isLandscape,
        isMobileDeviceLandscapeCenter: isMobile && isLandscape && HEADER_POSITION === 'center',
        isMobileDeviceLandscapeLeft: isMobile && isLandscape && HEADER_POSITION === 'left',
        isMobileDeviceLandscapeRight: isMobile && isLandscape && HEADER_POSITION === 'right',
        isPhoneLandscape: isMobile && hasTouchSupport && isLandscape,
        isPhoneLandscapeCenter: isMobile && hasTouchSupport && isLandscape && HEADER_POSITION === 'center',
        isPhoneLandscapeLeft: isMobile && hasTouchSupport && isLandscape && HEADER_POSITION === 'left',
        isPhoneLandscapeRight: isMobile && hasTouchSupport && isLandscape && HEADER_POSITION === 'right',
        isPhonePortrait: isMobile && hasTouchSupport && !isLandscape,
        width,
        height,
      }
    })
  }
})
