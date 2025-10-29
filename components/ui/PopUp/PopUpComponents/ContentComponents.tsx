import { StatusBadge } from './StatusBadge';
import { plane, comprobanteBienHecho, comprobanteMalHecho } from '@/utils/assets/imgDatabaseCloudinary';
import { ZoomIn } from 'lucide-react';

interface ContentComponentProps {
  title?: string;
  text?: string;
  note?: string;
  isHtml?: boolean;
  isDark?: boolean;
  status?: string | string[];
  images?: string[];
}

/**
 * Renderiza texto con soporte para HTML
 */
const TextContent: React.FC<{ text?: string; isHtml?: boolean; className?: string }> = ({ 
  text, 
  isHtml, 
  className = "font-textFont dark:text-darkText" 
}) => {
  if (!text) return null;
  
  return isHtml ? (
    <p className={className} dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    <p className={className}>{text}</p>
  );
};

/**
 * Contenido completo para success con avión: Título grande + Texto + Botón
 */
export const FullContent: React.FC<ContentComponentProps> = ({ title, text, isHtml, isDark }) => (
  <div className='flex flex-col gap-6'>
    <h2 className="font-textFont text-3xl sm-phone:text-4xl text-custom-blue font-semibold dark:text-darkText">
      {title}
    </h2>
    <TextContent text={text} isHtml={isHtml} />
    <div id="back-button-container" className="flex items-center justify-center"></div>
  </div>
);

/**
 * Contenido solo con texto (sin título) para success compacto
 */
export const TextOnlyContent: React.FC<ContentComponentProps> = ({ text, isHtml, isDark }) => (
  <div className='flex flex-col gap-6'>
    <TextContent text={text} isHtml={isHtml} />
    <div id="back-button-container" className="flex items-center justify-center"></div>
  </div>
);

/**
 * Contenido detallado para info: Título + Texto + Nota + Botón (todo centrado)
 */
export const DetailedContent: React.FC<ContentComponentProps> = ({ title, text, note, isHtml, isDark }) => (
  <div className='flex flex-col gap-6'>
    <h2 className="font-textFont text-lg sm-phone:text-3xl font-semibold text-custom-blue dark:text-darkText text-center">
      {title}
    </h2>
    <TextContent text={text} isHtml={isHtml} className="font-textFont dark:text-darkText text-center text-base sm-phone:text-lg" />
    {note && (
      <p className="font-textFont text-start text-[10px] sm-phone:text-sm dark:text-darkText">
        <strong className='text-custom-blue'>Nota: </strong>{note}
      </p>
    )}
    <div id="back-button-container" className="flex items-center justify-center"></div>
  </div>
);

/**
 * Contenido simple para error/warning: Solo título pequeño + Botón
 */
export const SimpleContent: React.FC<ContentComponentProps> = ({ title, isDark }) => (
  <div className='flex flex-col gap-6'>
    <h2 className="font-textFont text-lg sm-phone:text-2xl font-semibold dark:text-darkText">
      {title}
    </h2>
    <div id="back-button-container" className="flex items-center justify-center"></div>
  </div>
);

/**
 * Contenido con estado para success-with-status: Texto + StatusBadge + Botón
 * En tablet/desktop muestra imagen de avión en esquina inferior derecha
 */
export const StatusContent: React.FC<ContentComponentProps> = ({ text, status, isHtml, isDark }) => (
  <div className='flex flex-col gap-6 static'>
    {/* Texto descriptivo */}
    <TextContent text={text} isHtml={isHtml} />
    
    {/* Badge(s) de estado */}
    {status && <StatusBadge status={status} />}
    
    {/* Contenedor de botones */}
    <div id="back-button-container" className="flex items-center justify-center"></div>
    
    {/* Avión en esquina inferior derecha - solo visible en tablet+ */}
    <div className="hidden sm-phone:block absolute -bottom-16 -right-11 pointer-events-none z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={plane}
        alt="Imagen del avión"
        width={136}
        height={136}
      />
    </div>
  </div>
);

/**
 * Contenido para galería de ejemplos de comprobantes con imágenes ampliables
 */
export const ReceiptExamplesContent: React.FC<ContentComponentProps> = ({ 
  text = 'Sube foto o captura del <strong>comprobante de pago legible.</strong> Asegúrate de que se vea el <strong>monto, fecha y destinatario.</strong>',
  images = [comprobanteBienHecho, comprobanteMalHecho],
  isHtml,
  isDark 
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {/* Texto descriptivo */}
      <TextContent text={text} isHtml={isHtml} className="font-textFont text-sm text-start dark:text-darkText" />
      
      {/* Instrucción con icono de lupa */}
      <div className="flex items-center gap-2 text-sm dark:text-darkText">
        <ZoomIn size={20} className="flex-shrink-0" />
        <span className="font-textFont">Toca una imagen para ampliarla</span>
      </div>
      
      {/* Galería de imágenes - Se renderiza interactiva en didRender */}
      <div id="receipt-gallery-container" data-images={JSON.stringify(images)}></div>
    </div>
  );
};
