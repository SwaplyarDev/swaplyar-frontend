import clsx from 'clsx';

interface PopUpButtonProps {
  text: string;
  onClick: () => void;
  isDark?: boolean;
  variant: 'default' | 'cancel' | 'whatsapp';
  className?: string;
}

/**
 * Botón específico para PopUps que no depende de ThemeProvider
 * 
 * Soporta 3 variantes:
 * - default: Estilos normales de botón (azul/oscuro según isDark)
 * - cancel: Botón rojo para cancelaciones
 * - whatsapp: Botón verde para WhatsApp
 */
export const PopUpButton: React.FC<PopUpButtonProps> = ({ 
  text, 
  onClick, 
  isDark = false, 
  variant,
  className = '' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cancel':
        return 'bg-errorColorDark border-errorColorDark text-white hover:bg-red-700 dark:bg-red-600 dark:border-red-600 dark:text-white';
      case 'whatsapp':
        return 'bg-[#25D366] border-[#25D366] text-white hover:bg-[#20BD5A] dark:bg-[#25D366] dark:border-[#25D366] dark:text-white';
      case 'default':
      default:
        return isDark 
          ? 'border-darkText bg-darkText text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText'
          : 'border-buttonsLigth bg-buttonsLigth text-white dark:border-darkText dark:bg-darkText dark:text-lightText';
    }
  };

  const baseClass = `
    relative flex items-center justify-center
    rounded-3xl border p-3 font-textFont font-semibold
    h-[38px] w-auto min-w-[196px] sm-phone:min-w-[246px] desktop:min-w-[296px] px-6
    sm:h-[45px] lg:h-[48px]
  `;

  const finalClass = clsx(baseClass, getVariantStyles(), className);

  return (
    <button onClick={onClick} className={finalClass}>
      <span className='text-sm sm-phone:text-lg'>{text}</span>
    </button>
  );
};
