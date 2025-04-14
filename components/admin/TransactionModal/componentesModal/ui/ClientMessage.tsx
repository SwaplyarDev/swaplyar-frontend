import type React from 'react';
import { MessageSquare } from 'lucide-react';

interface ClientMessageProps {
  message: string;
  headerMessage: string;
  classnames?: string;
}

const ClientMessage: React.FC<ClientMessageProps> = ({ message, headerMessage, classnames }) => {
  return (
    <section className="flex flex-col rounded-lg border border-t bg-white p-3 text-left shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
      <div className="mb-2 flex items-center gap-2 pl-2">
        <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
        <p className="font-medium text-gray-800 dark:text-gray-200">{headerMessage}</p>
      </div>

      <article className="rounded-lg bg-gray-50 p-4 text-gray-800 shadow-inner transition-all duration-300 dark:bg-gray-800/80 dark:text-gray-200">
        {message ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message}</p>
        ) : (
          <p className="italic text-gray-500 dark:text-gray-400">No hay mensaje disponible</p>
        )}
      </article>
    </section>
  );
};

export default ClientMessage;
