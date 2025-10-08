'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UserAdditionalInfo } from './UserAdditionalInfo';
import { UserVerificationForm } from './UserVerificationForm';
import { VerificationStatus, VerifyForm } from '@/types/verifiedUsers';
import { sendChangeStatus } from '@/actions/userVerification/verification.action';
import { useUserVerify } from '@/hooks/admin/usersPageHooks/useUserVerifyState';
import { DocumentCarouselModal } from '../UserDocumentImage/DocumentCarouselModal';
import { DocumentImagePreview } from '../UserDocumentImage/DocumentImagePreview';

export function UserDocumentSection() {
  const { verificationById, updateVerificationStatus } = useUserVerify();
  const [activeTab, setActiveTab] = useState<'frente' | 'dorso' | 'foto'>('frente');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVerified, setIsVerified] = useState(
    ['verified', 'rejected'].includes(verificationById?.verification_status)
  );
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSaveUserData = async (status: VerificationStatus) => {
    try {
      const verifyForm: VerifyForm = {
        status,
        note_rejection: verificationById.rejection_note || '',
      };
      const response = await sendChangeStatus(verificationById.id, verifyForm);
      if (response?.success) {
        await updateVerificationStatus(status);
        if (['verified', 'rejected'].includes(verifyForm.status)) setIsVerified(true);
      }
      return response;
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      return { success: false, message: 'Error al guardar datos del usuario' };
    }
  };

  const documents = [
    verificationById?.documents?.front,
    verificationById?.documents?.back,
    verificationById?.documents?.selfie,
  ].filter(Boolean);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Documentación</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mb-4 flex space-x-2 border-b dark:border-gray-700">
          {['frente', 'dorso', 'foto'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex justify-center p-4">
          {activeTab === 'frente' && (
            <DocumentImagePreview
              src={verificationById.documents.front}
              alt="Frente del documento"
              onClick={() => {
                setCurrentIndex(0);
                setCarouselOpen(true);
              }}
            />
          )}
          {activeTab === 'dorso' && (
            <DocumentImagePreview
              src={verificationById.documents.back}
              alt="Dorso del documento"
              onClick={() => {
                setCurrentIndex(1);
                setCarouselOpen(true);
              }}
            />
          )}
          {activeTab === 'foto' && (
            <DocumentImagePreview
              src={verificationById.documents.selfie}
              alt="Foto selfie"
              onClick={() => {
                setCurrentIndex(2);
                setCarouselOpen(true);
              }}
            />
          )}
        </div>

        <DocumentCarouselModal
          open={carouselOpen}
          onClose={() => setCarouselOpen(false)}
          images={documents}
          startIndex={currentIndex}
        />

        {isVerified ? (
          <UserAdditionalInfo user={verificationById} />
        ) : (
          <UserVerificationForm
            verification={verificationById}
            onSave={handleSaveUserData}
          />
        )}
      </div>
    </div>
  );
}
