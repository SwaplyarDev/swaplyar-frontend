import Swal from 'sweetalert2';
import { ChevronLeft } from 'lucide-react';
import { PopUpButton } from './PopUpButton';
import { IActionButton } from '../types';

interface ActionButtonsProps {
  isDark?: boolean;
  actionButton?: IActionButton;
}

/**
 * Botón de volver (flecha)
 */
const BackArrowButton: React.FC<{ isDark?: boolean }> = ({ isDark }) => (
  <button
    type="button"
    onClick={() => Swal.close()}
    className="btn-back items-center relative flex h-[38px] sm-phone:h-12 rounded-full hover:bg-transparent dark:text-darkText dark:bg-none"
  >
    <div className="relative size-8 sm-phone:size-12 overflow-hidden content-center">
      <ChevronLeft
        color={isDark ? '#ebe7e0' : '#252526'}
        width={32}
        height={32}
        strokeWidth={2}
        className="inline-block sm-phone:size-10"
      />
    </div>
  </button>
);

/**
 * Contenedor de botones de acción para PopUp
 * Muestra botón de volver + botón de acción opcional con justify-between
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({ isDark, actionButton }) => {
  // Si no hay botón de acción, solo mostrar el botón de volver centrado
  if (!actionButton) {
    return (
      <div className="flex items-center justify-center">
        <BackArrowButton isDark={isDark} />
      </div>
    );
  }

  // Si hay botón de acción, mostrar ambos con justify-between
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Botón de volver */}
      <BackArrowButton isDark={isDark} />

      {/* Botón de acción */}
      <div className="flex-1 flex justify-end">
        <PopUpButton
          text={actionButton.text}
          onClick={actionButton.onClick}
          isDark={isDark}
          variant={actionButton.style}
        />
      </div>
    </div>
  );
};;
