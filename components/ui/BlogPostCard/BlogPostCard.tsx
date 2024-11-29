import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import slugify from 'slugify';

interface BlogPostCardProps {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  cardId: string; // Agrega el `cardId` aquí como parte de las props
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  body,
  url_image,
  created_at,
  cardId, // Recibe `cardId` como prop
}) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const slug = slugify(title, { lower: true, strict: true }); // Genera un slug del título
  console.log(slug)
  return (
    <div className="transform overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105 cursor-pointer">
        <Image src={url_image} alt={title} className="h-48 w-full object-cover" width={300} height={160} />
        <div className="p-4">
        <Link href={{
          pathname: `/info/blog/${slug}`,
          query: { title, body, url_image, created_at },
        }}
        passHref>
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        </Link>
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