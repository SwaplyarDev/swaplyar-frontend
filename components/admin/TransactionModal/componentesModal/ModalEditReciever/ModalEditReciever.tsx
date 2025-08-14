'use client';

import type React from 'react';

import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from '../ui/RenderLabels';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { useState } from 'react';
import ClientMessage from '../ui/ClientMessage';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionService } from '../ui/TransactionService';
import { UpdateTransactionData } from '@/components/admin/TransactionPageComponents/ServiceTransaction';

interface ModalEditRecieverProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  trans: TransactionTypeSingle;
}

const ModalEditReciever: React.FC<ModalEditRecieverProps> = ({ modal, setModal, trans }) => {
  const receiverLabels = getReceiverLabels(trans);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { noteEdit, regretCancel } = useTransactionStore();
  const { transaction } = trans;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const [modifiedValues, setModifiedValues] = useState<{ [key: string]: string }>(
    receiverLabels.reduce(
      (acc, { label, value }) => {
        acc[label] = value;
        return acc;
      },
      {} as { [key: string]: string },
    ),
  );

  const handleInputChange = (label: string, newValue: string) => {
    setModifiedValues((prevState) => ({
      ...prevState,
      [label]: newValue,
    }));
  };

  const handleSubmit = async () => {
    // const formData = new FormData();

    // for (const key in modifiedValues) {
    //   formData.append(key, modifiedValues[key]);
    // }

    // if (selectedFile) {
    //   formData.append('file', selectedFile);
    // }

    const body = {
      bank_name: modifiedValues.Banco,
      sender_method_value: modifiedValues.CBU,
      document_value: modifiedValues.DNI,
    };

    try {
      const response = await UpdateTransactionData(body, transaction.transaction_id);
    } catch (error) {
      throw new Error(`❌ Error en la respuesta del servicio` + error);
    }
    setModal(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'w-full bg-white transition-all duration-300 dark:bg-gray-800/95',
        modal ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
      )}
    >
      {/* Header */}
      <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Solicitud de edición de datos</h3>
      <Separator className="mb-4 dark:bg-gray-700" />

      {/* Client Message */}
      <div className="mb-6 rounded-md border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
        {noteEdit.note ? (
          <ClientMessage
            message={noteEdit.note}
            headerMessage="Mensaje del cliente"
            classnames="text-blue-800 dark:text-blue-300"
          />
        ) : regretCancel.note ? (
          <ClientMessage
            message={regretCancel.note}
            headerMessage="Mensaje"
            classnames="text-red-800 dark:text-red-300"
          />
        ) : (
          <ClientMessage
            message="Mensaje de la solicitud"
            headerMessage="Mensaje"
            classnames="text-gray-800 dark:text-gray-300"
          />
        )}
      </div>

      {/* Data Comparison Section */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Original Data */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Datos Actuales</h4>
          <div className="space-y-4">
            {receiverLabels.map(({ label, value }, index) => (
              <div key={index} className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</Label>
                <Input
                  disabled
                  value={value || ''}
                  className="border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modified Data */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-blue-700 dark:text-blue-300">Datos Modificados</h4>
          <div className="space-y-4">
            {receiverLabels.map(({ label }, index) => (
              <div key={index} className="space-y-1.5">
                <Label className="text-xs font-medium text-blue-600 dark:text-blue-400">{label}</Label>
                <Input
                  value={modifiedValues[label] || ''}
                  onChange={(e) => handleInputChange(label, e.target.value)}
                  placeholder={`Nuevo ${label.toLowerCase()}`}
                  className="border-blue-200 focus-visible:ring-blue-400 dark:border-blue-700 dark:bg-gray-700/30 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mb-6 dark:bg-gray-700" />

      {/* Upload Section QUEDA COMENTADO POR LAS DUDAS, EN FIGMA TODAVIA NO HAY NADA SORBRE ESTA SECCION*/}
      {/* <div className="mb-6 flex items-center justify-center"> 
        {/* <div className="text-center">
          <div
            className={cn(
              'flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-all duration-300',
              isDragging
                ? 'border-primary bg-primary/10'
                : 'hover:border-primary/70 hover:bg-primary/5 border-gray-300 bg-gray-800',
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="text-primary h-8 w-8" />
            <p className="px-4 text-center text-sm text-gray-600">
              Arrastra y suelta el comprobante aquí o
              <Button
                variant="link"
                className="h-auto p-0 pl-1 font-medium"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                selecciona un archivo
              </Button>
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => {
                if (e.target.files?.length) {
                  console.log('Archivo seleccionado:', e.target.files[0].name);
                  
                }
              }}
            />
            <p className="text-xs text-gray-500">Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</p>
          </div>

          
          <label htmlFor="fileInput">
            <Button
              variant="outline"
              className="mt-2 cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/10"
            >
              Seleccionar archivo
            </Button>
          </label>

          
          {selectedFile && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Archivo seleccionado: {selectedFile.name}</p>
          )}

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Formatos aceptados: PNG, JPG, PDF</p>
        </div>
      </div> */}

      <Separator className="mb-6 dark:bg-gray-700" />

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="bg-green-600 px-6 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Confirmar Modificación
        </Button>
      </div>
    </div>
  );
};

export default ModalEditReciever;
