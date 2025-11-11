'use client';
import React, { useState } from 'react';
import { sendFormData } from '@/actions/editRequest/editRequest.action';
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
  transaccionId: string;
  code: string;
  transactionData: any; // viene desde VerifycodeEditRequest
  noteAccessToken: string | null;
}

const Modal1: React.FC<ModalProps> = ({
  isDark,
  isOpen,
  onClose,
  transaccionId,
  code,
  transactionData,
  noteAccessToken,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'datos_envio' | 'datos_recepcion' | 'monto' | null>(null);
  if (!isOpen) return null;

  /** 📝 Handlers */
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);

    const newPreviews = newFiles
      .map((file) => (file.type.startsWith('image/') ? URL.createObjectURL(file) : null))
      .filter(Boolean) as string[];

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /** Envío del formulario */
  const handleFormSubmit = async () => {
    console.log('Datos a enviar en el submittt:', {
      note,
      transaccionId,
      noteAccessToken,
      files,
    });

    if (!note || !transaccionId) {
      PopUp({
        variant: 'simple-warning',
        title: 'Por favor, complete la nota antes de enviar.',
        isDark,
      });
      return;
    }

    try {
      setLoading(true);
      const result = await sendFormData({
      const result = await sendFormData({
        message: note,
        files,
        transaccionId,
        files,
        transaccionId,
        noteAccessToken: noteAccessToken ?? '',
        section: selectedSection || 'datos_envio',
      });

      console.log('✅ Enviado correctamente:', result);
      PopUp({
        variant: 'success-compact',
        title: 'Solicitud enviada con éxito',
        text: 'Hemos recibido su solicitud de modificación. Si necesitamos más información, te contactaremos.',
        isDark,
      });

      onClose();
    } catch (error: any) {
    } catch (error: any) {
      console.error('Error al enviar los datos:', error);

      const backendMessage =
        typeof error === 'object' && error.message
          ? error.message
          : 'Error desconocido al enviar la solicitud.';

      PopUp({
        variant: 'simple-error',
        title: error.message || 'Error desconocido al enviar la solicitud.',
        isDark,
      });
    } finally {
      setLoading(false);
    }
  };

  /** 🧠 Render según método de pago */
  const PayMethodInfo: React.FC = () => {
    const method = transactionData?.receiverAccount?.paymentMethod?.method

    if (method === 'bank') {
      return (
        <div className="flex justify-between text-sm">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Nombre</p>
            <p>Apellido</p>
            <p>CBU / CVU / ALIAS</p>
            <p>Banco</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.receiverAccount?.firstName}</p>
            <p>{transactionData?.receiverAccount?.lastName}</p>
            <p>{transactionData?.receiverAccount?.paymentMethod?.sendMethodValue}</p>
            <p>{transactionData?.receiverAccount?.paymentMethod?.bankName}</p>
          </div>
        </div>
      );
    }

    if (method === 'receiver_crypto') {
      return (
        <div className="flex justify-between text-sm">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Dirección USDT</p>
            <p>Red</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.receiverAccount?.paymentMethod?.wallet}</p>
            <p>{transactionData?.receiverAccount?.paymentMethod?.network}</p>
          </div>
        </div>
      );
    }

    if (method === 'pix') {
      return (
        <div className="flex justify-between text-sm">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>PIX KEY</p>
            <p>CPF</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.receiverAccount?.paymentMethod?.pixValue}</p>
            <p>{transactionData?.receiverAccount?.paymentMethod?.cpf}</p>
          </div>
        </div>
      );
    }

    if (method === 'virtual_bank') {
      return (
        <div className="flex justify-between text-sm">
          <div className="flex flex-col text-start text-lightText dark:text-darkText">
            <p>Correo electrónico</p>
          </div>
          <div className="flex flex-col text-end text-lightText dark:text-darkText">
            <p>{transactionData?.receiverAccount?.paymentMethod?.emailAccount}</p>
          </div>
        </div>
      );
    }

    return <p className="text-center text-sm text-lightText dark:text-darkText">Método no reconocido.</p>;
  };

  /** 🧱 Render principal */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative mt-24 w-full max-w-[350px] xs:max-w-[510px] xl:max-w-[556px] rounded-lg bg-white p-6 shadow-lg dark:bg-[#333231]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-10">
          <div className="absolute left-2 top-2">
        <div className="flex h-10">
          <div className="absolute left-2 top-2">
            <IconWarning size={70} />
          </div>
          <h2 className="w-full text-center font-textFont text-lg font-semibold text-custom-blue dark:text-darkText">
            Solicitud N° {transaccionId}
          </h2>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto scrollbar">
          {/* DATOS DEL USUARIO */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-center font-semibold text-buttonsLigth dark:text-darkText">
                Mis Datos
              </h3>
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="section"
                  value="datos_envio"
                  checked={selectedSection === 'datos_envio'}
                  onChange={() => setSelectedSection('datos_envio')}
                  className="peer sr-only"
                />
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border transition-all duration-200',
                    selectedSection === 'datos_envio'
                      ? 'border-custom-blue'
                      : 'border-gray-400 dark:border-gray-500'
                  )}
                >
                  <div
                    className={clsx(
                      'absolute inset-0 m-auto w-2 h-2 rounded-full transition-opacity duration-200',
                      selectedSection === 'datos_envio'
                        ? 'bg-custom-blue opacity-100'
                        : 'opacity-0'
                    )}
                  ></div>
                </div>
              </label>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Teléfono</p>
              </div>
              <div className="flex flex-col text-end text-lightText dark:text-darkText">
                <p>{transactionData?.senderAccount?.firstName}</p>
                <p>{transactionData?.senderAccount?.lastName}</p>
                <p>{transactionData?.senderAccount?.phoneNumber}</p>
              </div>
            </div>
            <div className="w-2/3 h-[1px] bg-custom-blue self-center" />
            <div className="w-2/3 h-[1px] bg-custom-blue self-center" />
          </section>

          {/* DATOS DEL DESTINATARIO */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-center font-semibold text-buttonsLigth dark:text-darkText">
                Información del Destinatario
              </h3>
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="section"
                  value="datos_recepcion"
                  checked={selectedSection === 'datos_recepcion'}
                  onChange={() => setSelectedSection('datos_recepcion')}
                  className="peer sr-only"
                />
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border transition-all duration-200',
                    selectedSection === 'datos_recepcion'
                      ? 'border-custom-blue'
                      : 'border-gray-400 dark:border-gray-500'
                  )}
                >
                  <div
                    className={clsx(
                      'absolute inset-0 m-auto w-2 h-2 rounded-full transition-opacity duration-200',
                      selectedSection === 'datos_recepcion'
                        ? 'bg-custom-blue opacity-100'
                        : 'opacity-0'
                    )}
                  ></div>
                </div>
              </label>
            </div>
            <PayMethodInfo />
            <div className="w-2/3 h-[1px] bg-custom-blue self-center" />
          </section>

          {/* DATOS DEL PAGO */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-center font-semibold text-buttonsLigth dark:text-darkText">
                Pago
              </h3>
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="section"
                  value="monto"
                  checked={selectedSection === 'monto'}
                  onChange={() => setSelectedSection('monto')}
                  className="peer sr-only"
                />
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border transition-all duration-200',
                    selectedSection === 'monto'
                      ? 'border-custom-blue'
                      : 'border-gray-400 dark:border-gray-500'
                  )}
                >
                  <div
                    className={clsx(
                      'absolute inset-0 m-auto w-2 h-2 rounded-full transition-opacity duration-200',
                      selectedSection === 'monto'
                        ? 'bg-custom-blue opacity-100'
                        : 'opacity-0'
                    )}
                  ></div>
                </div>
              </label>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex flex-col text-start text-lightText dark:text-darkText">
                <p>Monto a Pagar</p>
                <p>Monto a Recibir</p>
              </div>
              <div className="flex flex-col text-end text-lightText dark:text-darkText">
                <p>
                  {transactionData?.amount?.amountSent} {transactionData?.amount?.currencySent}
                </p>
                <p>
                  {transactionData?.amount?.amountReceived} {transactionData?.amount?.currencyReceived}
                </p>
              </div>
            </div>
            <div className="w-2/3 h-[1px] bg-custom-blue self-center" />
            <div className="w-2/3 h-[1px] bg-custom-blue self-center" />
          </section>

          {/* NOTA Y ARCHIVOS */}
          <section>
            <div className="text-start text-sm dark:text-darkText">
              <span className="mr-1 font-semibold text-custom-blue">Nota:</span>
              <span className="text-xs font-light">
                Indique la sección que desea modificar y adjunte el comprobante correcto.
              </span>
            </div>

            <FileUpload
              label="Comprobantes"
              handleChange={handleFileChange}
              previewImages={previewImages}
              onRemoveImage={handleRemoveImage}
              label="Comprobantes"
              handleChange={handleFileChange}
              previewImages={previewImages}
              onRemoveImage={handleRemoveImage}
              isDark={isDark}
              accept=".png,.jpg,.jpeg,.pdf"
              maxFiles={5}
              showPreview
              accept=".png,.jpg,.jpeg,.pdf"
              maxFiles={5}
              showPreview
            />

            <textarea
              rows={2}
              id="note"
              className={clsx(
                'w-full mt-3 rounded-2xl border border-inputLightDisabled px-3 py-2 text-sm',
                'text-lightText dark:text-lightText'
              )}
              placeholder="Necesito modificar..."
              value={note}
              onChange={handleNoteChange}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
            />
            />
          </section>

          {/* BOTONES */}
          {/* BOTONES */}
          <div className="mt-4 flex flex-col-reverse justify-between xs:flex-row">
            <button
              onClick={onClose}
              className="flex items-center h-[38px] rounded-full dark:text-darkText"
            >
              <ChevronLeft
                color={isDark ? '#ebe7e0' : '#012c8a'}
                width={32}
                height={32}
                strokeWidth={2}
              />
            </button>

            <ButtonAuth
              disabled={!note || loading}
              label={loading ? 'Enviando...' : 'Solicitar Modificación'}
              isDark={isDark}
              onClick={handleFormSubmit}
              className="px-6 sm:px-14 max-h-8 sm:max-h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;