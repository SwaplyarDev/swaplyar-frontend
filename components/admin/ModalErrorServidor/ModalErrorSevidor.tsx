import React from 'react';

interface ServerErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const ServerErrorModal: React.FC<ServerErrorModalProps> = ({
  isOpen,
  onClose,
  message = 'Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde. En caso de que persista contactá con soporte.',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-red-600">Error del Servidor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-200">
          <p>{message}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorModal;
