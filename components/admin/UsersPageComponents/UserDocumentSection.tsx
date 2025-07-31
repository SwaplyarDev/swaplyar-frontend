'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FileText, User, ChevronDown, ChevronUp } from 'lucide-react';
import { VerificationModal } from './VerficationModal';
import { UserAdditionalInfo } from './UserAdditionalInfo';
import { UserVerificationForm } from './UserVerificationForm';
import { User as UserType } from '@/types/user';
import auth from '@/auth';
import { DetailedVerificationItem } from '@/types/verifiedUsers';

interface UserDocumentSectionProps {
  user: Partial<UserType>;
}
interface VerifyForm {
  document_front: string;
  document_back: string;
  selfie_image: string;
  note_rejection?: string;
}

export function UserDocumentSection({ user }: { user: DetailedVerificationItem }) {
  const [activeTab, setActiveTab] = useState('frente');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(user.verification_status === 'verified');
  const [isExpanded, setIsExpanded] = useState(true);
  const [verifyForm, setVerifyForm] = useState({
    document_front: user.document_front || '',
    document_back: user.document_back || '',
    selfie_image: user.selfie_image || '',
    note_rejection: user.note_rejection || '',
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSaveUserData = (userData: Partial<UserType>) => {
    //const response = await sendVerification(userData, verifyForm); logica de envio de verificación
    console.log('Datos del usuario guardados:', userData);
    setTimeout(() => {
      setIsVerified(true);
    }, 1000);
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Documentación</h3>
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
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mb-4 flex space-x-2 border-b dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === 'frente'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('frente')}
          >
            FRENTE
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === 'dorso'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('dorso')}
          >
            DORSO
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === 'foto'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('foto')}
          >
            FOTO
          </button>
        </div>

        <div className="flex justify-center p-4">
          {activeTab === 'frente' && (
            <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/80">
              <div className="absolute inset-0 flex items-center justify-center">
                {user.document_front ? (
                  <Image src={user.document_front} alt="Document Front" layout="fill" objectFit="cover" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
          {activeTab === 'dorso' && (
            <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/80">
              <div className="absolute inset-0 flex items-center justify-center">
                {user.document_back ? (
                  <Image src={user.document_back} alt="Document Back" layout="fill" objectFit="cover" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
          {activeTab === 'foto' && (
            <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/80">
              <div className="absolute inset-0 flex items-center justify-center">
                {user.selfie_image ? (
                  <Image src={user.selfie_image} alt="Selfie" layout="fill" objectFit="cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* <div className="mt-4 flex justify-center">
        <button
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Verificar documentación
        </button>
      </div> */}

        {isModalOpen && <VerificationModal onClose={() => setIsModalOpen(false)} />}
        {/* {isVerified ? (
          <>
            <UserAdditionalInfo user={user} />
          </>
        ) : (
          <>
            <UserVerificationForm
              user={user}
              onSave={handleSaveUserData}
              onCancel={() => console.log('Operación cancelada')}
            />
          </>
        )} */}
      </div>
    </div>
  );
}

const sendVerification = async (user: Partial<UserType>, verifyForm: VerifyForm) => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}/verification/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(verifyForm),
    });

    if (!response.ok) {
      throw new Error('Error al enviar la verificación');
    }

    const data = await response.json();
    console.log('Verificación enviada:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar la verificación:', error);
  }
};
