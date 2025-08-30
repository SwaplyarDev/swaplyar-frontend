'use client';

import type React from 'react';
import { useState } from 'react';
import { AlertCircle, Calendar, User, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { DetailedVerificationItem, VerificationResponse, VerificationStatus } from '@/types/verifiedUsers';

interface UserVerificationFormProps {
  verification: DetailedVerificationItem;
  onSave: (status: VerificationStatus) => Promise<VerificationResponse>;
}

export function UserVerificationForm({ verification, onSave }: UserVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (status: VerificationStatus) => {
    try {
      setIsSubmitting(true);
      await onSave(status);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      setIsSubmitting(false);
    }
  };

  // Configuración de los campos del formulario
  const formFields = [
    {
      id: 'firstName',
      label: 'Nombre',
      placeholder: 'Ingrese el nombre',
      icon: <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    },
    {
      id: 'lastName',
      label: 'Apellido',
      placeholder: 'Ingrese el apellido',
      icon: <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    },
    {
      id: 'identification',
      label: 'N° de Documento',
      placeholder: 'Ingrese el número de documento',
      icon: <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    },
    {
      id: 'birthday',
      label: 'Fecha de Nacimiento',
      placeholder: 'YYYY-MM-DD',
      icon: <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 mt-6 duration-300">
      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/30 dark:bg-amber-900/20">
        <div className="flex items-start">
          <AlertCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-500" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">
              Verificación de usuario pendiente
            </h3>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
              Estado actual: <span className="font-semibold">{verification?.verification_status === 'pending' ? 'Pendiente' : 'Reenviar Datos'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label
                htmlFor={field.id}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.icon}
                <span className="ml-1.5">{field.label}</span>
              </Label>

              <div className="relative">
                <Input
                  id={field.id}
                  name={field.id}
                  value={verification.user_profile[field.id as keyof typeof verification.user_profile]}
                  placeholder={field.placeholder}
                  disabled={true}
                  className={cn(
                    'h-10 w-full transition-all !cursor-default duration-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
                    '!cursor-default disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-gray-900' 
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => handleSubmit("verified")}
            disabled={isSubmitting}
            className="flex flex-row justify-center align-middle rounded-full bg-green-600 px-6 py-2 font-medium text-gray-200 transition-all duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block h-2 w-2 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Procesando...
              </>
            ) : (
              <div className="flex flex-row justify-center items-center gap-1">
                <CheckCircle className="h-4 w-4 text-gray-200 " />
                <p className="h-4 flex items-center">Aprobar</p>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("resend-data")}
            disabled={isSubmitting}
            className="rounded-full bg-gray-600 px-6 py-2 font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Reenviar Datos
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("rejected")}
            disabled={isSubmitting}
            className=" flex flex-row justify-center items-center gap-1 rounded-full bg-red-600 px-6 py-2 font-medium text-gray-200 transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-700 dark:text-gray-200 dark:hover:bg-red-600"
          >
            <XCircle className="h-4 w-4 text-gray-200 " />
            <p className="h-4 flex items-center">Rechazar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
