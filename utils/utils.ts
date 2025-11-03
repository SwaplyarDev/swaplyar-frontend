import { IconBadgeCheck, IconError, IconInfo, IconTheter, IconWarning } from '@/components/ui/PopUp/Icons';
import { TIconSize, TIconType } from '@/components/ui/PopUp/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para formatear la fecha
export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};


/**
 * Obtiene el componente de icono según el tipo
 * @param type - Tipo de icono a renderizar
 * @param size - Tamaño del icono en píxeles (opcional)
 */
export const getIconByType = (type: TIconType, size?: number) => {
  switch (type) {
    case 'success':
      return IconBadgeCheck({ size });
    case 'info':
      return IconInfo({ size });
    case 'warning':
      return IconWarning({ size });
    case 'error':
      return IconError({ size });
    case 'usdt':
      return IconTheter({ size });
    default:
      return null;
  }
};

/**
 * Obtiene las clases Tailwind para el tamaño del icono
 * Maneja el comportamiento responsive para el tamaño 'large'
 */
export const getIconSizeClass = (size: TIconSize = 'medium'): string => {
  switch (size) {
    case 'small':
      return 'size-12'; // 48px
    case 'medium':
      return 'size-[72px]';
    case 'large':
      return 'size-[100px] sm-phone:size-[130px]';
    default:
      return 'size-[72px]';
  }
};
