'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ProofOfPayment } from '@/types/transaction';

interface ProofModalProps {
  isOpen: boolean;
  proofs: ProofOfPayment[];
  onClose: () => void;
}

export function ProofModal({ isOpen, proofs, onClose }: ProofModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setCurrentIndex(0);
  }, [isOpen, proofs]);

  if (!isOpen || proofs.length === 0) return null;

  const currentProof = proofs[currentIndex];
  const hasMultiple = proofs.length > 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % proofs.length);
    setImageLoaded(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + proofs.length) % proofs.length);
    setImageLoaded(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full !max-w-[350px] !px-4 !py-6 sm-phone:!max-w-[510px] sm-phone:!px-6 navbar-desktop:!max-w-[556px] bg-custom-whiteD-500 dark:bg-custom-grayD-800 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 w-full mb-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1"
            aria-label="Volver"
          >
            <ChevronLeft
              size={24}
              className="dark:text-darkText"
            />
          </button>
          <h2 className="font-textFont text-lg sm-phone:text-xl dark:text-darkText">
            Comprobante
          </h2>
        </div>

        <div className="flex items-center justify-center p-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#012d8a] dark:border-gray-600 dark:border-t-[#EBE7E0]"></div>
            </div>
          )}
          <img
            key={currentProof.id}
            src={currentProof.imgUrl}
            alt={`Comprobante ${currentIndex + 1}`}
            className="max-h-[450px] max-w-[80vw] object-contain"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {hasMultiple && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700">
            <button
              onClick={handlePrev}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
            </button>
            <div className="text-sm font-medium text-gray-800 dark:text-white">
              {currentIndex + 1} / {proofs.length}
            </div>
            <button
              onClick={handleNext}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProofModal;
