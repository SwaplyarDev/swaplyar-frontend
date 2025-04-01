'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Add a new prop to the CustomModal component to support tooltip positioning
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'success' | 'error' | 'warning';
  tooltipMode?: boolean;
  anchorElement?: HTMLElement | null;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCancel = true,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  isLoading = false,
  variant = 'default',
  tooltipMode = false,
  anchorElement = null,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Position the tooltip modal relative to the anchor element
  useEffect(() => {
    if (tooltipMode && anchorElement && modalRef.current && isOpen) {
      const anchorRect = anchorElement.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      // Position above the button with some offset
      const top = anchorRect.top - modalRect.height - 10;
      const left = anchorRect.left;

      setPosition({
        top: Math.max(10, top), // Ensure it doesn't go off the top of the screen
        left: Math.max(10, Math.min(left, window.innerWidth - modalRect.width - 10)), // Keep within screen horizontally
      });
    }
  }, [tooltipMode, anchorElement, isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, isLoading]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      case 'error':
        return <XCircle className="h-10 w-10 text-red-500" />;
      case 'warning':
        return <XCircle className="h-10 w-10 text-amber-500" />;
      default:
        return null;
    }
  };

  const getButtonColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500';
      default:
        return 'bg-custom-blue hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${tooltipMode ? 'pointer-events-none' : 'flex items-center justify-center'}`}>
      <div
        className={`${tooltipMode ? '' : 'flex w-full max-w-md items-center justify-center rounded-md bg-black/30 p-4'}`}
      >
        <div
          ref={modalRef}
          className={`${tooltipMode ? 'pointer-events-auto absolute' : 'animate-fadeIn w-full max-w-md'} rounded-lg bg-white shadow-xl`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={tooltipMode ? { top: `${position.top}px`, left: `${position.left}px` } : undefined}
        >
          {tooltipMode && <div className="absolute bottom-[-8px] left-4 h-4 w-4 rotate-45 transform bg-white"></div>}
          <div className="relative p-6">
            {/* Close button */}
            {!isLoading && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Header with icon */}
            <div className="mb-5 flex flex-col items-center text-center">
              {getIcon()}
              <h2 id="modal-title" className="mt-2 text-xl font-semibold text-gray-800">
                {title}
              </h2>
            </div>

            {/* Content */}
            <div className="mb-6">{children}</div>

            {/* Footer */}
            <div className="flex justify-end gap-3">
              {showCancel && !isLoading && (
                <button
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white transition-colors focus:outline-none focus:ring-2 ${getButtonColor()}`}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
