// /app/test-error/page.tsx
'use client';

import React, { useState } from 'react';

export default function TestErrorPage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('¡Error simulado!');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Simular un Error</h1>
      <button onClick={() => setHasError(true)} className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white">
        Simular Error
      </button>
    </div>
  );
}
