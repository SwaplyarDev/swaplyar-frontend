import Blog from '@/components/blog/Blogs';
import React, { Suspense } from 'react';

interface BlogPageProps {
  searchParams: { page?: string };
}

const BlogPage: React.FC<BlogPageProps> = ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;
  return (
    <Suspense>
      <Blog currentPage={currentPage} />
    </Suspense>
  );
};

export default BlogPage;
