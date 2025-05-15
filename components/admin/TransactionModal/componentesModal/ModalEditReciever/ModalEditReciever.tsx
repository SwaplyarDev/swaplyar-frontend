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

  const handleSubmit = () => {
    // Aquí puedes realizar cualquier acción con los datos modificados
    console.log('Datos modificados:', modifiedValues);
    try {
      const response = TransactionService('modified', transaction.transaction_id, modifiedValues);
      console.log(response);
    } catch (error) {
      throw new Error(`❌ Error en la respuesta del servicio` + error);
    }
    setModal(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'w-full bg-white transition-all duration-300',
        modal ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
      )}
    >
      {/* Header */}
      <h3 className="mb-4 text-xl font-semibold text-gray-900">Solicitud de edición de datos</h3>
      <Separator className="mb-4" />

      {/* Client Message */}
      <div className="mb-6 rounded-md border-l-4 border-blue-500 bg-blue-50 p-4">
        {noteEdit.note ? (
          <ClientMessage message={noteEdit.note} headerMessage="Mensaje del cliente" classnames="text-blue-800" />
        ) : regretCancel.note ? (
          <ClientMessage message={regretCancel.note} headerMessage="Mensaje" classnames="text-red-800" />
        ) : (
          <ClientMessage message="Mensaje de la solicitud" headerMessage="Mensaje" classnames="text-gray-800" />
        )}
      </div>

      {/* Data Comparison Section */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Original Data */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">Datos Actuales</h4>
          <div className="space-y-4">
            {receiverLabels.map(({ label, value }, index) => (
              <div key={index} className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500">{label}</Label>
                <Input disabled value={value || ''} className="border-gray-200 bg-gray-50 text-gray-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Modified Data */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-blue-700">Datos Modificados</h4>
          <div className="space-y-4">
            {receiverLabels.map(({ label }, index) => (
              <div key={index} className="space-y-1.5">
                <Label className="text-xs font-medium text-blue-600">{label}</Label>
                <Input
                  value={modifiedValues[label] || ''}
                  onChange={(e) => handleInputChange(label, e.target.value)}
                  placeholder={`Nuevo ${label.toLowerCase()}`}
                  className="border-blue-200 focus-visible:ring-blue-400"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Upload Section */}
      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2 inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
            <Upload className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mb-3 text-sm font-medium text-gray-700">Subir Comprobante</p>

          {/* Hidden file input */}
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
              }
            }}
            className="hidden"
            id="fileInput"
          />

          {/* Label that triggers the file input */}
          <label htmlFor="fileInput">
            <Button variant="outline" className="cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50">
              Seleccionar archivo
            </Button>
          </label>

          {/* Mostrar nombre del archivo si hay */}
          {selectedFile && <p className="mt-2 text-xs text-gray-500">Archivo seleccionado: {selectedFile.name}</p>}

          <p className="mt-2 text-xs text-gray-500">Formatos aceptados: PNG, JPG, PDF</p>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Action Button */}
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="bg-green-600 px-6 text-white hover:bg-green-700">
          Confirmar Modificación
        </Button>
      </div>
    </div>
  );
};

export default ModalEditReciever;
