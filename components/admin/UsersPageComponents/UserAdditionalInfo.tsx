'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { User } from '@/types/user';

export function UserAdditionalInfo({ user }: { user: User }) {
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Inscripción</p>
            <p className="font-medium dark:text-gray-200">{user.createdAt}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="font-medium dark:text-gray-200">{user.profile.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apellido</p>
            <p className="font-medium dark:text-gray-200">{user.profile.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correo Electrónico</p>
            <p className="font-medium dark:text-gray-200">{user.profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nacionalidad</p>
            <p className="font-medium dark:text-gray-200">{user.profile.nationality || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">N° de Documento</p>
            <p className="font-medium dark:text-gray-200">{user.profile.identification}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Nacimiento</p>
            <p className="font-medium dark:text-gray-200">{user.profile.birthday}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">N° de Whatsapp</p>
            <p className="font-medium dark:text-gray-200">{user.profile.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
