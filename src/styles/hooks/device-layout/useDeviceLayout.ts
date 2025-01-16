'use client';

import { useBoundStore } from '@/stores/boundStore';
import stylesContent from '@/styles/modules/Content.module.css';
import stylesHeader from '@/styles/modules/Header.module.css';
import stylesFooter from '@/styles/modules/Footer.module.css';

export function useDeviceLayout() {
  const deviceState = useBoundStore((state) => state.device);
  const {
    isPhonePortrait,
    isPhoneLandscape,
    isPhoneLandscapeCenter,
    isPhoneLandscapeLeft,
    isPhoneLandscapeRight,
    isDesktopScrollModeContent,
    isDesktopScrollModePage
  } = deviceState;

  const contentClass = (() => {
    if (isPhoneLandscapeCenter) return stylesContent.containerContentMobileLandscapeCenter;
    if (isPhoneLandscapeLeft) return stylesContent.containerContentMobileLandscapeLeft;
    if (isPhoneLandscapeRight) return stylesContent.containerContentMobileLandscapeRight;
    if (isPhonePortrait) return stylesContent.containerContentMobilePortrait;
    if (isDesktopScrollModeContent) return stylesContent.containerContentDesktopContentScroll;
    if (isDesktopScrollModePage) return stylesContent.containerContentDesktopPageScroll;
    return stylesContent.containerContentDesktopPageScroll;
  })();

  const headerClass = (() => {
    if (isPhonePortrait) return stylesHeader.containerHeaderMobilePortrait;
    if (isPhoneLandscapeCenter) return stylesHeader.containerHeaderMobileLandscapeCenter;
    if (isPhoneLandscapeLeft) return stylesHeader.containerHeaderMobileLandscapeLeft;
    if (isPhoneLandscapeRight) return stylesHeader.containerHeaderMobileLandscapeRight;
    return stylesHeader.containerHeaderDesktop;
  })();

  const footerClass = (() => {
    if (isPhonePortrait) return stylesFooter.containerFooterMobilePortrait;
    if (isPhoneLandscapeCenter) return stylesFooter.containerFooterMobileLandscapeCenter;
    if (isPhoneLandscapeLeft) return stylesFooter.containerFooterMobileLandscapeLeft;
    if (isPhoneLandscapeRight) return stylesFooter.containerFooterMobileLandscapeRight;
    return stylesFooter.containerFooterDesktop;
  })();

  return {
    contentClass,
    headerClass,
    footerClass,
    deviceState
  };
}