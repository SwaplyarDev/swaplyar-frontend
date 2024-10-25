"use client";

import React, { useEffect, useState } from 'react';
// Solución temporal react-slick;
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useBlogStore from '@/store/useBlogStore'; // Importar el store desde la carpeta store

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
}

// Componente para la tarjeta de cada publicación del blog
const BlogPostCard: React.FC<{ title: string; content: string; imageUrl: string; publishedAt: string }> = ({ title, content, imageUrl, publishedAt }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{content}</p>
        <p className="text-sm text-gray-500 mt-2">{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

// Componente para el carrusel de imágenes aleatorias
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots slick-thumb',
  };

  return (
    <div className="border-4 border-[#012C8A] rounded-[20px] overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-60 object-cover" />
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .slick-dots {
          bottom: 10px;
        }
        .slick-dots li {
          width: 20px;
          height: 20px;
        }
        .slick-dots li button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #012C8A;
        }
        .slick-dots li.slick-active button {
          background: #012C8A;
        }
      `}</style>
    </div>
  );
};

// Componente principal del Blog
const Blog: React.FC = () => {
  const { blogs, fetchBlogs } = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Imágenes aleatorias para el carrusel
  const randomImages = [
    "https://via.placeholder.com/800x300?text=Imagen+1",
    "https://via.placeholder.com/800x300?text=Imagen+2",
    "https://via.placeholder.com/800x300?text=Imagen+3",
    "https://via.placeholder.com/800x300?text=Imagen+4",
  ];

  // Fetch blog posts
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Lógica de paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {currentPosts.map(post => (
          <BlogPostCard 
            key={post.id}  
            title={post.title} 
            content={post.content} 
            imageUrl={post.imageUrl} 
            publishedAt={post.publishedAt} 
          />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`flex items-center justify-center w-10 h-10 border rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`flex items-center justify-center w-10 h-10 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`flex items-center justify-center w-10 h-10 border rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      
    </div>
  );
};

export default Blog;