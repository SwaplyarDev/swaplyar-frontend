'use client';

import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface BlogPostProps {
  blog_id: string;
  sub_title: string;
  title: string;
  body: string;
  url_image: string;
  ver: string;
  created_at: string;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ blog_id, sub_title, title, body, url_image, ver, created_at }) => {
  const slug = slugify(title, { lower: true, strict: true });

  return (
    <Link href={`/info/blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(blog_id)}`}>
      <div className="flex h-full min-h-[350px] transform cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105">
        <Image src={url_image} className="h-48 w-full object-cover" alt={title} width={300} height={160} />

        <div className="flex flex-grow flex-col p-4">
          <p className="mb-2 text-sm font-semibold text-blue-500">{sub_title}</p>
          <h3 className="mb-2 text-lg font-semibold text-blue-500">{title}</h3>
          <p className="mb-4 line-clamp-3 min-h-[72px] text-gray-700">{body}</p>

          <div className="mt-auto flex items-center justify-between text-sm text-blue-500">
            <div className="flex items-center">
              <p>{ver}</p>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">{new Date(created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
