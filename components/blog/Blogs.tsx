'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationButtons from '../ui/PaginationButtonsProps/PaginationButtonsProps';
import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';
import BlogPostCard from './BlogPostCard/BlogPostCard';
import { gifImage } from '@/utils/assets/img-database';
import useBlogStore from '@/store/useBlogStore';
import useFetchBlogs from '@/hooks/useFetchBlogs/useFetchBlogs';
import SearchInput from '../ui/SearchInput/SearchInput';
interface BlogProps {
  currentPage: number;
}

// Funcion para remover la tilde de una palabra
function removeAccent(text: string) {
  return text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
}

const Blog: React.FC<BlogProps> = ({ currentPage }) => {
  const { blogs, isLoading, setIsLoading, totalPages } = useBlogStore(); // Obtengo los datos del store
  console.log(blogs);
  const searchParams = useSearchParams(); //Se obtienen los params de la url
  const router = useRouter();
  const searchQuery = searchParams.get('search') || ''; // Se obtiene el atributo search de la url

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  // Se fltran los blogs segun lo ingresado en el buscador
  const filteredBlogs = useMemo(() => {
    if (searchTerm === '') return blogs;
    return blogs.filter(
      (post) => removeAccent(post.title) && removeAccent(post.title.toLowerCase()).includes(searchTerm.toLowerCase()),
    );
  }, [blogs, searchTerm]);
  // Funcion para enviar la informacion del evento por params
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      router.replace(`/es/blog?page=1&search=${term}`, { scroll: false });
    },
    [router],
  );
  // Se obitienen los blogs a partir de la current page (pagina) y searchTerm (buscador)
  useFetchBlogs({
    currentPage,
    searchTerm,
  });

  return (
    <>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-20">
        <h1 className="mb-4 text-left font-titleFont text-[61.04px] font-semibold leading-[73.25px] text-inputLight dark:text-darkText">
          BLOG
        </h1>

        <ImageCarousel
          images={blogs.map((post) => ({
            blog_id: post.blog_id,
            slug: post.slug,
            title: post.title,
            description: post.description,
            image: post.image || '/images/paypalenarg.png',
            date: new Date().toISOString(),
            category: post.category,
          }))}
        />

        <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} results={filteredBlogs} />
        {/* Tarjetas de blogs */}
        {!isLoading ? (
          blogs.length >= 1 ? (
            <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              {blogs.map((post) => (
                <BlogPostCard
                  key={post.blog_id}
                  blog_id={post.blog_id}
                  description={post.description}
                  title={post.title}
                  category={post.category}
                  image={post.image || '/images/paypalenarg.png'}
                  date={post?.date}
                />
              ))}
            </div>
          ) : (
            <SkeletonLoader />
          )
        ) : (
          <SkeletonLoader />
        )}
      </div>
      {<PaginationButtons route="blog" totalPages={totalPages} isLoading={isLoading} currentPage={currentPage} />}
      {/* Banner */}
      <div
        className="mt-12 flex h-[272px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gifImage})` }}
      >
        <div className="max-w-[90%] text-center font-textFont text-[21px] font-extrabold leading-loose text-darkText md:max-w-[600px]">
          Mantente al día
        </div>
        <div className="max-w-[90%] text-center font-textFont text-[21px] font-extrabold leading-loose text-darkText md:max-w-[600px]">
          Regístrate para recibir novedades en tu correo electrónico
        </div>

        <div className="mt-4 inline-flex h-[46px] w-[300px] items-center justify-center gap-2.5 rounded-[50px] bg-darkText px-3.5 py-3">
          <div className="font-titleFont text-base font-semibold text-lightText">Suscribete</div>
        </div>
      </div>
    </>
  );
};

export default Blog;
