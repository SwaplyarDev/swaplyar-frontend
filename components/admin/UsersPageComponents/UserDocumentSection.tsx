'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FileText, User, ChevronDown, ChevronUp } from 'lucide-react';
import { VerificationModal } from './VerficationModal';
import { UserAdditionalInfo } from './UserAdditionalInfo';
import { UserVerificationForm } from './UserVerificationForm';
import { User as UserType } from '@/types/user';
import auth from '@/auth';
import { DetailedVerificationItem, VerificationResponse, VerifyForm } from '@/types/verifiedUsers';
import { sendChangeStatus } from '@/actions/userVerification/verification.action';


export function UserDocumentSection({ verification }: { verification: DetailedVerificationItem }) {
  const [activeTab, setActiveTab] = useState('frente');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(verification.verification_status === 'verified' || verification.verification_status === 'rejected');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSaveUserData = async (verifyForm: VerifyForm) => {
    const response = await sendChangeStatus(verification.verification_id, verifyForm);

    if (response?.success) {
      setIsModalOpen(false);
      verification.verification_status = verifyForm.status;
      if(verifyForm.status === 'verified' || verifyForm.status === 'rejected') {
        setIsVerified(true);
      }
    } else {
      console.error('Error al guardar los datos del usuario:', response?.message);
    }
    return response;
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
                {verification.document_front ? (
                  <Image src={verification.document_front} alt="Document Front" layout="fill" objectFit="cover" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
          {activeTab === 'dorso' && (
            <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/80">
              <div className="absolute inset-0 flex items-center justify-center">
                {verification.document_back ? (
                  <Image src={verification.document_back} alt="Document Back" layout="fill" objectFit="cover" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
          {activeTab === 'foto' && (
            <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/80">
              <div className="absolute inset-0 flex items-center justify-center">
                {verification.selfie_image ? (
                  <Image src={verification.selfie_image} alt="Selfie" layout="fill" objectFit="cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          )}
        </div>

        {isModalOpen && <VerificationModal onClose={() => setIsModalOpen(false)} />}
        {isVerified ? (
          <>
            <UserAdditionalInfo user={verification} />
          </>
        ) : (
          <>
            <UserVerificationForm
              verification={verification}
              onSave={handleSaveUserData}
            />
          </>
        )}  
      </div>
    </div>
  );
}


