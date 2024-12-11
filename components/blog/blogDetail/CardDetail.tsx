// /components/info/blog/blogDetail/CardDetail.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogById } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';

const CardDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtiene el parámetro `id` de la URL
  const slug = searchParams.get('slug'); // Obtiene el parámetro `slug` de la URL
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Llama al servidor para obtener los datos
    const fetchData = async () => {
      try {
        const data = await fetchBlogById(id);
        setBlogData(data);
      } catch (error) {
        console.error('Error al obtener el blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Cargando...</p>;
  }

  if (!blogData) {
    return <p className="p-6 text-center text-gray-500">Blog no encontrado.</p>;
  }

  return <CardContent blogData={blogData} />;
};

export default CardDetail;
