'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// interface User {
//   date_subscription: string;
//   name: string;
//   lastName: string;
//   email: string;
//   nationality: string;
//   document_number: string;
//   birth_date: string;
//   phone_full: string;
// }

interface User {
  // jh: string;
  fullName: string;
  email: string;
  created_at: string;
  rol: string;
  isActive: boolean;
  terms: boolean;
  validation_at: string | null;
  profile?: {
    age: string;
    birthdate: string;
    email: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    fullName: string;
    gender: string;
    identification: string;
    phone: string;
    users_id: string;
    social_id: string;
    img_url: string;
    location_id: string;
    last_activity: string;
  };
}

export function UserInfo({ user }: { user: User }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const now: number = Date.now();

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
            <p className="font-medium dark:text-gray-200">{user.created_at ? user.created_at : now.toString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="font-medium dark:text-gray-200">{user.profile?.first_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apellido</p>
            <p className="font-medium dark:text-gray-200">{user.profile?.last_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correo Electrónico</p>
            <p className="font-medium dark:text-gray-200">{user.profile?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
