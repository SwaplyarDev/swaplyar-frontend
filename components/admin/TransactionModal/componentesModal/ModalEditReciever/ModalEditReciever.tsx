'use client';

import type React from 'react';

import type { TransactionTypeSingle, TransactionV2 } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from '../ui/RenderLabels';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { useState } from 'react';
import ClientMessage from '../ui/ClientMessage';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpdateTransactionData } from '@/components/admin/TransactionPageComponents/ServiceTransaction';

interface ModalEditRecieverProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  trans: TransactionV2;
}

const ModalEditReciever: React.FC<ModalEditRecieverProps> = ({ modal, setModal, trans }) => {
  const receiverLabels = getReceiverLabels(trans);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { noteEdit, regretCancel } = useTransactionStore();
  const  transaction  = trans;

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
    const body = {
      bank_name: modifiedValues.Banco,
      sender_method_value: modifiedValues.CBU,
      document_value: modifiedValues.DNI,
    };

    try {
      const response = await UpdateTransactionData(body, transaction.id);
    } catch (error) {
      throw new Error(`❌ Error en la respuesta del servicio` + error);
    }
    setModal(false);
  };

  return (
    // Backdrop con scroll habilitado
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 transition-all duration-300',
        modal ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0',
      )}
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative max-h-[90vh] w-full max-w-4xl rounded-lg bg-white transition-all duration-300 dark:bg-gray-800/95',
          'flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.5)]',
          modal ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        )}
      >
        {/* Header fijo */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-6 pb-4 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Solicitud de edición de datos</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setModal(false)}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6 pt-4">
          {/* Client Message */}
          <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Original Data */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Datos Actuales</h4>
              <div className="space-y-3">
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
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Datos Modificados</h4>
              <div className="space-y-3">
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
        </div>

        <div className="flex-shrink-0 border-t border-gray-200 p-6 pt-4 dark:border-gray-700">
          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 px-8 py-2 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              Confirmar Modificación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditReciever;
