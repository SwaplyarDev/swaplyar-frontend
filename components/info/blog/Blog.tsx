'use client';
import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useBlogStore from '@/store/useBlogStore';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogPostCard from '@/components/ui/BlogPostCard/BlogPostCard';
import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Blog: React.FC = () => {
  const { blogs, setBlogs } = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<number | null>(null);
  const postsPerPage = 9;
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  let pageButtons: (number | string)[] = [];

  if (currentPage <= 2) {
    pageButtons = [1, 2, 3, '...', totalPages];
  } else if (currentPage >= totalPages - 2) {
    pageButtons = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageButtons = [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  const router = useRouter();
  const searchParams = useSearchParams();


  const datas = {
    content: 'Titulo Editado 3'
  };

  fetch(`${BASE_URL}/v1/blogs/content`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setCurrentPage(page);
      router.replace(`/info/blog?page=${page}`, { scroll: false });
    }
  };

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = `${BASE_URL}/v1/blogs?page=${currentPage}`;
        
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setBlogs(data.blogsPerPage);
        setData(data.meta.totalPages);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
  
    fetchBlogs();
  }, [currentPage, searchTerm, setBlogs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página en cada nueva búsqueda
  };

  useEffect(() => {
    if (Array.isArray(blogs)) {
      const images = blogs.map((el) => el.url_image);
      setRandomImages(images);
    }
  }, [blogs]);

  const filteredBlogs = blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
            onChange={handleSearchChange} // Cambié aquí para usar la función manejadora correcta
          />
          <span className="absolute right-3 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 2a9 9 0 100 18 9 9 0 000-18zM21 21l-6-6" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => (
            <BlogPostCard
              key={post.blog_id}
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

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`h-10 w-10 rounded-full border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {pageButtons.map((pageNumber, index) => (
          typeof pageNumber === 'number' ? (
            <button
              key={index}
              className={`w-10 h-10 border rounded-full ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
          )
        ))}

        <button
          className={`w-10 h-10 border rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Blog;
