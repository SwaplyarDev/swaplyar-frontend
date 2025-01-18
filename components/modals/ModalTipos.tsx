import React, { useEffect, useState } from 'react';
import Arrow from '../ui/Arrow/Arrow';
import { fetchTransactionData, sendFormData } from '@/actions/editRequest/editRequest.action';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import LoadingGif from '../ui/LoadingGif/LoadingGif';

interface ModalProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  transaccionId?: string;
}
interface payMethodInfo {
  methodDestinatario: string;
}

const Modal1: React.FC<ModalProps> = ({ isOpen, onClose, isDark, transaccionId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');
  useEffect(() => {
    if (transaccionId) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchTransactionData(transaccionId);
        setTransactionData(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [transaccionId]);

  if (!isOpen) return null;

  const methodDestinatario = 'datos';

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
  const handleEditRequestError = () => {
    Swal.fire({
      title: '<h2 style="font-size: 24px;">Error al editar solicitud!</h2>',
      icon: 'info',
      html: `
        <p style="font-size: 16px;">Debe ingresar una nota, seleccionar un archivo y proporcionar el ID de transacción.</p>
        <p style="font-size: 16px;">Si sigue dando error, contactar a soporte.</p>
        <div id="back-button-container" class="flex items-center justify-center mt-5"></div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          const root = createRoot(backElement);
          root.render(
            <button
              onClick={() => Swal.close()}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} backRequest={true} />
              Volver
            </button>,
          );
        }
      },
    });
  };

  const handleEditRequestSuccess = () => {
    Swal.fire({
      title: '<h2 style="font-size: 24px;">Solucitud enviado con exito!</h2>',
      icon: 'success',
      html: `
        <p style="font-size: 16px;">Su solicitud fue envia con exito, en la brevedad nos pondremos en contacto contigo.</p>
        <div id="back-button-container" class="flex items-center justify-center mt-5"></div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          const root = createRoot(backElement);
          root.render(
            <button
              onClick={() => Swal.close()}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} backRequest={true} />
              Volver
            </button>,
          );
        }
      },
    });
  };

  const handleFormSubmit = async () => {
    if (!note || !transaccionId) {
      handleEditRequestError();
      return;
    }

    try {
      setLoading(true);
      // const token = sessionStorage.getItem('token');

      // if (!token) {
      //   handleEditRequestError();
      //   return;
      // }
      await sendFormData({
        message: note,
        file: file,
        transaccionId: transaccionId,
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
  const PayMethodInfo: React.FC<payMethodInfo> = ({ methodDestinatario }) => {
    if (methodDestinatario === 'datos') {
      return (
        <div className="mx-10 flex justify-between">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre </p>
            <p>Apellido </p>
            <p>Email </p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.receiver?.first_name}</p>
            <p>{transactionData?.transaction?.receiver?.last_name}</p>
            <p>{transactionData?.transaction?.receiver?.email}</p>
          </div>
        </div>
      );
    } else if (methodDestinatario === 'USDT') {
      return (
        <div className="mx-10 flex justify-between">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Dirección USDT </p>
            <p>Red </p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.receiver?.payment_method_id}</p>
            <p>{transactionData?.transaction?.country_transaction}</p>
          </div>
        </div>
      );
    } else if (methodDestinatario === 'banco') {
      return (
        <div className="mx-10 flex justify-between">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre </p>
            <p>Apellido </p>
            <p>TAX ID/CUIT/CUIL</p>
            <p>Nombre del Banco</p>
            <p>CBU/CVU/ALIAS</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.sender?.first_name}</p>
            <p>{transactionData?.transaction?.sender?.last_name}</p>
            <p>{transactionData?.transaction?.sender?.identification}</p>
            <p>{transactionData?.transaction?.payment_method?.value}</p>
            <p>{transactionData?.transaction?.payment_method?.value}</p>{' '}
          </div>
        </div>
      );
    } else if (methodDestinatario === 'PIX') {
      return (
        <div className="mx-10 flex justify-between">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre </p>
            <p>Apellido </p>
            <p>PIX KEY</p>
            <p>Individual TAX ID (CPF)</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.transaction?.sender?.first_name}</p>
            <p>{transactionData?.transaction?.sender?.last_name}</p>
            <p>{transactionData?.transaction?.sender?.identification}</p>
            <p>{transactionData?.transaction?.receiver?.payment_method_id}</p>
          </div>
        </div>
      );
    } else {
      console.error('No fue recibido el método', new Error());
      return null;
    }
  };
  return (
    <div
      className="fixed inset-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        style={{ top: '0px', bottom: '64px' }}
        className="relative mt-24 w-11/12 rounded-lg bg-[#dcdee0] p-6 shadow-lg dark:bg-[#333231] md:w-8/12 lg:w-6/12 xl:w-5/12"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-2xl font-bold text-lightText dark:text-darkText">
          Formulario de solicitud N°{transaccionId}
        </h2>

        <div className="max-h-[70vh] overflow-y-auto">
          <section className="flex flex-col">
            <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth dark:text-darkText">Mis Datos</h3>
            <div className="mx-10 flex justify-between">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p>Nombre </p>
                <p>Apellido </p>
                <p>Email </p>
                <p>N° de Teléfono </p>
              </div>
              <div className="flex flex-col text-end text-lightText dark:text-darkText">
                <p>{transactionData?.transaction?.sender?.first_name}</p>
                <p>{transactionData?.transaction?.sender?.last_name}</p>
                <p>{transactionData?.transaction?.sender?.email}</p>
                <p>{transactionData?.transaction?.sender?.phone_number}</p>
              </div>
            </div>
          </section>
          <div className="my-3 flex w-full justify-center">
            <div className={`mr-0 flex h-full w-10/12 border-0 border-b-buttonsLigth lg:mr-3 lg:border-b-2`}></div>
          </div>

          <section className="flex flex-col">
            <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth dark:text-darkText">
              informacion del Destinatario
            </h3>

            <PayMethodInfo methodDestinatario={methodDestinatario} />
          </section>
          <div className="mb-1 mt-3 flex w-full justify-center">
            <div className={`mr-0 flex h-full w-10/12 border-0 border-b-buttonsLigth lg:mr-3 lg:border-b-2`}></div>
          </div>

          <section className="flex flex-col">
            <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth dark:text-darkText">Pago</h3>
            <div className="mx-10 flex justify-between">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p className="mr-20">Monto a pagar </p>
                <p>Monto a recibir </p>
              </div>
              <div className="flex flex-col text-end text-lightText dark:text-darkText">
                <p>{transactionData?.transaction?.amounts?.sent?.amount}</p>
                <p>{transactionData?.transaction?.amounts?.received?.amount}</p>
              </div>
            </div>
          </section>
          <div className="my-3 flex w-full justify-center">
            <div className={`mr-3 flex h-full w-10/12 border-b-2 border-b-buttonsLigth`}></div>
          </div>

          <section className="text-buttonsLigth dark:text-darkText">
            <p className="flex h-1/2 flex-col">
              <div className="text-start">
                <span className="mr-1 font-bold">Nota:</span>
                <span className="text-start">
                  Indique la sección que desea modificar o cargue el comprobante correcto si envió uno por error.{' '}
                </span>
              </div>
            </p>
            <form>
              <textarea
                rows={4}
                className="mb-4 block w-full rounded-md border border-gray-300 p-2 text-lightText dark:bg-[#bdb8b4]"
                placeholder="Escriba aquí su comentario o nota..."
                onChange={handleNoteChange}
                required
              ></textarea>

              <div className="file-upload flex flex-col justify-between rounded-md border-2 border-dashed border-buttonsLigth">
                <div className="z flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#E3E9FF] text-center hover:bg-[#ced8fd] dark:bg-[#bdb8b4]">
                  {!file ? (
                    <>
                      <p className="mb-5 hidden text-buttonsLigth lg:inline-block">Arrastre aquí el archivo o</p>
                      <label
                        className={`buttonSecondDarkbuttonSecond relative mt-5 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-darkText lg:mt-0`}
                      >
                        Subir
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
                      <p className="text-sm text-buttonsLigth">Archivo seleccionado: {file.name}</p>
                      <button
                        onClick={handleFileRemove}
                        className="ml-3 rounded-full bg-buttonsLigth px-2 text-white hover:bg-red-700"
                        aria-label="Eliminar archivo"
                      >
                        X
                      </button>
                    </div>
                  )}
                  {!file && (
                    <p className="mt-5 text-sm text-buttonsLigth">
                      Formatos de archivo permitidos: <strong>PNG, JPG, PDF</strong>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </section>

          <div className="mt-4 flex justify-between">
            <button
              onClick={onClose}
              className={`${
                isDark ? 'buttonSecondDark' : 'buttonSecond'
              } group relative m-1 flex h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth dark:border-darkText dark:text-darkText xs:min-w-[150px]`}
            >
              <div className="relative h-5 w-5 overflow-hidden">
                <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                  <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
                </div>
              </div>
              <p className={`inline-block text-buttonsLigth dark:text-darkText`}>Volver</p>
            </button>
            <button
              className={`${
                isDark ? 'buttonSecondDark' : 'buttonSecond'
              } relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-darkText disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:border-darkText dark:bg-darkText dark:text-lightText`}
              onClick={handleFormSubmit}
              type="button"
            >
              {loading ? (
                <div id="loading" className="flex items-center justify-center gap-2">
                  <LoadingGif color={!isDark ? '#ebe7e0' : '#012c8a'} />
                  <span>Enviando...</span>
                </div>
              ) : (
                'Enviar solicitud'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
