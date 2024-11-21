import React, { Suspense } from 'react';
import Blog from '@/components/info/blog/Blog';

const BlogPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blog />
    </Suspense>
  );
};

export default BlogPage;
