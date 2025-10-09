'use client';
import Image from 'next/image';

export function DocumentImagePreview({
  src,
  alt,
  onClick,
}: {
  src?: string;
  alt: string;
  onClick?: () => void;
}) {
  if (!src)
    return (
      <div className="flex h-48 w-full max-w-xs items-center justify-center rounded-lg border bg-gray-100 text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        No disponible
      </div>
    );

  return (
    <div
      onClick={onClick}
      className="relative h-48 w-full max-w-xs cursor-pointer overflow-hidden rounded-lg border bg-gray-100 transition-transform duration-300 hover:scale-[1.02]"
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
