'use client';
import React, { useEffect, useRef, useState } from 'react';
import Arrow from '../ui/Arrow/Arrow';
import { fetchCode, sendFormData } from '@/actions/editRequest/editRequest.action';
import LoadingGif from '../ui/LoadingGif/LoadingGif';
import clsx from 'clsx';
import PopUp from '../ui/PopUp/PopUp';

interface ModalProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  transaccionId?: string;
  code: string;
}

const Modal1: React.FC<ModalProps> = ({ isOpen, onClose, isDark, transaccionId, code }) => {
  const [file, setFile] = useState<File | null>(null);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const [noteAccessToken, setNoteAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (transaccionId && code.length === 6) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchCode(code, { transactionId: transaccionId });
        setTransactionData(data.data);
        setNoteAccessToken(data.noteAccessToken);
        setLoading(false);
      };
      fetchData();
    }
  }, [transaccionId, code]);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };
  const handleEditRequestError = () =>
    PopUp({
      icon: 'error',
      title: 'Error al editar solicitud!',
      text: 'Debe ingresar una nota, seleccionar un archivo y proporcionar el ID de transacción. Si sigue dando error, contactar a soporte.',
      isDark: isDark,
    });

  const handleEditRequestSuccess = () =>
    PopUp({
      icon: 'success',
      title: 'Solucitud enviado con exito!',
      text: 'Su solicitud fue envia con exito, en la brevedad nos pondremos en contacto contigo.',
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
        file: file,
        transaccionId: transaccionId,
        noteAccessToken: noteAccessToken ?? '',
      });

      setLoading(false);
      handleEditRequestSuccess();
      onClose();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      handleEditRequestError();
      setLoading(false);
    }
  };
  const PayMethodInfo: React.FC = () => {
    if (transactionData?.transaction?.payment_method?.receiver?.value === 'ars') {
      return (
        <div className="flex justify-between text-sm">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre </p>
            <p>Apellido </p>
            <p>DNI/CUIT/CUIL </p>
            <p>CBU/CVU/ALIAS </p>
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
        <div className="flex justify-between text-sm">
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
        <div className="flex justify-between text-sm">
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
        <div className="flex justify-between text-sm">
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
    <div className="fixed inset-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        style={{ top: '0px', bottom: '64px' }}
        className="relative mt-24 w-full max-w-[400px] rounded-lg bg-[#FFF] px-0 py-2 shadow-lg dark:bg-[#333231] xs:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-2.5 top-1.5 text-2xl">
          <p className={`inline-block text-buttonsLigth dark:text-darkText`}>X</p>
        </button>
        <h2 className="mb-4 pl-4 pr-7 text-start font-textFont text-lg font-semibold text-lightText dark:text-darkText">
          Formulario de Solicitud N° {transaccionId}
        </h2>

        <div className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto px-4 scrollbar">
          <section className="flex flex-col border-b border-darkText pb-2">
            <h3 className="mb-2 flex font-textFont font-semibold text-buttonsLigth dark:text-darkText">Mis Datos</h3>
            <div className="flex justify-between text-sm">
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
          </section>

          <section className="flex flex-col border-b border-darkText pb-2">
            <h3 className="mb-2 flex font-textFont font-semibold text-buttonsLigth dark:text-darkText">
              informacion del Destinatario
            </h3>

            <PayMethodInfo />
          </section>

          <section className="flex flex-col border-b border-darkText pb-2">
            <h3 className="mb-2 flex font-textFont font-semibold text-buttonsLigth dark:text-darkText">Pago</h3>
            <div className="flex justify-between text-sm">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p className="mr-20">Monto a pagar </p>
                <p>Monto a recibir </p>
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
          </section>

          <section>
            <p className="mb-2 flex h-1/2 flex-col text-buttonsLigth dark:text-darkText">
              <div className="text-start font-textFont text-sm">
                <span className="mr-1 font-semibold">Nota:</span>
                <span className="text-start text-xs font-light">
                  Indique la sección que desea modificar o cargue el comprobante correcto si envió uno por error.{' '}
                </span>
              </div>
            </p>
            <form className="flex flex-col">
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
                className={`w-ful mb-4 block h-[45px] resize-none rounded-2xl border border-inputLightDisabled px-3 py-2 placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight focus:placeholder-transparent dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText hover:dark:border-transparent dark:hover:placeholder-lightText focus:dark:border-transparent focus:dark:ring-transparent`}
                placeholder={isFocused ? '' : 'Necesito Modificar...'}
                onChange={handleNoteChange}
                required
                minLength={20}
                maxLength={200}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => setIsFocused(e.target.value !== '')}
              ></textarea>

              <div className="file-upload flex flex-col justify-between rounded-2xl">
                <div className="group flex h-full w-full flex-col items-center justify-center rounded-2xl border-[1px] border-inputLightDisabled py-2 text-center hover:border-inputLight dark:border-disabledDarkText dark:border-transparent dark:text-lightText dark:hover:border-darkText">
                  {!file ? (
                    <>
                      <p className="mb-1 hidden font-textFont text-sm text-inputLightDisabled group-hover:text-buttonsLigth dark:text-disabledDarkText group-hover:dark:text-darkText lg:inline-block">
                        SUBIR COMPROBANTE
                      </p>
                      <label
                        className={`${
                          isDark ? 'buttonSecondDark' : 'buttonSecond'
                        } relative mt-5 h-[48px] w-full max-w-[200px] items-center justify-center rounded-3xl border border-disabledButtonsLigth bg-disabledButtonsLigth p-[10px] font-textFont text-lg text-darkText group-hover:border-buttonsLigth group-hover:bg-buttonsLigth group-hover:text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText group-hover:dark:border-darkText group-hover:dark:bg-darkText group-hover:dark:text-lightText lg:mt-0`}
                      >
                        Subir Archivo
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".png,.jpg,.pdf"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <p className="text-sm text-buttonsLigth group-hover:text-darkText dark:text-disabledDarkText">
                        Archivo seleccionado: {file.name}
                      </p>
                      <button
                        onClick={handleFileRemove}
                        className="ml-3 rounded-full bg-buttonsLigth px-2 text-darkText hover:bg-errorColor dark:bg-darkText dark:text-lightText hover:dark:bg-errorColor"
                        aria-label="Eliminar archivo"
                      >
                        X
                      </button>
                    </div>
                  )}
                  {!file && (
                    <p className="mt-1 text-xs text-inputLightDisabled group-hover:text-buttonsLigth dark:text-disabledDarkText group-hover:dark:text-darkText">
                      Formatos de archivo: PNG, JPG, PDF
                    </p>
                  )}
                </div>
              </div>
            </form>
          </section>

          <div className="mt-4 flex flex-col-reverse justify-between xs:flex-row">
            <button
              onClick={onClose}
              className={`group relative m-1 flex h-[48px] min-w-[112px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-xl font-light text-buttonsLigth dark:border-darkText dark:text-darkText xs:min-w-[1px]`}
            >
              <div className="relative h-5 w-5 overflow-hidden">
                <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                  <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
                </div>
              </div>
              <p className={`inline-block text-buttonsLigth dark:text-darkText`}>Volver</p>
            </button>
            <div className="flex h-[48px] min-w-[183px] items-center justify-center">
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="50px" />
                </div>
              ) : (
                <button
                  className={`${
                    !note
                      ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
                      : isDark
                        ? 'buttonSecondDark'
                        : 'buttonSecond'
                  } relative m-1 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText`}
                  disabled={!note}
                  onClick={handleFormSubmit}
                  type="button"
                >
                  Enviar solicitud
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
