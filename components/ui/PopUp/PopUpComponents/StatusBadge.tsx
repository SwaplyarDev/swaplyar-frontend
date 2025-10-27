import { Check } from 'lucide-react';

interface StatusBadgeProps {
  status: string | string[];
}

/**
 * Badge de estado con check blanco en fondo negro
 * Puede renderizar uno o múltiples estados
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statuses = Array.isArray(status) ? status : [status];

  return (
    <div className="flex flex-col gap-3">
      {statuses.map((statusText, index) => (
        <div key={index} className="flex items-center gap-4">
          {/* Check blanco con fondo negro */}
          <div className="flex items-center justify-center size-5 bg-black rounded-full flex-shrink-0">
            <Check className="size-3 text-white" strokeWidth={3} />
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
