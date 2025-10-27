import { plane } from '@/utils/assets/imgDatabaseCloudinary';
import { TIconType } from '../types';
import { getIconByType } from '@/utils/utils';

interface IconComponentProps {
  iconType?: TIconType;
  title?: string;
  isDark?: boolean;
}

/**
 * Icono de avión con badge de success en la esquina superior izquierda
 */
export const PlaneWithBadge: React.FC<IconComponentProps> = ({ iconType = 'success' }) => (
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
    <div className="absolute -top-2 -left-2 w-10 h-10">
      {getIconByType(iconType)}
    </div>
  </div>
);

/**
 * Icono con título al lado (horizontal o vertical)
 */
export const IconWithTitle: React.FC<IconComponentProps & { isVertical?: boolean }> = ({ 
  iconType = 'success',
  title, 
  isVertical = false,
  isDark 
}) => (
  <div className={`flex items-center justify-center gap-2 w-full mb-6 ${isVertical ? 'flex-col' : 'flex-row'}`}>
    <div className="relative">
      <div className="size-[72px]">
        {getIconByType(iconType)}
      </div>
    </div>
    <h2 className="font-textFont text-3xl sm-phone:text-4xl text-custom-blue font-semibold dark:text-darkText text-center">
      {title}
    </h2>
  </div>
);

/**
 * Icono centrado grande (para info)
 */
export const CenteredIcon: React.FC<IconComponentProps> = ({ iconType = 'info' }) => (
  <div className="flex justify-center w-full mb-6">
    {getIconByType(iconType)}
  </div>
);

/**
 * Icono simple centrado con altura limitada (para error/warning)
 */
export const SimpleIcon: React.FC<IconComponentProps> = ({ iconType = 'error' }) => (
  <div className="flex justify-center w-full max-h-[130px] sm-phone:max-h-[145px] mb-6">
    {getIconByType(iconType)}
  </div>
);
