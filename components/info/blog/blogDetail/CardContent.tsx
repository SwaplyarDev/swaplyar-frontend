// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps } from '@/types/blogs/blog';

interface CardContentProps {
  blogData: BlogPostCardProps;
}

const CardContent: React.FC<CardContentProps> = ({ blogData }) => {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <div className="w-[270px] rounded-3xl border border-black bg-gray-200 p-4">
          <p>
            <p className="text-gray-500">Información adicional</p>
            <li>Lorem ipsum dolor</li>
            <li>Consectetur adipiscing</li>
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <h1 className="mb-1 mt-0 text-2xl font-bold">{blogData.title}</h1>
          <p className="mb-0 text-gray-700">{blogData.body}</p>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <Image
            className="my-4 h-auto w-full rounded-lg"
            src={blogData.url_image}
            alt={blogData.title}
            width={200}
            height={200}
          />
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">Publicado el: {new Date(blogData.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default CardContent;
