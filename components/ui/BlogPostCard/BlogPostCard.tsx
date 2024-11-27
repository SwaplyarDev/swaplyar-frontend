import Image from 'next/image';
import { useState } from 'react';

const BlogPostCard: React.FC<{ title: string; body: string; url_image: string; created_at: string }> = ({
  title,
  body,
  url_image,
  created_at,
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="transform overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105">
      <Image src={url_image} alt={title} className="h-48 w-full object-cover" width={300} height={160} />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-700">
          {showFullText ? body : `${body.slice(0, -135)}`}
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
