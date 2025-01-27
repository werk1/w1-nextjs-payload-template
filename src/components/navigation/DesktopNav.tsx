/**
 * DesktopNav Component
 *
 * This component renders the navigation bar for desktop and mobile views.
 * It handles the display of navigation items, submenus, and a popup menu for smaller screens.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components to be rendered inside the navigation
 * @param {boolean} props.singleSubmenuMode - If true, only one submenu can be open at a time
 * @param {boolean} props.closeAllSubmenus - If true, all submenus will be closed
 */

'use client';
import styles from "./styles/DesktopNav.module.css";
import stylesPopup from "./styles/DesktopPopup.module.css";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import navItems from "./constants/NavItems";
import { StyleAgent, StyleAgentType } from "./StyleAgent";
import { useTransition, animated, config } from "@react-spring/web";
import { useSubnavigationManager } from "./hooks/useSubnavigationManager";
import NavLink from "./NavLink";
import { useDeviceInfo } from "@/stores/device-info";



type DesktopNavProps = {
    children?: React.ReactNode;
    singleSubmenuMode: boolean;
    closeAllSubmenus: boolean;
};

const styleAgent: StyleAgentType = StyleAgent("Desktop", styles);
const styleAgentPopup: StyleAgentType = StyleAgent("DesktopSM", stylesPopup);

const DesktopNav = ({
    children,
    singleSubmenuMode,
    closeAllSubmenus,
}: DesktopNavProps) => {
    const deviceInfo = useDeviceInfo();
    const { width } = deviceInfo ?? {};
    const [isPopupOpen, togglePopup] = useState(false);
    const AnimatedDiv = animated('div');

    const springTransition = useTransition(isPopupOpen, {
        from: { maxHeight: 0 },
        enter: { maxHeight: 500 },
        leave: { maxHeight: 0 },
        config: { ...config.gentle, clamp: true },
    });

    const { openSubnav, handleSubnavs } = useSubnavigationManager({
        singleSubmenuMode,
        closeAllSubmenus,
        isPopupOpen: isPopupOpen, // Always false for desktop navigation
    });

    // Render mobile view for screens <= 800px wide
    if (width <= 800) {
        return (
            <div className={styles.navBase}>
                <button
                    title="Menu"
                    type="button"
                    onClick={() => togglePopup(!isPopupOpen)}
                    className={styles.navMenuIcon}
                >
                    <MenuIcon />
                </button>

                {springTransition((style, item) =>
                    item ? (
                        <AnimatedDiv
                            className={stylesPopup.popupBase}
                            style={style}
                        >
                            <div className={stylesPopup.popupContentContainer}>
                                <button
                                    onClick={() => togglePopup(!isPopupOpen)}
                                    className={
                                        stylesPopup.popupContainerCloseButton
                                    }
                                >
                                    Close
                                </button>
                                <ul>
                                    {navItems.map((item, index) => (
                                        <NavLink
                                            key={item.to}
                                            {...item}
                                            styleAgent={styleAgentPopup}
                                            isSubnavOpen={openSubnav.has(index)}
                                            setIsSubnavOpen={() =>
                                                handleSubnavs(index)
                                            }
                                        />
                                    ))}
                                </ul>
                            </div>
                        </AnimatedDiv>
                    ) : null
                )}
            </div>
        );
    }

    // Render desktop view for screens > 800px wide
    return (
        <div className={styles.navBase}>
            <ul className={styles.navLinkContainer}>
                {navItems.map((item, index) => (
                    <NavLink
                        key={item.to}
                        {...item}
                        styleAgent={styleAgent}
                        isSubnavOpen={openSubnav.has(index)}
                        setIsSubnavOpen={() => handleSubnavs(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default DesktopNav;
