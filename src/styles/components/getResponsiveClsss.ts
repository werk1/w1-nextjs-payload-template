'use client';

import { useBoundStore } from "@/stores/boundStore"

export const useResponsiveClass = (
  options: {
    phonePortrait?: string
    phoneLandscapeLeft?: string
    phoneLandscapeRight?: string
    desktop?: string
    desktopContentScroll?: string
    desktopPageScroll?: string
    isHeaderLeft?: boolean
    contentScrollMode?: boolean
    defaultClass: string
  }
) => {
  const { isPhonePortrait, isPhoneLandscape, isDesktop } = useBoundStore((state) => state.device)
  const {
    phonePortrait,
    phoneLandscapeLeft,
    phoneLandscapeRight,
    desktopContentScroll,
    desktopPageScroll,
    isHeaderLeft,
    contentScrollMode,
    desktop,
    defaultClass
  } = options

  if (isPhoneLandscape && isHeaderLeft && phoneLandscapeLeft) {
    return phoneLandscapeLeft
  }

  if (isPhoneLandscape && phoneLandscapeRight) {
    return phoneLandscapeRight
  }

  if (isPhonePortrait && phonePortrait) {
    return phonePortrait
  }

  if (isDesktop && contentScrollMode && desktopContentScroll) {
    return desktopContentScroll
  }

  if (isDesktop && desktopPageScroll) {
    return desktopPageScroll
  }

  if (isDesktop && desktop) {
    return desktop
  }

  return defaultClass
}
