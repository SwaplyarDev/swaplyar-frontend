import Swal from 'sweetalert2';
import { IPopUpProps } from './types';
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import { POPUP_VARIANTS } from './PopUpVariants';
import { ActionButtons } from './PopUpComponents/ActionButtons';

/**
 * PopUp Component - Sistema de alertas con variantes predefinidas
 * 
 * @description
 * Componente que muestra alertas/notificaciones usando SweetAlert2 con un sistema
 * de variantes predefinidas que determinan el diseño y comportamiento del popup.
 * 
 * @example
 * // Success completo con avión
 * PopUp({
 *   variant: 'success-full',
 *   title: '¡Solicitud enviada!',
 *   text: 'Tu solicitud ha sido procesada correctamente',
 *   isDark: false
 * });
 * 
 * @example
 * // Info detallado con nota y botón de acción
 * PopUp({
 *   variant: 'info-detailed',
 *   title: 'Información importante',
 *   text: 'Por favor revisa los siguientes datos',
 *   note: 'Esta información es confidencial',
 *   isDark: false,
 *   actionButton: {
 *     text: 'Cancelar',
 *     style: 'cancel',
 *     onClick: () => console.log('Cancelado')
 *   }
 * });
 */
export const PopUp = ({ 
  variant, 
  title, 
  text, 
  isHtml = false, 
  isDark, 
  note,
  actionButton,
  status,
  iconSize
}: IPopUpProps) => {
  // Obtener configuración de la variante
  const variantConfig = POPUP_VARIANTS[variant];
  
  if (!variantConfig) {
    console.error(`Variante de PopUp no encontrada: ${variant}`);
    return;
  }

  const { iconComponent: IconComponent, contentComponent: ContentComponent, iconProps = {}, contentProps = {} } = variantConfig;

  // Combinar props del usuario con props de configuración
  // El iconSize del usuario tiene prioridad sobre el default de la variante
  const mergedIconProps = {
    ...iconProps,
    title,
    isDark,
    ...(iconSize && { iconSize }), // Override si el usuario lo especifica
  };

  console.log('ActionButton recibido:', actionButton);

  Swal.fire({
    icon: undefined,
    iconHtml: ReactDOMServer.renderToString(
      <IconComponent {...mergedIconProps} />
    ),
    customClass: {
      icon: 'border-none',
      popup: 'w-full !max-w-[350px] !px-4 !py-6 sm-phone:!max-w-[510px] sm-phone:!px-6 navbar-desktop:!max-w-[556px]',
      htmlContainer: '!m-0 !p-0',
    },
    html: ReactDOMServer.renderToString(
      <ContentComponent 
        title={title}
        text={text}
        isHtml={isHtml}
        note={note}
        status={status}
        {...contentProps}
      />
    ),
    showConfirmButton: false,
    background: isDark ? '#4B4B4B' : '#FFFFFB',
    didRender: () => {
      console.log('didRender ejecutado');
      const backElement = document.getElementById('back-button-container');
      console.log('Elemento encontrado:', backElement);
      console.log('ActionButton en didRender:', actionButton);
      
      if (backElement) {
        const root = createRoot(backElement);
        root.render(<ActionButtons isDark={isDark} actionButton={actionButton} />);
      }
    },
  });
};

export default PopUp;
