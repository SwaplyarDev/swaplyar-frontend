import React from 'react';
function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}
// Funcion para agrandar tamaño de fuente
// Agranda tamaño de a todo texto que este entre **
export function fontSizeText(text: string) {
  if (isString(text)) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      Array.isArray(parts) &&
      parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <span key={i} style={{ fontSize: '20px' }}>
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )
    );
  }
}
export default function MessageWpp({ text }: { text: string }) {
  return (
    <article className="w-full bg-gradient-to-r from-[#012A8E] to-[#048604] p-3 text-center">
      <p className="font-semibold text-white">{fontSizeText(text)}</p>
    </article>
  );
}
