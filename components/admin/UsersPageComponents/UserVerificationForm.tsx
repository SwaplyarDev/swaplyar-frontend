'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { AlertCircle, Calendar, User, Flag, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { User as UserType } from '@/types/user';

interface UserVerificationFormProps {
  user?: Partial<UserType>;
  onSave?: (userData: Partial<UserType>) => void;
  onCancel?: () => void;
}

export function UserVerificationForm({ user, onSave, onCancel }: UserVerificationFormProps) {
  const [formData, setFormData] = useState({
    name: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    nationality: user?.profile?.nationality || '',
    document_number: user?.profile?.identification || '',
    birth_date: user?.profile?.birthday || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFocused, setIsFocused] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar el formulario si cambian los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.profile?.firstName || '',
        lastName: user?.profile?.lastName || '',
        nationality: user?.profile?.nationality || '',
        document_number: user?.profile?.identification || '',
        birth_date: user?.profile?.birthday || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field: string) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));

    // Validar campo al perder el foco
    validateField(field, String(formData[field as keyof typeof formData]));
  };

  const validateField = (field: string, value: string) => {
    let error = '';

    if (!value.trim()) {
      error = 'Este campo es requerido';
    } else if (field === 'document_number' && !/^\d+$/.test(value)) {
      error = 'El documento debe contener solo números';
    } else if (field === 'birth_date') {
      // Validación básica de fecha (puedes mejorarla según tus necesidades)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(value)) {
        error = 'Formato de fecha inválido (YYYY-MM-DD)';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validar todos los campos
    Object.entries(formData).forEach(([field, value]) => {
      if (!validateField(field, String(value))) {
        newErrors[field] = errors[field] || 'Este campo es requerido';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simular envío (reemplazar con tu lógica real)
      /*       setTimeout(() => {
        if (onSave) {
          onSave(formData);
        }
        setIsSubmitting(false);
      }, 1000); */
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Configuración de los campos del formulario
  const formFields = [
    {
      id: 'name',
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
    /*     {
      id: 'nationality',  // Comentado porque no está en el modelo actual
      label: 'Nacionalidad',
      placeholder: 'Ingrese la nacionalidad',
      icon: <Flag className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    }, */
    {
      id: 'document_number',
      label: 'N° de Documento',
      placeholder: 'Ingrese el número de documento',
      icon: <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
    },
    {
      id: 'birth_date',
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
              Por favor complete la información del usuario para continuar con el proceso de verificación.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label
                htmlFor={field.id}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.icon}
                <span className="ml-1.5">{field.label}</span>
                <span className="ml-1 text-red-500">*</span>
              </Label>

              <div className="relative">
                <Input
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.id)}
                  onBlur={() => handleBlur(field.id)}
                  placeholder={field.placeholder}
                  className={cn(
                    'h-10 w-full transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
                    isFocused[field.id] &&
                      'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-600 dark:ring-blue-500/30',
                    errors[field.id] &&
                      'border-red-500 ring-2 ring-red-500/20 dark:border-red-700 dark:ring-red-700/30',
                  )}
                />

                {errors[field.id] && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[field.id]}</p>}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(errors).length > 0 && Object.values(errors).some((error) => error) && (
          <Alert variant="destructive" className="animate-in fade-in mt-4 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Por favor corrija los errores en el formulario antes de continuar.</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="rounded-full bg-gray-200 px-6 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Rechazar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-green-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Procesando...
              </>
            ) : (
              'Aprobar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
