"use client";

import React, { useEffect, useState } from 'react';
import useBlogStore from '@/store/useBlogStore'; // Importar el store desde la carpeta store
import ImageCarousel from '@/components/ui/ImageCarousel/imageCarousel';
import BlogPostCard from '@/components/ui/BlogPostCard/BlogPostCard';
import SearchBar from '@/components/ui/SearchBar/SearchBar';

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
}

// Componente para la tarjeta de cada publicación del blog

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

      <SearchBar />

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
  {currentPosts.map((post) => (
    <BlogPostCard
      key={post.id}
      title={post.title}
      content={post.content}
      imageUrl={post.imageUrl}
      publishedAt={post.publishedAt}
    />
  ))}
</div>
    </div>
  );
};

export default Blog;