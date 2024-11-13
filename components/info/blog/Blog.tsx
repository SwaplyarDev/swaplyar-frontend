'use client';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useBlogStore from '@/store/useBlogStore';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const BlogPostCard: React.FC<{ title: string; body: string; url_image: string; created_at: string }> = ({ title, body, url_image, created_at }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <Image src={url_image} alt={title} className="w-full h-48 object-cover" width={300} height={160} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">
          {showFullText ? body : `${body.slice(0, -135)}`}
          <button onClick={handleToggleText} className="text-blue-500 font-semibold hover:underline inline">
            {showFullText ? 'Leer menos' : '....Leer más'}
          </button>
        </p>
        <p className="text-sm text-gray-500 mt-2">{new Date(created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 500, // velocidad de transición
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // Oculta los botones de flechas predeterminados
    ref: sliderRef, // Para controlar el slider manualmente
  };

  const limitedImages = images.slice(0, 6);

  // Funciones para navegar y reiniciar autoplay
  const goToPreviousSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="relative group border-4 border-[#012C8A] rounded-[20px] overflow-hidden">
      <Slider {...settings}>
        {limitedImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-60 object-cover"
              width={800}
              height={400}
            />
          </div>
        ))}
      </Slider>

      {/* Botón de navegación izquierda */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToPreviousSlide}
      >
        &lt;
      </button>

      {/* Botón de navegación derecha */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToNextSlide}
      >
        &gt;
      </button>

      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {limitedImages.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-[#012C8A]" : "bg-white border-2 border-[#012C8A] opacity-50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

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
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
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
      const images = blogs.map(el => el.url_image);
      setRandomImages(images);
    }
  }, [blogs]);

  const filteredBlogs = blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-left">Blog</h1>

      <ImageCarousel images={randomImages} />
      <div className="flex justify-end mt-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar en..."
            className="w-full pl-4 pr-10 p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-0"
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
          className={`w-10 h-10 border rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
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