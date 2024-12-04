import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import { BlogPost } from '@/types/blogs/blog';

const BlogPostCard: React.FC<BlogPost> = ({ title, body, url_image, created_at }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const slug = slugify(title, { lower: true, strict: true }); // Genera un slug del título
  console.log(slug);
  return (
    <div className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105">
      <Image src={url_image} className="h-48 w-full object-cover" alt={title} width={300} height={160} />
      <Link
        href={{
          pathname: `/info/blog/${slug}`,
          query: { title, body, url_image, created_at },
        }}
        passHref
      ></Link>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
        <p className="mb-4 text-gray-700">
          {showFullText ? body : `${body.slice(0, 135)}...`} {/* Ajusta el slice para mostrar un resumen del texto */}
          <button onClick={handleToggleText} className="inline font-semibold text-blue-500 hover:underline">
            {showFullText ? 'Leer menos' : '....Leer más'}
          </button>
        </p>
        <p className="mt-2 text-sm text-gray-500">{new Date(created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPostCard;
