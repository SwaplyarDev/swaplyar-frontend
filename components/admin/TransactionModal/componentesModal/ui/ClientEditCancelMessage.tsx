import { format } from 'date-fns';
import { CancelIcon, EditIcon } from './MessageIcons';
import { fetchTransactionById } from '../../../../../actions/editRequest/editRequest.action';

export enum ClientMessageType {
  Edit = 'edit',
  Cancel = 'cancel',
}

type ClientEditCancelMessageProps = {
  type: ClientMessageType | null;
  message?: string;
};

const ClientEditCancelMessage = ({ type, message }: ClientEditCancelMessageProps) => {
  if (!type) return <></>;

  const formatted = format(Date.now(), 'yyyy-MM-dd HH:mm');

  return (
    <div
      className={`rounded-2xl border-4 ${type === ClientMessageType.Edit ? 'border-[#FF6200] bg-orange-100' : 'border-[#CE1818] bg-red-100'}`}
    >
      <div className="m-4 flex items-center justify-start">
        <div className="mb-5">
          {type === ClientMessageType.Edit && <EditIcon />}
          {type === ClientMessageType.Cancel && <CancelIcon />}
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between gap-32">
            <p className="text-base font-medium">
              El cliente solicitó {type === ClientMessageType.Edit ? 'editar' : 'cancelar'} la solicitud
            </p>

            <div className="flex flex-col items-end text-xs text-[#646464]">
              Fecha
              <p className="text-xs text-[#646464]">{formatted}</p>
            </div>
          </div>
          <div className="">
            <span className="text-[10px]">Mensaje</span>
            <div
              className={`border ${type === ClientMessageType.Edit ? 'border-[#FF6200]' : 'border-[#CE1818]'} h-[59px] rounded-2xl`}
            >
              <p className="font-weight-light p-2 text-base">{message}</p>
            </div>
          </div>
        </div>
      </div>
      {type === ClientMessageType.Cancel && (
        <p className="p-2 text-sm text-[#969696]">Se realizará el rembolso a la cuenta de origen.</p>
      )}
    </div>
  );
};

export default ClientEditCancelMessage;
