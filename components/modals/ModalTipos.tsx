'use client';
import React, { useEffect, useRef, useState } from 'react';
import { fetchCode, fetchTransactionById, sendFormData } from '@/actions/editRequest/editRequest.action';
import clsx from 'clsx';
import PopUp from '../ui/PopUp/PopUp';
import { IconWarning } from '../ui/PopUp/Icons';
import { ChevronLeft } from 'lucide-react';
import ButtonAuth from '../auth/AuthButton';
import FileUpload from '../ui/FileUpload/FileUpload';

interface ModalProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  transaccionId?: string;
  code: string;
}


const Modal1 = ({ isOpen, onClose, isDark, transaccionId, code }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [noteAccessToken, setNoteAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (transaccionId && code.length === 6) {
        setLoading(true);
        const data = await fetchCode(code, { transactionId: transaccionId });
        /* El data que viene del fetch code no coincide con los datos que tengo que renderizar de data */
        console.log('data', data)
        setTransactionData(data.data);
        setNoteAccessToken(data.noteAccessToken);
        setLoading(false);
      }
    };
    fetchData();
  }, [transaccionId, code]);


  if (!isOpen) return null;

  return (
    <Modal1Content
      isOpen={isOpen}
      onClose={onClose}
      isDark={isDark}
      transaccionId={transaccionId}
      code={code}
      transactionData={transactionData}
      files={files}
      setFiles={setFiles}
      note={note}
      setNote={setNote}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      noteAccessToken={noteAccessToken}
      loading={loading}
      setLoading={setLoading}
    />
  );
};

interface Modal1Props extends ModalProps {
  transactionData: any;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  noteAccessToken: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal1Content: React.FC<Modal1Props> = ({ isOpen, onClose, isDark, transaccionId, code, transactionData, files, setFiles, note, setNote, isFocused, setIsFocused, noteAccessToken, loading, setLoading }) => {

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };
  const handleEditRequestError = () =>
    PopUp({
      variant: 'simple-warning',
      title: 'Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente',
      isDark: isDark,
    });

  const handleEditRequestSuccess = () =>
    PopUp({
      variant: 'success-compact',
      title: 'Solicitud enviada con Éxito',
      text: 'Hemos recibido su solicitud de modificación. Si necesitamos información adicional, nos comunicaremos por WhatsApp al número indicado en el formulario.',
      isDark: isDark,
    });

