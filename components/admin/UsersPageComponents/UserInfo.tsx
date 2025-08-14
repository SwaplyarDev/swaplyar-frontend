'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '@/utils/utils';
import { useUserVerify } from '@/hooks/admin/usersPageHooks/useUserVerifyState';

export function UserInfo() {
  const { verificationById } = useUserVerify();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Informacion Basica del Usuario</h3>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Inscripción</p>
            <p className="font-medium dark:text-gray-200">{formatDate(verificationById.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="font-medium dark:text-gray-200">{verificationById.user.firstName}</p>
          </div>
           <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apellido</p>
            <p className="font-medium dark:text-gray-200">{verificationById.user.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correo Electrónico</p>
            <p className="font-medium dark:text-gray-200">{verificationById.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
