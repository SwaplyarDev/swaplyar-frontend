'use client';

import { CloudUpload, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { useStepperStore } from '@/store/stateStepperStore';

export interface FileUploadProps {
  label?: string;
  restRegister?: any;
  watch?: UseFormWatch<any>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImages?: string[];
  onRemoveImage?: (index: number) => void;
  error?: string;
  isDark?: boolean;
  accept?: string;
  maxSizeText?: string;
  showPreview?: boolean;
  className?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  name?: string;
  maxFiles?: number;
}

/**
 * Componente reutilizable para subir múltiples archivos con preview
 * Funciona con react-hook-form usando restRegister
 * 
 * @example
 * ```tsx
 * const { register } = useForm();
 * const { onChange, ...restRegister } = register('images', { required: true });
 * const [previewImages, setPreviewImages] = useState<string[]>([]);
 * 
 * const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *   const files = Array.from(event.target.files || []);
 *   const newPreviews = files.map(file => {
 *     if (file.type.startsWith('image/')) {
 *       return URL.createObjectURL(file);
 *     }
 *     return null;
 *   }).filter(Boolean) as string[];
 *   
 *   setPreviewImages(prev => [...prev, ...newPreviews].slice(0, 5));
 *   onChange(event);
 * };
 * 
 * const handleRemove = (index: number) => {
 *   setPreviewImages(prev => prev.filter((_, i) => i !== index));
 * };
 * 
 * <FileUpload
 *   label="Imágenes"
 *   name="images"
 *   restRegister={restRegister}
 *   watch={watch}
 *   handleChange={handleChange}
 *   previewImages={previewImages}
 *   onRemoveImage={handleRemove}
 *   error={errors.images ? 'Este campo es obligatorio' : undefined}
 *   maxFiles={5}
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Comprobantes',
  restRegister,
  watch,
  handleChange,
  previewImages = [],
  onRemoveImage,
  error,
  isDark = false,
  accept = '.png,.jpg,.jpeg,.webp,.pdf',
  maxSizeText = 'max. 5MB por archivo',
  showPreview = true,
  className = '',
  maxSizeMB = 5,
  disabled = false,
  name = '',
  maxFiles = 5,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { updateFormData, completedSteps, markStepAsCompleted } = useStepperStore();

  const currentFiles = watch ? watch(name) : null;
  const filesArray = Array.isArray(currentFiles)
  ? currentFiles
  : currentFiles
  ? Array.from(currentFiles as FileList)
  : [];


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
    if (!event.target.files || event.target.files.length === 0) return;

    // Validación de archivos
    for (const file of Array.from(event.target.files)) {
      const errorMsg = validateFile(file);
      if (errorMsg) {
        setValidationError(errorMsg);
        event.target.value = '';
        return;
      }
    }

    setValidationError(null);

    // Llama al handleChange del padre
    if (handleChange) handleChange(event);
    const files = Array.from(event.target.files || []);
    updateFormData(2, { proof_of_payment: files });

    if (files.length > 0 && !completedSteps[2]) {
      markStepAsCompleted(2);
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const totalFiles = filesArray.length + droppedFiles.length;

      if (totalFiles > maxFiles) {
        setValidationError(`Máximo ${maxFiles} archivos permitidos`);
        return;
      }

      for (const file of droppedFiles) {
        const errorMsg = validateFile(file);
        if (errorMsg) {
          setValidationError(errorMsg);
          return;
        }
      }
      
      setValidationError(null);

      const dataTransfer = new DataTransfer();
      droppedFiles.forEach(file => dataTransfer.items.add(file));
      
      const syntheticEvent = {
        target: { files: dataTransfer.files },
        currentTarget: { files: dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>;

      if (handleChange) {
        handleChange(syntheticEvent);
      }
    }
  };

  const handleFileRemove = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onRemoveImage) {
      onRemoveImage(index); // esto ya actualiza los archivos en el padre/store
    }

    // Verificar si quedan previews
    const remainingPreviews = previewImages.filter((_, i) => i !== index);
    if (remainingPreviews.length === 0) {
      updateFormData(2, { proof_of_payment: [] });
    }
  };

  const canAddMore = previewImages.length < maxFiles;

  return (
    <div className={`file-upload flex gap-3 items-start h-[126px] ${className}`}>
      <div className="flex sm:flex-wrap max-sm:overflow-x-auto gap-2 h-full w-full scrollbar-hide">
        {canAddMore && (
          <div
            className={`group relative flex-shrink-0 sm:gap-2 sm:flex-1 h-full py-2 px-2 flex flex-col items-center justify-center rounded-2xl border-[1px] border-dashed dark:bg-custom-grayD-800 overflow-hidden 
              ${filesArray.length === 0
                ? 'max-sm:w-full'
                : 'max-sm:flex-1 max-sm:min-w-[217px]'
              }
              ${
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
            <input
              type="file"
              id={name}
              onChange={handleFileChangeInternal}
              accept={accept}
              disabled={disabled}
              multiple
              {...restRegister}
              className={`absolute inset-0 h-full w-full ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              } opacity-0 z-10`}
            />
            <div className="relative flex items-center justify-center size-10 rounded-md border border-disabledButtonsLigth p-[10px] font-textFont text-lg text-darkText group-hover:border-buttonsLigth dark:border-disabledButtonsDark dark:bg-transparent dark:text-darkText group-hover:dark:border-darkText">
              <CloudUpload className="size-5 text-custom-blue dark:text-darkText pointer-events-none" />
            </div>

            <p className="text-xs sm:px-4 text-custom-grayD group-hover:text-inputLightDisabled dark:text-disabledDarkText group-hover:dark:text-darkText">
              <strong className="text-custom-blue dark:text-white">Haga clic para cargar</strong> o arrastre y suelte{' '}
              {accept.toUpperCase()} ({maxSizeText})
              <br />
              <span className="text-xs mt-1">
                {previewImages.length === 0
                  ? 'Ningún archivo cargado'
                  : `${previewImages.length} de ${maxFiles} archivos cargados`}
              </span>
            </p>

            {(error || validationError) && (
              <p className="text-xs text-errorColor mt-1">{error || validationError}</p>
            )}
          </div>
        )}

        {showPreview && previewImages.length > 0 && previewImages.map((preview, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 flex flex-col items-center rounded-xl overflow-hidden bg-custom-grayD-200 group h-full w-[80px] sm:w-[90px]"
          >
            <img src={preview} alt={`Vista previa ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-all" />
            <p
              className="w-full text-[10px] absolute bottom-0 bg-custom-grayD-200 dark:bg-custom-whiteD-500 dark:text-lightText p-1 truncate"
              title={filesArray[index]?.name}
            >
              {filesArray[index]?.name || `Imagen ${index + 1}`}
            </p>
            <button
              type="button"
              onClick={handleFileRemove(index)}
              className="absolute right-1 top-1 rounded-full p-1.5 text-white bg-errorColor border border-white hover:bg-red-700 transition-colors z-10"
              aria-label={`Eliminar archivo ${index + 1}`}
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      {!canAddMore && (
        <p className="text-xs text-custom-grayD dark:text-disabledDarkText text-center">
          Has alcanzado el límite de {maxFiles} archivos
        </p>
      )}
    </div>
  );
};

export default FileUpload;