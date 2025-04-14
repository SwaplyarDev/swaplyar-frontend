'use client';

import { useState } from 'react';
import { FileText, User } from 'lucide-react';
import { VerificationModal } from './VerficationModal';

export function UserDocumentSection() {
  const [activeTab, setActiveTab] = useState('frente');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex space-x-2 border-b dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'frente'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => handleTabChange('frente')}
        >
          FRENTE
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'dorso'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => handleTabChange('dorso')}
        >
          DORSO
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'foto'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => handleTabChange('foto')}
        >
          FOTO
        </button>
      </div>
      <div className="flex justify-center p-4">
        {activeTab === 'frente' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        )}
        {activeTab === 'dorso' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        )}
        {activeTab === 'foto' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Verificar documentación
        </button>
      </div>

      {isModalOpen && <VerificationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
