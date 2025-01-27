import { useTransition, config } from "@react-spring/web";
import { useEffect, useState } from "react";

export const AnimatedDesktopPopup = (isOpen: boolean) => {
    const [internalState, setInternalState] = useState(isOpen);

    useEffect(() => {
        setInternalState(isOpen); // Sync internal state with prop
    }, [isOpen]);

    return useTransition(internalState, {
        from: { maxHeight: 0 },
        enter: { maxHeight: 500 },
        leave: { maxHeight: 0 },
        config: { ...config.gentle, clamp: true },
    });
};

export const AnimatedPhonepPopup = (isOpen: boolean) => {
    const [internalState, setInternalState] = useState(isOpen);

    useEffect(() => {
        setInternalState(isOpen); // Sync internal state with prop
    }, [isOpen]);

    return useTransition(internalState, {
        from: { maxHeight: 0 },
        enter: { maxHeight: 500 },
        leave: { maxHeight: 0 },
        config: { ...config.gentle, clamp: true },
    });
};

export const AnimatedSubNavLink = (isOpen: boolean) => {
    const [internalState, setInternalState] = useState(isOpen);

    useEffect(() => {
        setInternalState(isOpen); // Sync internal state with prop
    }, [isOpen]);

    return useTransition(internalState, {
        from: {
            opacity: 0,
            transform: "translateY(-10px)",
            scale: 0.85,
            maxHeight: 0,
        },
        enter: {
            opacity: 1,
            transform: "translateY(0)",
            scale: 1,
            maxHeight: 100,
        },
        leave: {
            opacity: 0,
            transform: "translateY(-10px)",
            scale: 0.6,
            maxHeight: 0,
        },
    });
};
