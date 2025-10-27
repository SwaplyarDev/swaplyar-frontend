import { 
  PlaneWithBadge, 
  IconWithTitle, 
  CenteredIcon, 
  SimpleIcon 
} from './PopUpComponents/IconComponents';
import { 
  FullContent, 
  TextOnlyContent, 
  DetailedContent, 
  SimpleContent,
  StatusContent 
} from './PopUpComponents/ContentComponents';
import { TIconType } from './types';

/**
 * Tipos de variantes disponibles para el PopUp
 */
export type TPopUpVariant = 
  | 'success-full'        // Success con avión + título grande + texto
  | 'success-compact'     // Success sin avión + icono/título lado a lado + texto
  | 'info-detailed'       // Info con icono centrado + título + texto + nota
  | 'simple-error'        // Error simple: icono + título pequeño
  | 'simple-warning'      // Warning simple: icono + título pequeño
  | 'success-with-status' // Success con icono/título + texto + estado(s) + botón WhatsApp + avión (tablet+)
  | 'warning-with-cancel'; // Warning con icono centrado + título + texto + botones (atrás + cancelar)

/**
 * Configuración de una variante de PopUp
 */
interface PopUpVariantConfig {
  icon: TIconType;
  iconComponent: React.ComponentType<any>;
  contentComponent: React.ComponentType<any>;
  iconProps?: Record<string, any>;
  contentProps?: Record<string, any>;
}

/**
 * Configuración de todas las variantes disponibles
 */
export const POPUP_VARIANTS: Record<TPopUpVariant, PopUpVariantConfig> = {
  'success-full': {
    icon: 'success',
    iconComponent: PlaneWithBadge,
    contentComponent: FullContent,
    iconProps: { iconType: 'success' },
  },
  'success-compact': {
    icon: 'success',
    iconComponent: IconWithTitle,
    contentComponent: TextOnlyContent,
    iconProps: { iconType: 'success', isVertical: false },
  },
  'info-detailed': {
    icon: 'info',
    iconComponent: CenteredIcon,
    contentComponent: DetailedContent,
    iconProps: { iconType: 'info' },
  },
  'simple-error': {
    icon: 'error',
    iconComponent: SimpleIcon,
    contentComponent: SimpleContent,
    iconProps: { iconType: 'error' },
  },
  'simple-warning': {
    icon: 'warning',
    iconComponent: SimpleIcon,
    contentComponent: SimpleContent,
    iconProps: { iconType: 'warning' },
  },
  'success-with-status': {
    icon: 'success',
    iconComponent: IconWithTitle,
    contentComponent: StatusContent,
    iconProps: { iconType: 'success', isVertical: false },
  },
  'warning-with-cancel': {
    icon: 'warning',
    iconComponent: CenteredIcon,
    contentComponent: FullContent,
    iconProps: { iconType: 'warning' },
  },
};
