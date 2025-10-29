import { plane } from '@/utils/assets/imgDatabaseCloudinary';
import { TIconType, TIconSize, ICON_SIZE_MAP } from '../types';
import { getIconByType, getIconSizeClass } from '@/utils/utils';
import { ChevronLeft } from 'lucide-react';
import Swal from 'sweetalert2';

interface IconComponentProps {
  iconType?: TIconType;
  iconSize?: TIconSize;
  title?: string;
  isDark?: boolean;
}

/**
 * Icono de avión con badge de success en la esquina superior izquierda
 */
export const PlaneWithBadge: React.FC<IconComponentProps> = ({ 
  iconType = 'success',
  iconSize = 'large' 
}) => {
  const numericSize = ICON_SIZE_MAP[iconSize];
  
  return (
    <div className="flex justify-center w-full">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plane}
          alt="Imagen del avión"
          width={136}
          height={136}
        />
      </div>
      <div className={`absolute -top-2 -left-2 ${getIconSizeClass(iconSize)}`}>
        {getIconByType(iconType, numericSize)}
      </div>
    </div>
  );
};

/**
 * Icono con título al lado (horizontal o vertical)
 */
export const IconWithTitle: React.FC<IconComponentProps & { isVertical?: boolean }> = ({ 
  iconType = 'success',
  iconSize = 'medium',
  title, 
  isVertical = false,
}) => {
  const numericSize = ICON_SIZE_MAP[iconSize];
  
  return (
    <div className={`flex items-center justify-between gap-2 w-full mb-6 ${isVertical ? 'flex-col' : 'flex-row'}`}>
      <div className={getIconSizeClass(iconSize)}>
        {getIconByType(iconType, numericSize)}
      </div>
      <h2 className="font-textFont text-[28px] leading-8 sm-phone:text-4xl text-custom-blue font-semibold dark:text-darkText text-center">
        {title}
      </h2>
    </div>
  );
};

/**
 * Icono centrado grande (para info)
 */
export const CenteredIcon: React.FC<IconComponentProps> = ({ 
  iconType = 'info',
  iconSize = 'large'
}) => {
  const numericSize = ICON_SIZE_MAP[iconSize];
  
  return (
    <div className={`flex justify-center w-full mb-6 ${getIconSizeClass(iconSize)}`}>
      {getIconByType(iconType, numericSize)}
    </div>
  );
};

/**
 * Icono simple centrado con altura limitada (para error/warning)
 */
export const SimpleIcon: React.FC<IconComponentProps> = ({ 
  iconType = 'error',
  iconSize = 'medium'
}) => {
  const numericSize = ICON_SIZE_MAP[iconSize];
  
  return (
    <div className={`flex justify-center w-full mb-6 ${getIconSizeClass(iconSize)}`}>
      {getIconByType(iconType, numericSize)}
    </div>
  );
};

/**
 * Placeholder vacío para receipt-examples (el header se renderiza en didRender)
 */
export const EmptyIcon: React.FC<IconComponentProps> = () => {
  return <div id="receipt-header-container"></div>;
};
