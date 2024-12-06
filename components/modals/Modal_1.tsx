import React, { useState } from 'react';
import Arrow from '../ui/Arrow/Arrow';

interface ModalProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}
const Modal1: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isDark }) => {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      alert(`Subiendo archivo: ${file.name}`);
      // Aquí puedes agregar lógica para subir el archivo a un servidor.
    } else {
      alert('No se ha seleccionado ningún archivo.');
    }
  };
  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <div
      className="fixed inset-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        style={{ top: '0px', bottom: '64px' }}
        className="h-90 relative mt-24 w-1/3 rounded-lg bg-[#E3E9FF] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
      >
        {/* Título del Modal */}
        <h2 className="mb-4 text-2xl font-bold text-black">Formulario de solicitud N°requestNumber</h2>

        {/* Información Plana */}
        <section className="flex flex-col">
          <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth">Mis Datos</h3>
          <div className="mx-10 flex justify-between">
            <div className="flex flex-col text-start text-black">
              <p>Nombre: </p>
              <p>Apellido: </p>
              <p>Email: </p>
              <p>N° de Teléfono: </p>
            </div>
            <div className="flex flex-col text-end text-black">
              <p>Juan</p>
              <p>Pérez</p>
              <p>juan.perez@example.com</p>
              <p>+123 456 789</p>
            </div>
          </div>
        </section>
        <div className="my-3 flex w-full justify-center">
          <div className={`mr-0 flex h-full w-9/12 border-0 border-b-buttonsLigth lg:mr-3 lg:border-b-2`}></div>
        </div>

        <section className="flex flex-col">
          <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth">informacion del Destinatario</h3>
          <div className="mx-10 flex justify-between">
            <div className="flex flex-col text-start text-black">
              <p>Nombre: </p>
              <p>Apellido: </p>
              <p>Email: </p>
            </div>
            <div className="flex flex-col text-end text-black">
              <p>Juan</p>
              <p>Pérez</p>
              <p>juan.perez@example.com</p>
            </div>
          </div>
        </section>
        <div className="mb-1 mt-3 flex w-full justify-center">
          <div className={`mr-0 flex h-full w-9/12 border-0 border-b-buttonsLigth lg:mr-3 lg:border-b-2`}></div>
        </div>

        <section className="flex flex-col">
          <h3 className="mb-2 flex text-lg font-semibold text-buttonsLigth">Pago</h3>
          <div className="mx-10 flex justify-between">
            <div className="flex flex-col text-start text-black">
              <p className="mr-20">Monto a pagar: </p>
              <p>Monto a recibir: </p>
            </div>
            <div className="flex flex-col text-end text-black">
              <p>350</p>
              <p>320</p>
            </div>
          </div>
        </section>
        <div className="my-3 flex w-full justify-center">
          <div className={`mr-0 flex h-full w-9/12 border-0 border-b-buttonsLigth lg:mr-3 lg:border-b-2`}></div>
        </div>

        <section className="text-buttonsLigth">
          <p className="flex h-1/2">
            <span className="mr-1 font-bold">Nota:</span>
            <span className="text-justify">Indique la sección que desea modificar o cargue el comprobante </span>
          </p>
          <p className="text-start">correcto si envió uno por error.</p>
          {/* Formulario */}
          <form>
            <textarea
              rows={4}
              className="mb-4 block w-full rounded-md border border-gray-300 p-2"
              placeholder="Escriba aquí su comentario o nota..."
            ></textarea>

            <div className="file-upload flex flex-col justify-between border-2 border-dashed border-buttonsLigth">
              <div className="z flex h-full w-full flex-col items-center justify-center border-2 border-dashed bg-[#E3E9FF] text-center hover:bg-[#ced8fd]">
                {!file ? (
                  <>
                    <p className="mb-5">Arrastre aquí el archivo o</p>
                    <label
                      className={`buttonSecondDarkbuttonSecond relative h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white`}
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

        {/* Botones de acción */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className={`buttonSecond group relative m-1 mr-14 flex h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth xs:min-w-[150px]`}
          >
            <div className="relative h-5 w-5 overflow-hidden">
              <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                <Arrow color={'#012c8a'} />
              </div>
            </div>
            <p className={`hidden text-buttonsLigth xs:inline-block`}>Volver</p>
          </button>
          <button
            className={`buttonSecond relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none`}
            onClick={onClose}
          >
            Editar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
