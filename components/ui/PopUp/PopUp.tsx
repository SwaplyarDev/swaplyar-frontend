import Swal from 'sweetalert2';
import { IPopUpProps } from './types';
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import { POPUP_VARIANTS } from './PopUpVariants';
import { ActionButtons } from './PopUpComponents/ActionButtons';
import { ReceiptGallery } from './PopUpComponents/ReceiptGallery';
import { ReceiptHeader } from './PopUpComponents/ReceiptHeader';

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
  isVertical = false,
  note,
  actionButton,
  status,
  iconSize,
  images
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
    isVertical,
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
      popup: 'w-full !max-w-[350px] !px-4 !py-6 sm-phone:!max-w-[510px] sm-phone:!px-6 navbar-desktop:!max-w-[556px] dark:bg-custom-grayD-800',
      htmlContainer: '!m-0 !p-0',
    },
    html: ReactDOMServer.renderToString(
      <ContentComponent 
        title={title}
        text={text}
        isHtml={isHtml}
        note={note}
        status={status}
        images={images}
        {...contentProps}
      />
    ),
    showConfirmButton: false,
    background: isDark ? '#4B4B4B' : '#FFFFFB',
    didRender: () => {
      console.log('didRender ejecutado');
      
      // Renderizar botones de acción si existen
      const backElement = document.getElementById('back-button-container');
      
      if (backElement) {
        const root = createRoot(backElement);
        root.render(<ActionButtons isDark={isDark} actionButton={actionButton} />);
      }

      // Renderizar header y galería si es la variante receipt-examples
      if (variant === 'receipt-examples') {
        // Renderizar header con flecha de retroceso
        const headerElement = document.getElementById('receipt-header-container');
        if (headerElement) {
          const headerRoot = createRoot(headerElement);
          headerRoot.render(<ReceiptHeader title={title} isDark={isDark} />);
        }

        // Renderizar galería de imágenes
        const galleryElement = document.getElementById('receipt-gallery-container');
        if (galleryElement) {
          const imagesData = galleryElement.getAttribute('data-images');
          const imagesArray = imagesData ? JSON.parse(imagesData) : images || [];
          const galleryRoot = createRoot(galleryElement);
          galleryRoot.render(<ReceiptGallery images={imagesArray} isDark={isDark} />);
        }
      }
    },
  });
};

export default PopUp;
