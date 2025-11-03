import { ChevronLeft } from 'lucide-react';
import Swal from 'sweetalert2';

interface ReceiptHeaderProps {
  title?: string;
  isDark?: boolean;
  onClose?: () => void;
}

/**
 * Header interactivo con flecha de retroceso para receipt-examples
 * Se renderiza en didRender para tener funcionalidad de click
 */
export const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ 
  title = 'Ejemplos de comprobantes',
  isDark,
  onClose
}) => {
  const handleBack = () => {
    Swal.close();
  };

  return (
    <div className="flex items-center gap-3 w-full mb-4">
      <button 
        onClick={onClose || handleBack}
        className="flex items-center justify-center p-1"
        aria-label="Volver"
      >
        <ChevronLeft 
          size={24} 
          className="dark:text-darkText" 
        />
      </button>
      <h2 className="font-textFont text-lg sm-phone:text-xl dark:text-darkText">
        {title}
      </h2>
    </div>
  );
};
