'use client';

import { CloudUpload, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { UseFormWatch } from 'react-hook-form';

export interface FileUploadProps {
  label?: string;
  restRegister?: any; // Props del register de react-hook-form
  watch?: UseFormWatch<any>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage?: string | null;
  onRemoveImage?: () => void;
  error?: string;
  isDark?: boolean;
  accept?: string;
  maxSizeText?: string;
  showPreview?: boolean;
  className?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  name?: string; // nombre del campo para react-hook-form
}

/**
 * Componente reutilizable para subir archivos con preview
 * Funciona con react-hook-form usando restRegister
 * 
 * @example
 * ```tsx
 * const { register } = useForm();
 * const { onChange, ...restRegister } = register('proof_of_payment', { required: true });
 * const [previewImage, setPreviewImage] = useState<string | null>(null);
 * 
 * const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = event.target.files?.[0];
 *   if (file && file.type.startsWith('image/')) {
 *     setPreviewImage(URL.createObjectURL(file));
 *   }
 *   onChange(event);
 * };
 * 
 * <FileUpload
 *   label="Comprobante"
 *   name="proof_of_payment"
 *   restRegister={restRegister}
 *   watch={watch}
 *   handleChange={handleChange}
 *   previewImage={previewImage}
 *   onRemoveImage={() => setPreviewImage(null)}
 *   error={errors.proof_of_payment ? 'Este campo es obligatorio' : undefined}
 *   isDark={isDark}
 *   accept=".png,.jpg,.pdf"
 *   maxSizeText="max. 5MB"
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Comprobante',
  restRegister,
  watch,
  handleChange,
  previewImage,
  onRemoveImage,
  error,
  isDark = false,
  accept = '.png,.jpg,.pdf',
  maxSizeText = 'max. 5MB',
  showPreview = true,
  className = '',
  maxSizeMB = 5,
  disabled = false,
  name = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Obtener el archivo actual del formulario
  const currentFile = watch ? watch(name) : null;
  const file = currentFile?.[0] || null;

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      return `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`;
    }

    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(fileExtension)) {
      return `Tipo de archivo no permitido. Formatos aceptados: ${accept}`;
    }

    return null;
  };

  const handleFileChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const errorMsg = validateFile(selectedFile);
      
      if (errorMsg) {
        setValidationError(errorMsg);
        event.target.value = ''; // Reset input
        return;
      }
      
      setValidationError(null);
      
      // Llamar al handleChange del padre (react-hook-form)
      if (handleChange) {
        handleChange(event);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const errorMsg = validateFile(droppedFile);
      
      if (errorMsg) {
        setValidationError(errorMsg);
        return;
      }
      
      setValidationError(null);

      // Crear evento sintético para react-hook-form
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      
      const syntheticEvent = {
        target: { files: dataTransfer.files },
        currentTarget: { files: dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>;

      // Llamar al handleChange del padre (react-hook-form)
      if (handleChange) {
        handleChange(syntheticEvent);
      }
    }
  };

  const handleFileRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onRemoveImage) {
      onRemoveImage();
    }
  };

  return (
    <div className={`file-upload flex ${file && showPreview && previewImage ? 'flex-row gap-2' : 'flex-col'} justify-between rounded-2xl ${className}`}>
      <div
        className={`relative group flex h-[126px] w-full py-4 px-2 flex-col items-center justify-center rounded-2xl border-[1px] border-dashed dark:bg-custom-grayD-800 ${
          dragActive 
            ? 'border-custom-blue dark:border-darkText' 
            : error || validationError
            ? 'border-errorColor'
            : 'border-inputLightDisabled dark:border-disabledDarkText'
        } text-center hover:border-inputLight dark:border-transparent dark:text-lightText dark:hover:border-darkText transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="absolute w-full h-full cursor-pointer">
          <div className="mt-4 relative place-self-center size-10 items-center justify-center rounded-md border border-disabledButtonsLigth p-[10px] font-textFont text-lg text-darkText group-hover:border-buttonsLigth dark:border-disabledButtonsDark dark:bg-transparent dark:text-darkText group-hover:dark:border-darkText">
            <CloudUpload className="size-5 text-custom-blue dark:text-darkText" />
            <input
              type="file"
              id={name}
              onChange={handleFileChangeInternal}
              accept={accept}
              disabled={disabled}
              {...restRegister}
              className={`absolute inset-0 h-full w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} opacity-0`}
            />
          </div>
        </label>
        <p
          className={`mt-12 text-xs ${
            file && showPreview && previewImage ? 'xs-phone:px-16' : 'xs-phone:px-32'
          } text-custom-grayD group-hover:text-inputLightDisabled dark:text-disabledDarkText group-hover:dark:text-darkText`}
        >
          {file && previewImage ? (
            <span className="text-custom-blue dark:text-white">
              Archivo seleccionado: {file.name}
            </span>
          ) : (
            <>
              <strong className="text-custom-blue dark:text-white">Haga clic para cargar</strong> o arrastre y suelte{' '}
              {accept.toUpperCase()} ({maxSizeText})
            </>
          )}
        </p>
        {(error || validationError) && (
          <p className="text-xs text-errorColor mt-1">
            {error || validationError}
          </p>
        )}
      </div>

      {file && showPreview && previewImage && (
        <div className="relative flex flex-col items-center rounded-xl overflow-hidden w-28 h-[126px] bg-custom-grayD-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewImage}
            alt="Vista previa del archivo"
            className="w-full h-full rounded-xl object-cover"
          />
          <p
            className="w-full rounded-b-xl text-xs absolute bottom-0 bg-custom-grayD-200 dark:bg-custom-whiteD-500 dark:text-lightText"
            style={{ overflowWrap: 'anywhere' }}
          >
            {file.name}
          </p>
          <button
            type="button"
            onClick={handleFileRemove}
            className="absolute right-1 top-1 rounded-full p-1 text-darkText bg-errorColor border border-darkText dark:text-lightText hover:dark:bg-errorColorDark transition-colors"
            aria-label="Eliminar archivo"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
