import { useState, useEffect } from 'react';

const mobileMaxDeviceWidth = 767;
const tabletMinDeviceWidth = 768;
const tabletMaxDeviceWidth = 991;
const smallMonitorMinDeviceWidth = 992;
const smallMonitorMaxDeviceWidth = 1200;
const largeMonitorMinDeviceWidth = 1201;

export const mobileMediaQuery = `(max-width: ${mobileMaxDeviceWidth}px)`;
export const tabletMediaQuery = `(min-width: ${tabletMinDeviceWidth}px) and (max-width: ${tabletMaxDeviceWidth}px)`;
export const smallMonitorMediaQuery = `(min-width: ${smallMonitorMinDeviceWidth}px) and (max-width: ${smallMonitorMaxDeviceWidth}px)`;
export const largeMonitorMediaQuery = `(min-width: ${largeMonitorMinDeviceWidth}px)`;

function useMedia(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);

        media.addListener(listener);

        return () => media.removeListener(listener);
    }, [query]);

    return matches;
}

export default useMedia;
