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
    if (isPhoneLandscapeCenter) return stylesContent.contentMobileLandscapeCenter;
    if (isPhoneLandscapeLeft) return stylesContent.contentMobileLandscapeLeft;
    if (isPhoneLandscapeRight) return stylesContent.contentMobileLandscapeRight;
    if (isPhonePortrait) return stylesContent.contentMobilePortrait;
    if (isDesktopScrollModeContent) return stylesContent.contentDesktopContentScroll;
    if (isDesktopScrollModePage) return stylesContent.contentDesktopPageScroll;
    return stylesContent.contentDesktopPageScroll;
  })();

  const headerClass = (() => {
    if (isPhoneLandscapeLeft) return stylesHeader.baseMobileLandscapeLeft;
    if (isPhoneLandscapeRight) return stylesHeader.baseMobileLandscapeRight;
    if (isPhoneLandscapeCenter) return stylesHeader.baseMobileLandscapeCenter;
    if (isPhonePortrait) return stylesHeader.baseMobilePortrait;
    return stylesHeader.baseDesktop;
  })();

  const footerClass = (() => {
    if (isPhonePortrait) return stylesFooter.containerFooterMobilePortrait;
    if (isPhoneLandscapeCenter) return stylesFooter.containerFooterMobileLandscapeCenter;
    return stylesFooter.containerFooterDesktop;
  })();

  return {
    contentClass,
    headerClass,
    footerClass,
    deviceState
  };
}