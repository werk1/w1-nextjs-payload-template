import { StateCreator } from 'zustand'

export interface DeviceInfoSlice {
  device: {
    isMobile: boolean
    isDesktop: boolean
    hasTouchSupport: boolean
    isPhone: boolean
    isMobileDeviceLandscape: boolean
    isMobileDevicePortrait: boolean
    isPhoneLandscape: boolean
    isPhonePortrait: boolean
    width: number
    height: number
  }
  updateDeviceInfo: () => void
}

export const createDeviceInfoSlice: StateCreator<DeviceInfoSlice> = (set) => ({
  device: {
    isMobile: false,
    isDesktop: true,
    hasTouchSupport: false,
    isPhone: false,
    isMobileDeviceLandscape: false,
    isMobileDevicePortrait: false,
    isPhoneLandscape: false,
    isPhonePortrait: false,
    width: 0,
    height: 0,
  },
  updateDeviceInfo: () => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    const height = window.innerHeight
    const isLandscape = width > height
    const isMobile = width <= 768 // or your preferred mobile breakpoint
    const isDesktop = !isMobile
    const hasTouchSupport = 'ontouchstart' in window

    set({
      device: {
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
      }
    })
  }
})