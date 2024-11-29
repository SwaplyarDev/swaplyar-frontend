'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPostCardProps {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  cardId: string;
}

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
  }, []); 

  if (!blogData) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      {/* Contenedor de las 3 columnas con flex */}
      <div className="flex gap-4">
        {/* Primera columna: Cuadrado con borde redondeado y ancho ajustado */}
        <div className="p-4 border border-black rounded-3xl bg-gray-200 w-[270px]">
        <p>
         <p className='text-gray-500'>exercitationem, libero iusto</p> 
         <li>Lorem ipsum dolor</li>
         <li>consequuntur volu</li>
         <li>Lorem ipsum dolor</li>
         <li>consequuntur volu</li>
         <li>Lorem ipsum dolor</li>
        </p>
      </div>

        {/* Segunda columna: Titulo y contenido, ocupa el espacio restante */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mt-0 mb-1">{blogData.title}</h1>
          <p className="text-gray-700 mb-0">{blogData.body}</p>
        </div>

        {/* Tercera columna: Imagen, ocupa el espacio restante */}
        <div className="flex-1 flex flex-col items-center">
          <img src={blogData.url_image} alt={blogData.title} className="w-full h-auto my-4 rounded-lg h-[300px]" />
        </div>
      </div>

      {/* Fecha de publicación */}
      <p className="text-sm text-gray-500 mt-2">
        Publicado el: {new Date(blogData.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CardId;