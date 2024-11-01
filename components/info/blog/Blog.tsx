"use client";

import React, { useEffect, useState } from 'react';
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useBlogStore from '@/store/useBlogStore';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const BlogPostCard: React.FC<{ title: string; body: string; url_image: string; created_at: string }> = ({ title, body, url_image, created_at }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <Image
        src={url_image} 
        alt={title} 
        className="w-full h-48 object-cover" 
        width={300} height={160}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{body}</p>
        <p className="text-sm text-gray-500 mt-2">{new Date(created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const limitedImages = images.slice(0, 3);

  return (
    <div className="border-4 border-[#012C8A] rounded-[20px] overflow-hidden relative">
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
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {limitedImages.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#012C8A]' : 'bg-white border-2 border-[#012C8A] opacity-50'}`}
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
  const postsPerPage = 9;
  const [randomImages, setRandomImages] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
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
        const response = await fetch(`${BASE_URL}/v1/blogs?page=${currentPage}`);
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setBlogs(data.blogsPerPage);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    
    fetchBlogs();
  }, [currentPage, setBlogs]);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      const images = blogs.map(el => el.url_image);
      setRandomImages(images);
    }
  }, [blogs]);
  // filtra una card
  const filteredBlogs = blogs.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            className={`w-10 h-10 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`w-10 h-10 border rounded-full ${currentPage === 3 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(Math.min(currentPage + 1, 3))}
          disabled={currentPage === 3}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Blog;