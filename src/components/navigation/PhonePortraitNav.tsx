/**
 * PhonePortraitNav Component
 *
 * This component renders the navigation bar for phones in portrait mode.
 * It handles the display of a menu button and a popup menu with navigation items and submenus.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components to be rendered inside the navigation (unused in this component)
 * @param {boolean} props.singleSubmenuMode - If true, only one submenu can be open at a time
 * @param {boolean} props.closeAllSubmenus - If true, all submenus will be closed
 */

'use client';
import styles from './styles/PhonePortraitNav.module.css';
import React, { useState } from 'react';
import { useTransition, animated, config } from '@react-spring/web';
import navItems from './constants/NavItems';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from './NavLink';
import { StyleAgentType, StyleAgent } from './StyleAgent';
import { useSubnavigationManager } from './hooks/useSubnavigationManager';

const styleAgent: StyleAgentType = StyleAgent('PhonePortrait', styles);

type PhonePortraitNavProps = {
	children?: React.ReactNode;
	singleSubmenuMode: boolean;
	closeAllSubmenus: boolean;
};

const PhonePortraitNav = ({ children, singleSubmenuMode, closeAllSubmenus }: PhonePortraitNavProps) => {
	// State to control the visibility of the popup menu and subnav
	const [ isPopupOpen, togglePopup ] = useState(false);
	const AnimatedDiv = animated('div');

	const { openSubnav, handleSubnavs } = useSubnavigationManager({
		singleSubmenuMode,
		closeAllSubmenus,
		isPopupOpen: isPopupOpen // Always false for desktop navigation
	});

	const springTransition = useTransition(isPopupOpen, {
		from: { maxHeight: 0 },
		enter: { maxHeight: 500 },
		leave: { maxHeight: 0 },
		config: { ...config.gentle, clamp: false }
	});

	return (
		<nav className={styles.navBase}>
			<button title="Menu" type="button" onClick={() => togglePopup(!isPopupOpen)} className={styles.navMenuIcon}>
				<MenuIcon />
			</button>
			{springTransition(
				(style, item) =>
					item ? (
						<AnimatedDiv className={styles.popupBase} style={style}>
							<div className={styles.popupContentContainer}>
								<button onClick={() => togglePopup(false)} className={styles.popupContainerCloseCutton}>
									Close
								</button>
								<ul>
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
						</AnimatedDiv>
					) : null
			)}
		</nav>
	);
};

export default PhonePortraitNav;
