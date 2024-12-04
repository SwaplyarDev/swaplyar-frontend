import React, { Suspense } from 'react';
import Blog from '@/components/info/blog/Blogs';

const BlogPage: React.FC = () => {
  return (
    <Suspense>
      <Blog />
    </Suspense>
  );
};

export default BlogPage;
