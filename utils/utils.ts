import { IconBadgeCheck, IconError, IconInfo, IconWarning } from '@/components/ui/PopUp/Icons';
import { TIconType } from '@/components/ui/PopUp/types';
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
 */
export const getIconByType = (type: TIconType): JSX.Element | null => {
  switch (type) {
    case 'success':
      return IconBadgeCheck();
    case 'info':
      return IconInfo();
    case 'warning':
      return IconWarning();
    case 'error':
      return IconError();
    default:
      return null;
  }
};