  const handleFormSubmit = async () => {
    if (!note || !transaccionId) {
      handleEditRequestError();
      return;
    }

    try {
      setLoading(true);
      await sendFormData({
        message: note,
        files, // 👈 array de archivos
        transaccionId: transaccionId,
        noteAccessToken: noteAccessToken ?? '',
      });

      setLoading(false);
      handleEditRequestSuccess();
      onClose();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      PopUp({
        variant: 'simple-error',
        title: 'Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente',
        isDark: isDark,
      });
      setLoading(false);
    }
  };
  const PayMethodInfo: React.FC = () => {
    if (transactionData?.transaction?.payment_method?.receiver?.value === 'ars') {
      return (
        <div className="flex justify-between text-sm xs-phone:text-base">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre </p>
            <p>Apellido </p>
            <p>DNI / CUIT / CUIL </p>
            <p>CBU / CVU / ALIAS </p>
            <p>Nombre del Banco </p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.payment_method?.receiver?.details?.userAccount?.firstName}</p>
            <p>{transactionData?.transaction?.payment_method?.receiver?.details?.userAccount?.lastName}</p>
            <p>{transactionData?.transaction?.payment_method?.receiver?.details?.document_value}</p>
            <p>{transactionData?.transaction?.payment_method?.receiver?.details?.senderMethodValue}</p>
            <p>{transactionData?.transaction?.payment_method?.receiver?.details?.bankName}</p>
          </div>
        </div>
      );
    } else if (transactionData?.transaction?.receiverAccount?.paymentMethod?.method === 'receiver_crypto') {
      return (
        <div className="flex justify-between text-sm xs-phone:text-base">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Dirección USDT </p>
            <p>Red </p>
          </div>
          <div className="flex flex-col justify-between text-end text-lightText dark:text-darkText">
            <p className="max-w-[250px] overflow-x-auto whitespace-nowrap scrollbar-thin">
              {transactionData?.transaction?.receiverAccount?.paymentMethod?.wallet}
            </p>

            <p>{transactionData?.transaction?.receiverAccount?.paymentMethod?.network}</p>
          </div>
        </div>
      );
    } else if (transactionData?.transaction?.receiverAccount?.paymentMethod?.method === 'pix') {
      return (
        <div className="flex justify-between text-sm xs-phone:text-base">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>PIX KEY</p>
            <p>CPF</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.receiverAccount?.paymentMethod?.pixValue}</p>
            <p>{transactionData?.transaction?.receiverAccount?.paymentMethod?.cpf}</p>
          </div>
        </div>
      );
    } else if (transactionData?.transaction?.receiverAccount?.paymentMethod?.method === 'virtual_bank') {
      return (
        <div className="flex justify-between text-sm xs-phone:text-base">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Correo electrónico</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.receiverAccount?.paymentMethod?.emailAccount}</p>
          </div>
        </div>
      );
    } else {
      console.error('No fue recibido el método', new Error());
      return null;
    }
  };
  return (
    <div className="fixed inset-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        style={{ top: '0px', bottom: '64px' }}
        className="relative mt-24 w-full max-w-[350px] xs-phone:max-w-[510px] xl-desktop:max-w-[556px] rounded-lg bg-[#FFF] p-6 shadow-lg dark:bg-[#333231]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-10'>
          <div className='absolute left-2 top-2'>
            <IconWarning size={70} />
          </div>
          <h2 className="w-full text-center font-textFont text-lg xs-phone:text-xl font-semibold text-custom-blue dark:text-darkText">
            Solicitud N° {transaccionId}
          </h2>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto scrollbar">
          <section className="flex flex-col">
            <h3 className="flex justify-center font-textFont font-semibold xs-phone:text-lg text-buttonsLigth dark:text-darkText">Mis Datos</h3>
            <div className="flex justify-between text-sm xs-phone:text-base">
              <div className="flex flex-col text-start font-textFont font-light text-lightText dark:text-darkText">
                <p>Nombre </p>
                <p>Apellido </p>
                <p>N° de Teléfono </p>
              </div>
              <div className="flex flex-col text-end font-textFont font-light text-lightText dark:text-darkText">
                <p>{transactionData?.transaction?.senderAccount?.firstName}</p>
                <p>{transactionData?.transaction?.senderAccount?.lastName}</p>
                <p>{transactionData?.transaction?.senderAccount?.phoneNumber}</p>
              </div>
            </div>
            <div className='w-2/3 h-[1px] bg-custom-blue self-center' />
          </section>

          <section className="flex flex-col">
            <h3 className="flex justify-center font-textFont font-semibold xs-phone:text-lg text-buttonsLigth dark:text-darkText">
              información del Destinatario
            </h3>

            <PayMethodInfo />
            <div className='w-2/3 h-[1px] bg-custom-blue self-center' />
          </section>

          <section className="flex flex-col">
            <h3 className="flex justify-center font-textFont font-semibold xs-phone:text-lg text-buttonsLigth dark:text-darkText">Pago</h3>
            <div className="flex justify-between text-sm xs-phone:text-base">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p>Monto a Pagar </p>
                <p>Monto a Recibir </p>
              </div>
              <div className="flex flex-col text-end text-lightText dark:text-darkText">
                <p>
                  {transactionData?.transaction?.amount?.amountSent}{' '}
                  {transactionData?.transaction?.amount?.currencySent}
                </p>
                <p>
                  {transactionData?.transaction?.amount?.amountReceived}{' '}
                  {transactionData?.transaction?.amount?.currencyReceived}
                </p>
              </div>
            </div>
            <div className='w-2/3 h-[1px] bg-custom-blue self-center' />
          </section>

          <section>
            <p className="flex h-1/2 flex-col dark:text-darkText">
              <div className="text-start font-textFont text-sm leading-3">
                <span className="mr-1 font-semibold text-custom-blue">Nota:</span>
                <span className="text-start text-xs font-light">
                  Indique la sección que desea modificar y adjunte el comprobante correcto si el anterior fue enviado por error.
                </span>
              </div>
            </p>
          </section>

          <section>
            <FileUpload
              files={files}
              setFiles={setFiles}
              isDark={isDark}
              accept=".png,.jpg,.jpeg,.pdf"
              maxFiles={5}
              showPreview
            />

            <label
              htmlFor="note"
              className={clsx(
                'font-textFont font-light text-lightText dark:text-darkText',
                !isFocused && 'opacity-0',
                'w-full pl-3 text-start text-sm',
              )}
            >
              Necesito Modificar...
            </label>
            <textarea
              rows={1}
              id="note"
              className={`w-full block h-[45px] resize-none rounded-2xl border border-inputLightDisabled px-3 py-2 placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight focus:placeholder-transparent dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText hover:dark:border-transparent dark:hover:placeholder-lightText focus:dark:border-transparent focus:dark:ring-transparent`}
              placeholder={isFocused ? '' : 'Necesito Modificar...'}
              onChange={handleNoteChange}
              required
              minLength={20}
              maxLength={200}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
            ></textarea>
          </section>

          <div className="mt-4 flex flex-col-reverse justify-between xs:flex-row">
            <button
              onClick={onClose}
              className="btn-back items-center relative flex h-[38px] sm-phone:h-12 rounded-full hover:bg-transparent dark:text-darkText dark:bg-none"
            >
              <div className="relative size-8 sm-phone:size-12 overflow-hidden content-center">
                <ChevronLeft
                  color={isDark ? '#ebe7e0' : '#012c8a'}
                  width={32}
                  height={32}
                  strokeWidth={2}
                  className="inline-block sm-phone:size-10"
                />
              </div>
            </button>
            <ButtonAuth disabled={!note} label='Solicitar Modificación' isDark={isDark} onClick={handleFormSubmit} className='px-6 sm-phone:px-14 max-h-8 sm-phone:max-h-10 xl-desktop:max-h-11' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
