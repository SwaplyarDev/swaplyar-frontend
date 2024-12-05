// /components/info/blog/Blogs.tsx

'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostCard from '@/components/info/blog/BlogPostCard/BlogPostCard';
import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';
import PaginationButtonsProps from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';
import useBlogStore from '@/store/useBlogStore';
import usePageSync from '@/components/ui/usePageSync/usePageSync';
import { useRandomImages } from '@/components/ui/useRandomImages/useRandomImages';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';
import useFetchBlogs from '@/hooks/useFetchBlogs/useFetchBlogs';

const Blog: React.FC = () => {
  const { blogs } = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();

  // Usar el custom hook para sincronizar la página
  usePageSync(currentPage, setCurrentPage);

  // Fetch de blogs y total de páginas
  useFetchBlogs({
    currentPage,
    searchTerm,
    setTotalPages,
  });

  // Imágenes aleatorias para el carrusel
  const randomImages = useRandomImages(blogs);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
        router.replace(`/info/blog?page=${page}`, { scroll: false });
      }
    },
    [currentPage, router],
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página en cada nueva búsqueda
    setIsLoading(true); // Comienza la carga nuevamente al buscar
  }, []);

  // Filtrar blogs según el término de búsqueda
  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [blogs, searchTerm]);

  // Esqueleto de carga

  // Lógica para mostrar el esqueleto de carga hasta que los datos estén disponibles
  useEffect(() => {
    if (blogs.length > 0) {
      setIsLoading(false); // Finaliza la carga cuando los blogs estén disponibles
    }
  }, [blogs]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-left text-3xl font-bold">Blog</h1>

      <ImageCarousel images={randomImages} />
      <div className="mt-4 flex justify-end">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar en..."
            className="w-full rounded-2xl border border-gray-300 p-2 pl-4 pr-10 focus:outline-none focus:ring-0"
            style={{ color: 'black', backgroundColor: 'white' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="absolute right-3 top-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 2a9 9 0 100 18 9 9 0 000-18zM21 21l-6-6"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Renderizar el esqueleto o las tarjetas según el estado de carga */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <SkeletonLoader />
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => (
            <BlogPostCard
              key={post.blog_id}
              blog_id={post.blog_id}
              title={post.title}
              body={post.body}
              url_image={post.url_image}
              created_at={post.created_at}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>

      <PaginationButtonsProps
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Blog;
