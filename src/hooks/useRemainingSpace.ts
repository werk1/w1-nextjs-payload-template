import { useEffect, useRef } from "react";

const useRemainingSpace = (footerRef?: React.RefObject<HTMLElement>) => { // Accept a footerRef instead of classFooter
    const remainingSpace = useRef(0);

    useEffect(() => {
        const updateRemainingSpace = () => {
            const footer = footerRef?.current; // Get the footer element from the ref
            const innerHeight = window.innerHeight;

            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const lowerYCoordinate = footerRect.bottom; // Y coordinate of the lower end
                remainingSpace.current = Math.max(0, innerHeight - lowerYCoordinate); // Simplified calculation
            } else {
                remainingSpace.current = innerHeight; // Default behavior if no footer
            }
        };

        updateRemainingSpace(); // Initial call to set the value

        const handleResize = () => {
            updateRemainingSpace(); // Update immediately on resize
        };

        window.addEventListener("resize", handleResize); // Update on resize

        return () => {
            window.removeEventListener("resize", handleResize); // Cleanup on unmount
        };
    }, [footerRef]); // Dependency array to run effect when footerRef changes

    return remainingSpace;
};

export { useRemainingSpace };
