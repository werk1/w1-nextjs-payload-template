import styles from './styles/PhoneLandscapeNav.module.css';
import navItems from './constants/NavItems';
import NavLink from './NavLink';
import { StyleAgentType, StyleAgent } from './StyleAgent';
import { useState } from 'react';
import { useEffect } from 'react';

type PhoneLandscapeNavProps = {
	children?: React.ReactNode;
	singleSubmenuMode: boolean;
	closeAllSubmenus: boolean;
};

const styleAgent: StyleAgentType = StyleAgent('PhoneLandscape', styles);

const PhoneLandscapeNav = ({ children, singleSubmenuMode, closeAllSubmenus }: PhoneLandscapeNavProps) => {
	const [ openSubmenus, setOpenSubmenus ] = useState<Set<number>>(new Set());

	useEffect(
		() => {
			if (closeAllSubmenus) {
				setOpenSubmenus(new Set());
			}
		},
		[ closeAllSubmenus ]
	);

	/**
     * Handles toggling of submenus.
     * @param {number} index - The index of the submenu to toggle.
     * If the submenu is open, it will be closed, otherwise it will be opened.
     * If singleSubmenuMode is true, all other submenus will be closed.
     */
	const handleToggle = (index: number) => {
		setOpenSubmenus((prevOpenSubmenus) => {
			const newOpenSubmenus = new Set(prevOpenSubmenus);
			if (newOpenSubmenus.has(index)) {
				newOpenSubmenus.delete(index);
			} else {
				if (singleSubmenuMode) {
					newOpenSubmenus.clear();
				}
				newOpenSubmenus.add(index);
			}
			return newOpenSubmenus;
		});
	};

	return (
		<nav className={styles.navBase}>
			<ul>
				{navItems.map((item, index) => (
					<NavLink
						key={item.to}
						{...item}
						styleAgent={styleAgent}
						isSubnavOpen={openSubmenus.has(index)}
						setIsSubnavOpen={() => handleToggle(index)}
					/>
				))}
			</ul>
		</nav>
	);
};

export default PhoneLandscapeNav;
