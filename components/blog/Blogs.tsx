'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';
import { useRandomImages } from '@/components/ui/useRandomImages/useRandomImages';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';
import BlogPostCard from './BlogPostCard/BlogPostCard';
import { blogPosts } from '@/utils/dataBlog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Blog: React.FC = () => {
  const blogs = blogPosts;
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const postsPerPage = 9;

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(blogs.length / postsPerPage)));
  }, [blogs]);

  const randomImages = useRandomImages(blogs);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
        router.push(`/blog?page=${page}`, { scroll: false });
      }
    },
    [totalPages, router],
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      setIsLoading(false);
    }
  }, [blogs]);

  return (
    <div className="mx-auto max-w-7xl p-6 px-4 sm:px-6 lg:px-20">
      <h1 className="mb-8 text-left text-3xl font-bold">Blog</h1>

      <ImageCarousel images={randomImages} />

      {/* Input de búsqueda */}
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
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <SkeletonLoader />
        ) : blogs.length > 0 ? (
          blogs.map((post) => (
            <BlogPostCard
              key={post.blog_id}
              blog_id={post.blog_id}
              sub_title={post.sub_title}
              title={post.title}
              body={post.body}
              url_image={post.url_image}
              ver={post.ver}
              created_at={post.created_at}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>

      {/* Botones de paginación */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            currentPage === 1 ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-lg text-white" />
        </button>

        <span className="px-4 py-2 text-lg font-bold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            currentPage === totalPages ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-lg text-white" />
        </button>
      </div>
    </div>
  );
};

export default Blog;
