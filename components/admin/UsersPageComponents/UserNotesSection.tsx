'use client';

import { useState } from 'react';

export function UserNotesSection() {
  const [note, setNote] = useState('');

  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 font-medium dark:text-white">Nota</h3>
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
  );
}
