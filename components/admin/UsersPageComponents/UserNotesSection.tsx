'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function UserNotesSection({note_rejection}: { note_rejection: string | null }) {
  const [note, setNote] = useState(note_rejection || '');
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-lg border bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Nota</h3>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isExpanded ? 'Colapsar sección' : 'Expandir sección'}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Si la solicitud de verificación es rechazada, se debe adjuntar una nota indicando los motivos del rechazo.
        </p>
        <textarea
          className="w-full rounded-lg border bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ingrese una nota aquí..."
        ></textarea>
      </div>
    </div>
  );
}
