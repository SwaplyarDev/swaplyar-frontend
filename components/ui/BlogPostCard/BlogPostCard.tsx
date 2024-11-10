import Image from 'next/image';
import React, { useState } from 'react';

const BlogPostCard: React.FC<{ title: string; body: string; url_image: string; created_at: string }> = ({ title, body, url_image, created_at }) => {
  
  const [showFullText, setShowFullText] = useState(false); //Maneja estado para el boton Leer mas o Leer menos. 

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
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
        <p className="text-gray-700 mb-4">
        {showFullText ? body : `${body.slice(0, -135)}`}
          <button
            onClick={handleToggleText}
            className="text-blue-500 font-semibold hover:underline inline"
          >
            {showFullText ? 'Leer menos' : '....Leer más'}
          </button>
        </p>
        <p className="text-sm text-gray-500 mt-2">{new Date(created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPostCard;