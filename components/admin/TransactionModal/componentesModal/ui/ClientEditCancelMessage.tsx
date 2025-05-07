import { CancelIcon, EditIcon } from './MessageIcons';

export enum ClientMessageType {
  Edit = 'edit',
  Cancel = 'cancel',
}

type ClientEditCancelMessageProps = {
  type: ClientMessageType;
  message?: string;
};

const ClientEditCancelMessage = ({ type, message }: ClientEditCancelMessageProps) => {
  return (
    <div>
      <div>
        {type === ClientMessageType.Edit && <EditIcon />}
        {type === ClientMessageType.Cancel && <CancelIcon />}
      </div>
    </div>
  );
};

export default ClientEditCancelMessage;
