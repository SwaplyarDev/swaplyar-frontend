import { TPopUpVariant } from './PopUpVariants';

/**
 * Tipos de botones de acción disponibles
 */
export type TActionButtonStyle = 'default' | 'cancel' | 'whatsapp';

/**
 * Tipo de icono del popup
 */
export type TIconType = 'success' | 'info' | 'warning' | 'error';

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
 * @property note - Nota adicional (solo para variante 'info-detailed')
 * @property actionButton - Configuración del botón de acción opcional
 * @property status - Estado o estados de la solicitud (string o array de strings para 'success-with-status')
 */
export interface IPopUpProps {
  variant: TPopUpVariant;
  title?: string;
  text?: string;
  isHtml?: boolean;
  isDark: boolean;
  note?: string;
  actionButton?: IActionButton;
  status?: string | string[];
}

