"use client";

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

const BlogPostCard: React.FC<BlogPost> = ({ title, description, image, date, link }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <a href={link} className="text-blue-500 hover:underline">
          Más información
        </a>
        <p className="text-sm text-gray-500 mt-2">{date}</p>
      </div>
    </div>
  );
};

// Blog component with carousel and cards
const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts (replace with your actual data fetching logic)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://your-api.com/blog-posts'); // Adjust URL
      const data = await response.json();
      setBlogPosts(data);

      // Select featured posts (logic can be customized)
      setFeaturedPosts(data.slice(0, 3)); // Assuming top 3 posts are featured
    };

    fetchPosts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>

      {/* Featured post carousel */}
      {featuredPosts.length > 0 && (
        <Slider {...settings}>
          {featuredPosts.map(post => (
            <BlogPostCard key={post.id} {...post} />
          ))}
        </Slider>
      )}

      {/* Grid of all blog posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {blogPosts.map(post => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>

      {/* Pagination (replace with your desired pagination implementation) */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* ... (Your pagination buttons or component) */}
      </div>
    </div>
  );
};

export default Blog;