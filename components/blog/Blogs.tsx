'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';
import { useRandomImages } from '@/components/ui/useRandomImages/useRandomImages';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';
import BlogPostCard from './BlogPostCard/BlogPostCard';
import { blogPosts } from '@/utils/dataBlog';
import { arrowBackIosLeft, arrowBackIosLeft1, arrow_back_iosr, arrow_forward_iosrr } from '@/utils/assets/img-database';
import { gifImage } from '@/utils/assets/img-database';
import useBlogStore from '@/store/useBlogStore';
import useFetchBlogs from '@/hooks/useFetchBlogs/useFetchBlogs';

const Blog: React.FC = () => {
  // const blogs = blogPosts;
  const { blogs } = useBlogStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(page);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(blogs.length === 0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const postsPerPage = 9;

  useFetchBlogs({
    currentPage,
    searchTerm,
    setTotalPages,
  });

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [blogs, searchTerm]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredBlogs.length / postsPerPage)));
  }, [filteredBlogs]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [page, currentPage]);

  const randomImages = useRandomImages(blogs);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        router.replace(`/blog?page=${page}&search=${searchTerm}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [totalPages, router, searchTerm],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setCurrentPage(1);
      router.replace(`/blog?page=1&search=${term}`, { scroll: false });
    },
    [router],
  );

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + postsPerPage);
  }, [filteredBlogs, currentPage]);

  const getPagesToShow = (currentPage: number, totalPages: number) => {
    let pages: (number | string)[] = [];
    if (totalPages <= 3) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 2) {
        pages = [1, 2, 3, '...'];
      } else if (currentPage >= totalPages - 1) {
        pages = ['...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
      }
    }
    return pages;
  };

  const pages = getPagesToShow(currentPage, totalPages);

  return (
    <>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-20">
        <h1 className="mb-6 text-left font-['Inter'] text-2xl text-[61.04px] font-semibold leading-[73.25px] text-[#012a8d] sm:text-3xl">
          Blog
        </h1>

        <div className="flex h-auto w-full max-w-[1200px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[100px] border-[10px] border-[#012A8E] bg-white sm:h-[300px] md:h-[350px] lg:h-[400px]">
          <ImageCarousel images={randomImages} />
        </div>
        <div className="mt-4 flex justify-start sm:justify-start">
          <div className="relative w-full sm:w-2/3 md:w-1/3">
            <input
              type="text"
              placeholder="Buscar en..."
              className="w-full rounded-full border border-gray-300 p-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 sm:text-base"
              style={{ color: 'black', backgroundColor: 'white' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-3 top-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-2 h-5 w-5"
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

        <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <SkeletonLoader />
          ) : paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((post) => <BlogPostCard key={post.blog_id} {...post} />)
          ) : (
            <p className="text-center text-gray-500">No se encontraron resultados.</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="disabled:opacity-50">
            <Image
              src={arrowBackIosLeft}
              alt="Ir al inicio"
              width={24}
              height={24}
              className="brightness-0 filter disabled:brightness-75 disabled:grayscale"
            />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <Image
              src={arrowBackIosLeft1}
              alt="Anterior"
              width={24}
              height={24}
              className="brightness-0 filter disabled:brightness-75 disabled:grayscale"
            />
          </button>

          {pages.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${currentPage === page ? 'bg-white text-black shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="flex h-10 w-10 items-center justify-center text-gray-400">
                {page}
              </span>
            ),
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <Image src={arrow_back_iosr} alt="Siguiente" width={24} height={24} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <Image src={arrow_forward_iosrr} alt="Ir al final" width={24} height={24} />
          </button>
        </div>
      </div>

      <div
        className="mt-12 flex h-[272px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gifImage})` }}
      >
        <div className="max-w-[90%] text-center font-['Roboto'] text-[21px] font-extrabold leading-loose text-[#ebe7e0] md:max-w-[600px]">
          Mantente al día
        </div>
        <div className="max-w-[90%] text-center font-['Roboto'] text-[21px] font-extrabold leading-loose text-[#ebe7e0] md:max-w-[600px]">
          Regístrate para recibir novedades en tu correo electrónico
        </div>

        <div className="mt-4 inline-flex h-[46px] w-[300px] items-center justify-center gap-2.5 rounded-[50px] bg-[#ebe7e0] px-3.5 py-3">
          <div className="font-['Open Sans'] text-base font-semibold text-[#252526]">Suscribete</div>
        </div>
      </div>
    </>
  );
};

export default Blog;
