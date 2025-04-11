'use client';

import { useState } from 'react';

export function UserNotesSection() {
  const [note, setNote] = useState('');

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-2 font-medium">Nota</h3>
      <p className="mb-2 text-sm text-gray-500">
        Si la solicitud de verificación es rechazada, se debe adjuntar una nota indicando los motivos del rechazo.
      </p>
      <textarea
        className="w-full rounded-lg border bg-white p-2 text-sm"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ingrese una nota aquí..."
      ></textarea>
    </div>
  );
}
