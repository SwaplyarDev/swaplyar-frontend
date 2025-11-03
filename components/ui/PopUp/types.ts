import NETWORKS_DATA from './networksData';
import { TPopUpVariant } from './PopUpVariants';

/**
 * Tipos de botones de acción disponibles
 */
export type TActionButtonStyle = 'default' | 'cancel' | 'whatsapp';

/**
 * Tipo de icono del popup
 */
export type TIconType = 'success' | 'info' | 'warning' | 'error' | 'usdt';

/**
 * Tamaños disponibles para los iconos del popup
 */
export type TIconSize = 'small' | 'medium' | 'large';


/**
 * Mapeo de tamaños semánticos a valores numéricos en píxeles
 */
export const ICON_SIZE_MAP: Record<TIconSize, number> = {
  small: 48,
  medium: 72,
  large: 130, // Desktop size, mobile will be handled by wrapper
};

/**
 * Configuración del botón de acción
 */
export interface IActionButton {
  text: string;
  style: TActionButtonStyle;
  onClick: () => void;
}

/**
 * Props para el componente PopUp
 * 
 * @property variant - Variante del popup que determina el diseño y comportamiento
 * @property title - Título opcional del popup
 * @property text - Texto/contenido del popup
 * @property isHtml - Si true, el texto se renderiza como HTML (permite negrita, etc.)
 * @property isDark - Si true, usa el tema oscuro
 * @property isVertical - Si true, muestra el layout vertical (icono arriba del texto)
 * @property note - Nota adicional (solo para variante 'info-detailed')
 * @property actionButton - Configuración del botón de acción opcional
 * @property status - Estado o estados de la solicitud (string o array de strings para 'success-with-status')
 * @property iconSize - Tamaño del icono: 'small' (48px), 'medium' (72px), 'large' (100px mobile, 130px desktop)
 * @property images - Array de URLs de imágenes (para variante 'receipt-examples')
 */
export interface IPopUpProps {
  variant: TPopUpVariant;
  title?: string;
  text?: string;
  isHtml?: boolean;
  isDark: boolean;
  isVertical?: boolean;
  note?: string;
  actionButton?: IActionButton;
  status?: string | string[];
  iconSize?: TIconSize;
  images?: string[];

  networkName?: string;
  qrImage?: string;
  walletAddress?: string;
  networks?: INetworkOption[];
}

export type NetworkKey = keyof typeof NETWORKS_DATA;

export interface INetworkOption {
  value: string;
  label: string;
  wallet: string;
  image: JSX.Element;
  qrLight: string;
  qrDark: string;
}

