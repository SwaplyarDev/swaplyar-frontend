'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPostCardProps {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  cardId: string;
}
//card
const CardId: React.FC = () => {
  const searchParams = useSearchParams();
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);

  useEffect(() => {
    const title = searchParams.get('title') || '';
    const body = searchParams.get('body') || '';
    const url_image = searchParams.get('url_image') || '';
    const created_at = searchParams.get('created_at') || '';
    const cardId = searchParams.get('cardId') || '';

    setBlogData({ title, body, url_image, created_at, cardId });

    const newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [searchParams]);

  if (!blogData) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      {/* Contenedor de las 3 columnas con flex */}
      <div className="flex gap-4">
        {/* Primera columna: Cuadrado con borde redondeado y ancho ajustado */}
        <div className="w-[270px] rounded-3xl border border-black bg-gray-200 p-4">
          <p>
            <p className="text-gray-500">exercitationem, libero iusto</p>
            <li>Lorem ipsum dolor</li>
            <li>consequuntur volu</li>
            <li>Lorem ipsum dolor</li>
            <li>consequuntur volu</li>
            <li>Lorem ipsum dolor</li>
          </p>
        </div>

        {/* Segunda columna: Titulo y contenido, ocupa el espacio restante */}
        <div className="flex flex-1 flex-col">
          <h1 className="mb-1 mt-0 text-2xl font-bold">{blogData.title}</h1>
          <p className="mb-0 text-gray-700">{blogData.body}</p>
        </div>

        {/* Tercera columna: Imagen, ocupa el espacio restante */}
        <div className="flex flex-1 flex-col items-center">
          <Image className="my-4 h-auto w-full rounded-lg" src={blogData.url_image} alt={blogData.title} width={200} />
        </div>
      </div>

      {/* Fecha de publicación */}
      <p className="mt-2 text-sm text-gray-500">Publicado el: {new Date(blogData.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default CardId;
