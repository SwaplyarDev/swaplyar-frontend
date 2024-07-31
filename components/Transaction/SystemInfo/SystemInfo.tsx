// /SystemInfo

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

interface SystemInfoProps {
    pointBorder: "fill" | "border";
    linePosition: "up" | "down";
    children: React.ReactNode;
}

export default function SystemInfo({ pointBorder, linePosition, children }: SystemInfoProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
    };

    return (
        <div className={`system-info-${linePosition}`}>
            <div className="data-container flex flex-row items-center">
                {pointBorder === 'fill' && <div className="line-joins-up h-1 bg-blue-500 w-full mb-4"></div>}
                <div className="system-info-container flex flex-row items-center">
                    {pointBorder === 'border' && (
                        <div className="icon-tooltip-container">
                            <button className="more-info-icon show-tooltip" onClick={toggleTooltip}>
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </button>
                            {isTooltipVisible && (
                                <div className="tooltip bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded shadow-md">
                                    <p>
                                        <b>
                                            A diferencia de otros servicios, donde te enfrentás a una comisión de PayPal de 5.6% + 0.30 USD, nosotros absorbemos esos costos.
                                        </b>
                                    </p>
                                    <p>
                                        Por Ejemplo: Si nos enviás 100 USD, te garantizamos que recibirás el equivalente completo de 100 USD, sin deducciones ocultas.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="quotation-container">{children}</div>
                </div>
            </div>
        </div>
    );
}
