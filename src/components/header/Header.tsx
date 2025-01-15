'use client'

import styles from "../../styles/modules/Header.module.css";
import { useSpring, animated, SpringValue } from "@react-spring/web";
import { useBoundStore } from "@/stores/boundStore";
import { useScrollDirection } from "@/stores/scroll-direction";
import { HTMLAttributes, ReactNode, CSSProperties } from "react";

// Define the animated style type
type AnimatedStyle = {
    top: SpringValue<number>;
    opacity: SpringValue<number>;
}

// Define the props type for our animated header
interface AnimatedHeaderProps {
    role?: string;
    className?: string;
    style?: Partial<AnimatedStyle>;
    children?: ReactNode;
}

// Create a properly typed animated header component
const AnimatedHeader = animated('header') as React.FC<AnimatedHeaderProps>;

/**
 * Props for the Header component.
 */
export type HeaderProps = {
    scrollY: number;
    hideHeaderOnContentScroll: boolean;
    contentIsScrollingDown: boolean;
    headerHeight: number;
    isHeaderLeft: boolean;
    setIsHeaderLeft: (isHeaderLeft: boolean) => void;
    children?: React.ReactNode;
};

/**
 * Header component that adapts to different device types and scroll behavior.
 */
function Header(props: HeaderProps) {
    const deviceInfo = useBoundStore((state) => state.device);
    const { isPhonePortrait, isPhoneLandscape, isDesktop } = deviceInfo ?? {};
    let isScrollingDown = false;

    const { isScrollingDown: scrollingDown } = useScrollDirection(
        0.15,  // velocityUp
        0.15,  // velocityDown
        "time-sensitive"  // velocityMode
    );

        console.log('scrollingDown from hook:', scrollingDown);


    // Determine if the content is scrolling down
    if (!props.hideHeaderOnContentScroll) {
        isScrollingDown = scrollingDown;
    } else {
        isScrollingDown = !isDesktop
            ? scrollingDown
            : props.contentIsScrollingDown;
    }

        // Log the final isScrollingDown value after logic
    console.log('final isScrollingDown:', isScrollingDown, {
        hideHeaderOnContentScroll: props.hideHeaderOnContentScroll,
        isDesktop,
        contentIsScrollingDown: props.contentIsScrollingDown
    });


    // Determine base header class based on device type and orientation
    const baseHeader =
        isPhoneLandscape && props.isHeaderLeft
            ? styles.baseLeftMobileLandscape
            : isPhoneLandscape
            ? styles.baseRightMobileLandscape
            : isPhonePortrait
            ? styles.baseMobilePortrait
            : styles.baseDesktop;

    // Configure spring animation for header visibility
    const animated_top_style = useSpring<AnimatedStyle>({
        top: isScrollingDown ? -props.headerHeight * 1.2 : 0,
        opacity: !isScrollingDown ? 1 : 0,
        config: {
            mass: 1,
            tension: 128,
            friction: 25,
            clamp: true,
        },
    });

    return (
        <AnimatedHeader
            role="banner"
            className={baseHeader}
            style={!isPhoneLandscape ? animated_top_style : {}}
        >
            {props.children}
        </AnimatedHeader>
    );
}

export default Header;