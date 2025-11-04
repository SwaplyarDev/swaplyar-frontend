import { useState } from 'react';
import { ReceiptHeader } from './ReceiptHeader';
import { Check, X } from 'lucide-react';

interface ReceiptGalleryProps {
  images: string[];
  isDark?: boolean;
}

/**
 * Componente de galería interactiva para mostrar ejemplos de comprobantes
 * Permite hacer click en las imágenes para ampliarlas
 */
export const ReceiptGallery: React.FC<ReceiptGalleryProps> = ({ images, isDark }) => {
  const [expandedImage, setExpandedImage] = useState<{ url: string; index: number } | null>(null);

  const handleImageClick = (imageUrl: string, index: number) => {
    setExpandedImage({ url: imageUrl, index });
  };

  const handleCloseExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedImage(null);
  };

  const isAccepted = expandedImage?.index === 0;

  return (
    <>
      {/* Galería de imágenes */}
      <div className="flex gap-6 sm-phone:gap-12 justify-center w-full h-[224px] sm-phone:h-[325px] sm-tablet2:h-[445px]">
        {images.slice(0, 2).map((imageUrl, index) => (
          <div key={index} className='relative'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              onClick={() => handleImageClick(imageUrl, index)}
              src={imageUrl}
              alt={`Ejemplo de comprobante ${index + 1}`}
              className={`rounded-xl border-[3px] ${index === 0 ? 'border-custom-green' : 'border-errorColorDark'} object-contain w-[106px] h-[224px] sm-phone:w-[153px] sm-phone:h-[324px] sm-tablet2:w-[210px] sm-tablet2:h-[445px]`}
            />
            {index === 0 ? (
              <div className="absolute bottom-2 right-2 bg-green-700 rounded-full size-5 flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            ) : (
              <div className="absolute bottom-2 right-2 bg-errorColorDark rounded-full size-5 flex items-center justify-center">
                <X size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de imagen expandida */}
      {expandedImage && (
        <div
          className="absolute inset-0 z-[9999] w-full h-full self-center justify-self-center rounded-xl !max-w-[350px] !px-4 !py-6 sm-phone:!max-w-[510px] sm-phone:!px-6 navbar-desktop:!max-w-[556px] dark:bg-custom-grayD-800"
          onClick={handleCloseExpanded}
        >
          <ReceiptHeader onClose={() => handleCloseExpanded} />
          <div className={`${isDark ? 'bg-custom-grayD-800' : 'bg-custom-whiteD-500'} relative flex flex-col h-[90%] sm-phone:h-[92%] gap-2 items-center`} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expandedImage.url}
              alt="Comprobante ampliado"
              className="flex flex-1 object-contain rounded-lg h-[inherit]"
            />
            <div className={`max-w-max inline-flex items-center gap-2 px-4 py-2 rounded-full text-white ${isAccepted
                ? 'bg-green-700'
                : 'bg-errorColorDark'
              }`}>
              {isAccepted ? (
                <>
                  <Check size={20} />
                  <span className="font-textFont text-sm font-semibold">
                    Imagen aceptada
                  </span>
                </>
              ) : (
                <>
                  <X size={20} />
                  <span className="font-textFont text-sm font-semibold text-white">
                    Imagen no aceptada
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
