import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

interface SystemInfoProps {
  pointBorder: 'fill' | 'border';
  linePosition: 'up' | 'down';
  children: React.ReactNode;
}

export default function SystemInfo({
  pointBorder,
  linePosition,
  children,
}: SystemInfoProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isDark } = useDarkTheme();

  const toggleTooltip = useCallback(() => {
    setIsTooltipVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isTooltipVisible) {
      // Guardar el ancho del scroll y aplicar no-scroll
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.classList.add('no-scroll');

      const showTooltip = () => {
        Swal.fire({
          title: 'Sin comisiones ocultas',
          html: `
            <p><b>A diferencia de otros servicios, donde te enfrentás a una comisión de PayPal de 5.6% + 0.30 USD, nosotros absorbemos esos costos.</b></p>
            <p>Por Ejemplo: Si nos enviás 100 USD, te garantizamos que recibirás el equivalente completo de 100 USD, sin deducciones ocultas.</p>
          `,
          icon: 'info',
          confirmButtonText: 'Aceptar',
          background: isDark ? 'rgb(69 69 69)' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          customClass: {
            confirmButton:
              'bg-[#0070ba] rounded-[23px] h-[45px] min-w-[150px] text-white border-none px-5 py-2.5 cursor-pointer hover:filter hover:brightness-95',
            container: 'custom-sw-container',
          },
          preConfirm: () => {
            toggleTooltip();
          },
          willClose: () => {
            setIsTooltipVisible(false);
            document.body.style.paddingRight = '0px';
            document.body.classList.remove('no-scroll');
          },
        });
      };

      showTooltip();
    } else {
      // Restaurar el padding cuando se cierra el tooltip
      document.body.style.paddingRight = '0px';
      document.body.classList.remove('no-scroll');
    }
  }, [isTooltipVisible, isDark, toggleTooltip]);

  return (
    <div className={`system-info-${linePosition}`}>
      <div className="data-container flex flex-row items-center">
        {pointBorder === 'fill' && (
          <div className="line-joins-up mb-4 h-1 w-full bg-blue-500"></div>
        )}
        <div className="system-info-container mt-5 flex flex-row items-center">
          {pointBorder === 'border' && (
            <div className="icon-tooltip-container">
              <button
                className="more-info-icon show-tooltip flex"
                onClick={() => setIsTooltipVisible(true)}
              >
                <InfoOutlinedIcon className="mr-2 h-6 w-6 text-blue-800 dark:text-white" />
              </button>
            </div>
          )}
          <div className="quotation-container">{children}</div>
        </div>
      </div>
    </div>
  );
}
