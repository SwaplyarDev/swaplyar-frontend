'use client';

import type React from 'react';
import { useSelectedStatusFilter } from '@/hooks/admin/usersPageHooks/useSelectedStatusFilter';

// Definir tipos para los estados
interface StatusItem {
  id: string;
  colorClass: string;
  outlineClass: string;
  label: string;
  description: string;
}

interface StatusGroup {
  title: string;
  items: StatusItem[];
}

// Componente para un grupo de estados
const StatusGroup: React.FC<
  StatusGroup & {
    selectedItem: string[];
    onSelectItem: (itemId: string) => void;
  }
> = ({ title, items, selectedItem, onSelectItem }) => {
  return (
    <div
      className={`flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${title === 'Status SwaplyAr' ? 'col-span-4' : 'col-span-3'}`}
    >
      <div className="border-b bg-[#012a8d] px-4 py-3 dark:bg-gray-700/50">
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
        {items.map((item) => {
          const isSelected = selectedItem.includes(item.id);

          return (
            <div
              key={item.id}
              className={`w-full cursor-pointer p-4 transition-all duration-300 ${
                isSelected
                  ? `${item.colorClass} ${item.colorClass.replace('bg-', 'text-')} bg-opacity-10 shadow-sm`
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'
              } `}
              onClick={() => onSelectItem(item.id)}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${item.colorClass} ${item.outlineClass}`}></span>
                <span className={`font-medium`}>{item.label}</span>
              </div>
              <p
                className={`ml-5 text-xs ${isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente principal que contiene todos los grupos de estados
const UsersStatus: React.FC = () => {
  // Estado para rastrear el elemento seleccionado
  const { selectedItem: contextSelectedItem, handleSelect } = useSelectedStatusFilter();

  // Datos de estados con clases de Tailwind predefinidas
  const statusGroups: StatusGroup[] = [
    {
      title: 'Status SwaplyAr',
      items: [
        {
          id: 'verified',
          colorClass: 'bg-green-600',
          outlineClass: 'outline outline-1 outline-offset-2 outline-green-600',
          label: 'Verificado',
          description: 'El cliente ha sido verificado',
        },
        {
          id: 'inprogress',
          colorClass: 'bg-orange-600',
          outlineClass: 'outline outline-1 outline-offset-2 outline-orange-600',
          label: 'En Progreso',
          description: 'El cliente está en proceso de verificación',
        },
        {
          id: 'rejected',
          colorClass: 'bg-red-600',
          outlineClass: 'outline outline-1 outline-offset-2 outline-red-600',
          label: 'Rechazado',
          description: 'El cliente ha sido rechazado',
        },
      ],
    },
  ];

  return (
    <div className="grid w-full grid-cols-7 gap-4">
      {statusGroups.map((group, index) => (
        <StatusGroup
          key={index}
          title={group.title}
          items={group.items}
          selectedItem={contextSelectedItem}
          onSelectItem={handleSelect}
        />
      ))}
    </div>
  );
};

export default UsersStatus;
