'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import slugify from 'slugify';

interface BlogPostProps {
  blog_id: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ blog_id, title, body, url_image, created_at }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  // Genera un slug del título para la URL
  const slug = slugify(title, { lower: true, strict: true });

  return (
    <Link href={`/info/blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(blog_id)}`}>
      <div className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105">
        {/* Imagen del post */}
        <Image src={url_image} className="h-48 w-full object-cover" alt={title} width={300} height={160} />
        <div className="p-4">
          {/* Título del post */}
          <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>

          {/* Contenido del post */}
          <p className="mb-4 text-gray-700">
            {showFullText ? body : `${body.slice(0, 135)}...`}
            <button
              onClick={(e) => {
                e.preventDefault(); // Evita redirección al hacer clic en "Leer más"
                handleToggleText();
              }}
              className="inline font-semibold text-blue-500 hover:underline"
            >
              {showFullText ? ' Leer menos' : ' Leer más'}
            </button>
          </p>

          {/* Fecha de publicación */}
          <p className="mt-2 text-sm text-gray-500">{new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
