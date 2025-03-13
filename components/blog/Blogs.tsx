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

const Blog: React.FC<BlogProps> = ({ currentPage }) => {
  const { blogs, isLoading, setIsLoading } = useBlogStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const [totalPages, setTotalPages] = useState<number>(1);

  const filteredBlogs = useMemo(() => {
    if (searchTerm === '') return blogs;
    return blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [blogs, searchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      router.replace(`/blog?page=1&search=${term}`, { scroll: false });
    },
    [router],
  );

  useFetchBlogs({
    currentPage,
    searchTerm,
    setTotalPages,
  });

  return (
    <>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-20">
        <h1 className="mb-4 text-left font-titleFont text-[61.04px] font-semibold leading-[73.25px] text-inputLight dark:text-darkText">
          BLOG
        </h1>

        <ImageCarousel images={blogs} />

        <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} results={filteredBlogs} />

        {!isLoading ? (
          blogs.length >= 1 ? (
            <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              {blogs.map((post) => (
                <BlogPostCard
                  key={post.blog_id}
                  blog_id={post.blog_id}
                  body={post.body}
                  title={post.title}
                  category={post.category}
                  url_image={post.url_image}
                  created_at={post.created_at}
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
      <PaginationButtons
        route="/blog"
        setIsLoading={setIsLoading}
        totalPages={totalPages}
        isLoading={isLoading}
        currentPage={currentPage}
      />

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
