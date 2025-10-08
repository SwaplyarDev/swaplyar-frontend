import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { CancelIcon, EditIcon } from './MessageIcons';
import { Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export enum ClientMessageType {
  Edit = 'edit',
  Cancel = 'cancel',
}

type ClientEditCancelMessageProps = {
  type: ClientMessageType | null;
  message?: string;
  createdAt?: string;
  imageUrl?: string;
};

const ClientEditCancelMessage = ({ type, message, createdAt, imageUrl }: ClientEditCancelMessageProps) => {
  const { isDark } = useDarkTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!type) return <></>;

  return (
    <div
      className={`rounded-2xl border-4 ${type === ClientMessageType.Edit ? `border-[#FF6200] ${isDark ? 'bg-orange-300' : 'bg-orange-100'} ` : `border-[#CE1818] ${isDark ? 'bg-red-300' : 'bg-red-100'} `}`}
    >
      <div className="m-4 flex items-center justify-start">
        <div className="mb-5">
          {type === ClientMessageType.Edit && <EditIcon />}
          {type === ClientMessageType.Cancel && <CancelIcon />}
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between gap-32">
            <p className="text-base font-medium dark:text-gray-700">
              El cliente solicitó {type === ClientMessageType.Edit ? 'editar' : 'cancelar'} la solicitud
            </p>
            <div className="flex flex-col items-end text-xs text-[#646464]">
              Fecha
              <p className="text-xs text-[#646464]">
                {createdAt ? new Date(createdAt).toLocaleDateString('es-AR') : '-'}
              </p>
            </div>
          </div>
          <div className="">
            <span className="text-[10px] dark:text-gray-700">Mensaje</span>
            <div
              className={`border ${type === ClientMessageType.Edit ? 'border-[#FF6200]' : 'border-[#CE1818]'} h-[59px] rounded-2xl`}
            >
              <p className="font-weight-light p-2 text-base dark:text-gray-700">{message}</p>
            </div>
          </div>
           {imageUrl && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Ver imagen
              </button>
            </div>
            )}
        </div>
      </div>
      {type === ClientMessageType.Cancel && (
        <p className="p-2 text-sm text-[#969696]">Se realizará el rembolso a la cuenta de origen.</p>
      )}

      {imageUrl && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogContent className="max-w-lg">
            <Image
              src={imageUrl}
              alt="Imagen enviada por el cliente"
              width={600}
              height={400}
              className="rounded-lg object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientEditCancelMessage;
