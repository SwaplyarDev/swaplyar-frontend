'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/components/ui/fetchBlogs/fetchBlogs';
import useBlogStore from '@/store/useBlogStore'; // Asegúrate de que este hook esté configurado correctamente.

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Blog {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
}

const CardId = () => {
  const searchParams = useSearchParams(); 
  const titleFromParams = searchParams.get('title'); 
  const { blogs, setBlogs } = useBlogStore(); 
  const [filteredBlog, setFilteredBlog] = useState<Blog | null>(null); 

  // Función para cargar blogs
  const getBlogs = async () => {
    try {
      const data = await fetchBlogs(1, '', BASE_URL!); 
      setBlogs(data.blogsPerPage);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Llamar a getBlogs solo una vez al cargar el componente
  useEffect(() => {
    getBlogs();
  }, [setBlogs]);

  // Filtrar el blog basado en el título de la URL
  useEffect(() => {
    if (titleFromParams && blogs.length > 0) {
      const blog = blogs.find((b) => b.title.toLowerCase() === titleFromParams.toLowerCase());
      setFilteredBlog(blog || null); 
    }
  }, [titleFromParams, blogs]);

  if (!filteredBlog) {
    return <p>Cargando...</p>; 
  }

  return (
    <div>
      <h1>{filteredBlog.title}</h1>
      <img src={filteredBlog.url_image} alt={filteredBlog.title} />
      <p>{filteredBlog.body}</p>
      <p>{new Date(filteredBlog.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default CardId;