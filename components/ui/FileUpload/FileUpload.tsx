'use client';

import { CloudUpload, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isDark?: boolean;
  accept?: string;
  maxSizeText?: string;
  showPreview?: boolean;
  className?: string;
  maxSizeMB?: number;
  onError?: (error: string) => void;
}

/**
 * Componente reutilizable para subir archivos con preview
 * 
 * @example
 * ```tsx
 * const [file, setFile] = useState<File | null>(null);
 * 
 * <FileUpload
 *   file={file}
 *   onFileChange={setFile}
 *   isDark={isDark}
 *   accept=".png,.jpg,.pdf"
 *   maxSizeText="max. 800x400px"
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileChange,
  isDark = false,
  accept = '.png,.jpg,.pdf',
  maxSizeText = 'max. 800x400px',
  showPreview = true,
  className = '',
  maxSizeMB = 10,
  onError,
}) => {
  const [dragActive, setDragActive] = useState(false);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const error = validateFile(selectedFile);
      
      if (error) {
        onError?.(error);
        event.target.value = ''; // Reset input
        return;
      }
      
      onFileChange(selectedFile);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const error = validateFile(droppedFile);
      
      if (error) {
        onError?.(error);
        return;
      }
      
      onFileChange(droppedFile);
    }
  };

  const handleFileRemove = () => {
    onFileChange(null);
  };

  return (
    <div className={`file-upload flex ${file && showPreview ? 'flex-row gap-2' : 'flex-col'} justify-between rounded-2xl ${className}`}>
      <div
        className={`relative group flex h-[126px] w-full py-4 px-2 flex-col items-center justify-center rounded-2xl border-[1px] border-dashed ${
          dragActive 
            ? 'border-custom-blue dark:border-darkText' 
            : 'border-inputLightDisabled dark:border-disabledDarkText'
        } text-center hover:border-inputLight dark:border-transparent dark:text-lightText dark:hover:border-darkText transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="absolute w-full h-full cursor-pointer">
          <div className="mt-4 relative place-self-center size-10 items-center justify-center rounded-md border border-disabledButtonsLigth p-[10px] font-textFont text-lg text-darkText group-hover:border-buttonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText group-hover:dark:border-darkText">
            <CloudUpload className="size-5 text-custom-blue dark:text-darkText" />
            <input
              type="file"
              onChange={handleFileChange}
              accept={accept}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </label>
        <p
          className={`mt-12 text-xs ${
            file && showPreview ? 'xs-phone:px-16' : 'xs-phone:px-32'
          } text-custom-grayD group-hover:text-inputLightDisabled dark:text-disabledDarkText group-hover:dark:text-darkText`}
        >
          <strong className="text-custom-blue dark:text-white">Haga clic para cargar</strong> o arrastre y suelte SVG,
          PNG, JPG or GIF ({maxSizeText})
        </p>
      </div>

      {file && showPreview && (
        <div className="relative flex flex-col items-center rounded-xl overflow-hidden w-28 h-[126px] bg-custom-grayD-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(file)}
            alt="Vista previa del archivo"
            className="w-full h-full rounded-xl object-cover"
          />
          <p
            className="w-full rounded-b-xl text-xs absolute bottom-0 bg-custom-grayD-200"
            style={{ overflowWrap: 'anywhere' }}
          >
            {file.name}
          </p>
          <button
            onClick={handleFileRemove}
            className="absolute right-1 top-1 rounded-full p-1 text-darkText bg-errorColor border border-darkText dark:bg-darkText dark:text-lightText hover:dark:bg-errorColorDark transition-colors"
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
