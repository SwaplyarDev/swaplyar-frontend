import Blog from '@/components/blog/Blogs';
import React, { Suspense } from 'react';

const BlogPage: React.FC = () => {
  return (
    <Suspense>
      <Blog />
    </Suspense>
  );
};

export default BlogPage;
