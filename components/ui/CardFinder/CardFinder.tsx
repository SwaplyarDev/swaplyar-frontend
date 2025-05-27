import React, { useState } from 'react';
import useBlogStore from '@/store/useBlogStore';
import BlogPostCard from '@/components/blog/BlogPostCard/BlogPostCard';

function CardFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const { blogs, setBlogs } = useBlogStore();

  const filteredBlogs = blogs.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  {
    filteredBlogs.length > 0 ? (
      filteredBlogs.map((post) => (
        <BlogPostCard
          key={post.blog_id}
          slug={post.slug}
          description=""
          blog_id={post.blog_id}
          category={post.category}
          title={post.title}
          body={post.body}
          image={post.url_image}
          /* created_at={post.created_at} */
        />
      ))
    ) : (
      <p>No se encontraron resultados.</p>
    );
  }

  <div className="relative w-1/3">
    <input
      type="text"
      placeholder="Buscar en..."
      className="w-full rounded-2xl border border-gray-300 p-2 pl-4 pr-10 focus:outline-none focus:ring-0"
      style={{ color: 'black', backgroundColor: 'white' }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <span className="absolute right-3 top-2 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 2a9 9 0 100 18 9 9 0 000-18zM21 21l-6-6"
        />
      </svg>
    </span>
  </div>;
}

export default CardFinder;
