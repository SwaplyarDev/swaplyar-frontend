import { Check } from 'lucide-react';

interface StatusBadgeProps {
  status: string | string[];
}

/**
 * Badge de estado con check blanco en fondo negro
 * Puede renderizar uno o múltiples estados con animación de timeline
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statuses = Array.isArray(status) ? status : [status];

  return (
    <div className="flex flex-col gap-0">
      {statuses.map((statusText, index) => (
        <div 
          key={index} 
          className="flex items-center gap-4 animate-fade-in h-8"
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          {/* Contenedor del icono y línea */}
          <div className="relative flex flex-col items-center">
            {/* Check blanco con fondo negro */}
            <div className="flex items-center justify-center size-5 bg-black dark:bg-darkText rounded-full flex-shrink-0 z-10">
              <Check className="size-3 text-white" strokeWidth={3} />
            </div>
            
            {/* Línea conectora (solo si no es el último elemento) */}
            {index < statuses.length - 1 && (
              <div 
                className="w-[2px] h-[16px] bg-custom-grayD-800 dark:bg-darkText absolute top-[20px]"
                style={{ 
                  animation: 'lineGrowDown 0.5s ease-out forwards',
                  animationDelay: `${index * 0.5}s`
                }}
              />
            )}
          </div>
          
          {/* Texto del estado */}
          <span className="font-textFont text-base dark:text-darkText">
            {statusText}
          </span>
        </div>
      ))}
    </div>
  );
};
