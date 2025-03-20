import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from '../ui/RenderLabels';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { strokepopup, clipopup } from '@/utils/assets/img-database';
import { useState } from 'react';
import Image from 'next/image';
import ClientMessage from '../ui/ClientMessage';

interface ModalEditRecieverProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  trans: TransactionTypeSingle;
}

const ModalEditReciever: React.FC<ModalEditRecieverProps> = ({ modal, setModal, trans }) => {
  const receiverLabels = getReceiverLabels(trans);

  const { noteEdit, regretCancel } = useTransactionStore();

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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`mb-8 flex flex-col gap-5 rounded-xl border bg-white p-4 text-gray-800 transition-all duration-300 ${
        modal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
      }`}
    >
      {/* Header */}
      <h3 className="text-2xl font-bold text-gray-900">Solicitud de edición de datos</h3>

      {/* Client Message */}
      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
        {noteEdit.note ? (
          <ClientMessage message={noteEdit.note} headerMessage="Mensaje del cliente" classnames="text-blue-800" />
        ) : regretCancel.note ? (
          <ClientMessage message={regretCancel.note} headerMessage="Mensaje" classnames="text-red-800" />
        ) : (
          <ClientMessage message="Mensaje de la solicitud" headerMessage="Mensaje" classnames="text-gray-800" />
        )}
      </div>

      {/* Data Comparison Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="border-b border-blue-200 pb-2 text-lg font-bold text-gray-800">Datos Modificados</p>
          <div className="space-y-4">
            {receiverLabels.map(({ label, value }, index) => (
              <div key={index} className="flex flex-col items-start">
                <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
                <input
                  disabled
                  value={value || ''}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-800 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modified Data */}
        <div className="flex w-full flex-col gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="border-b border-blue-200 pb-2 text-lg font-bold text-blue-800">Datos Modificados</p>
          <div className="space-y-4">
            {receiverLabels.map(({ label }, index) => (
              <div key={index} className="flex flex-col items-start">
                <p className="mb-1 text-sm font-medium text-blue-700">{label}</p>
                <input
                  value={modifiedValues[label] || ''}
                  onChange={(e) => handleInputChange(label, e.target.value)}
                  placeholder={`Nuevo ${label.toLowerCase()}`}
                  className="w-full rounded-md border border-blue-300 bg-white p-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mx-auto mt-4 w-full max-w-md rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <h4 className="text-lg font-semibold text-blue-700">Subir Comprobante</h4>
          <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg">
            Seleccionar archivo
          </button>
          <p className="text-sm text-blue-600">Formatos aceptados: PNG, JPG, PDF</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex justify-center">
        <button className="group relative rounded-full bg-green-600 px-8 py-3 font-medium text-white shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          <span
            className="absolute -inset-0.5 -z-10 rounded-full opacity-30 blur transition-all group-hover:opacity-100 group-hover:blur-md"
            style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)' }}
          ></span>
          Confirmar Modificación
        </button>
      </div>
    </div>
  );
};

export default ModalEditReciever;
