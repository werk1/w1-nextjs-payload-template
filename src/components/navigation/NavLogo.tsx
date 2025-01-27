import React from "react";
import styles from "./styles/LogoNav.module.css";
import logo from "../../assets/logo.svg";
import { useDeviceInfo } from "@/stores/device-info";

interface NavLogoProps {
    isHeaderLeft?: boolean;
}

const NavLogo = ({ isHeaderLeft }: NavLogoProps) => {
    const deviceInfo = useDeviceInfo();
    const { isPhonePortrait, isPhoneLandscape } = deviceInfo ?? {};

    const baseLogoClass = isPhonePortrait
        ? styles.logoBasePhonePortrait
        : isPhoneLandscape
        ? isHeaderLeft
            ? styles.logoBasePhoneLandscapeLeft
            : styles.logoBasePhoneLandscapeRight
        : styles.logoBaseDesktop;

    return (
        <div className={baseLogoClass}>
            <img src={logo} className={styles.logo} alt="logo" />
        </div>
    );
};

export default NavLogo;
