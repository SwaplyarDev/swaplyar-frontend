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
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4 flex space-x-2 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'frente' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => handleTabChange('frente')}
        >
          FRENTE
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'dorso' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => handleTabChange('dorso')}
        >
          DORSO
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'foto' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => handleTabChange('foto')}
        >
          FOTO
        </button>
      </div>
      <div className="flex justify-center p-4">
        {activeTab === 'frente' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-white">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        )}
        {activeTab === 'dorso' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-white">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        )}
        {activeTab === 'foto' && (
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-white">
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Verificar documentación
        </button>
      </div>

      {isModalOpen && <VerificationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
