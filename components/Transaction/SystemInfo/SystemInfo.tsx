import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useCallback } from 'react';
import PopUp from '@/components/ui/PopUp/PopUp';

interface SystemInfoProps {
  pointBorder: 'fill' | 'border';
  linePosition: 'up' | 'down';
  children: React.ReactNode;
}

export default function SystemInfo({ pointBorder, linePosition, children }: SystemInfoProps) {
  const { isDark } = useDarkTheme();

  const showTooltip = useCallback(() => {
    PopUp({
      variant: 'success-compact',
      title: 'Sin comisiones ocultas',
      text: '<strong>A diferencia de otros servicios, donde te enfrentás a una comisión de PayPal de 5.6% + 0.30 USD, nosotros absorbemos esos costos.</strong><br/><br/>Por Ejemplo: Si nos enviás 100 USD, te garantizamos que recibirás el equivalente completo de 100 USD, sin deducciones ocultas.',
      isHtml: true,
      isVertical: true,
      isDark,
    });
  }, [isDark]);

  return (
    <div className={`system-info-${linePosition}`}>
      <div className="data-container flex flex-row items-center">
        {pointBorder === 'fill' && <div className="line-joins-up mb-4 h-1 w-full bg-blue-500"></div>}
        <div className="system-info-container flex flex-row items-center">
          {pointBorder === 'border' && (
            <div className="icon-tooltip-container">
              <button className="more-info-icon show-tooltip flex" onClick={showTooltip}>
                <InfoOutlinedIcon className="mr-2 h-6 w-6 text-blue-800 dark:text-custom-whiteD" />
              </button>
            </div>
          )}
          <div className="quotation-container">{children}</div>
        </div>
      </div>
    </div>
  );
}