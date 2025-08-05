'use client';
import { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { User } from '@/types/user';
import { DetailedVerificationItem } from '@/types/verifiedUsers';
import { formatDate } from '@/utils/utils';

export function UserAdditionalInfo({ user }: { user: DetailedVerificationItem }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Información Adicional</h3>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isExpanded ? 'Colapsar sección' : 'Expandir sección'}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {user.verification_status === 'rejected' && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/30 dark:bg-red-900/20">
            <div className="flex items-start">
              <AlertCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-500" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                  Verificación de usuario rechazada
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Inscripción</p>
            <p className="font-medium dark:text-gray-200">{formatDate(user.created_at)  || 'No disponible'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="font-medium dark:text-gray-200">{user.user.firstName || 'No disponible'}</p>
          </div>
           <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apellido</p>
            <p className="font-medium dark:text-gray-200">{user.user.lastName || 'No disponible'}</p>
          </div> 
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correo Electrónico</p>
            <p className="font-medium dark:text-gray-200">{user.user.email || 'No disponible'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">N° de Documento</p>
            <p className="font-medium dark:text-gray-200">{user.user.identification || 'No disponible'}</p>
          </div>
           <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Nacimiento</p>
            <p className="font-medium dark:text-gray-200">{user.user.birthday || 'No disponible'}</p>
          </div> 
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">N° de Whatsapp</p>
            <p className="font-medium dark:text-gray-200">{user.user.phone || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
