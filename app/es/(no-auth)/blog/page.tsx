import Blog from '@/components/blog/Blogs';
import React, { Suspense } from 'react';
import { Metadata } from 'next';

interface BlogPageProps {
  searchParams: { page?: string };
}

export const metadata: Metadata = {
  title: 'SwaplyAr | El Blog Informativo Financiero Digital para Ahorrar',
  description:
    'Informate con SwaplyAr | Noticias, tips y análisis sobre cambio de divisas. Todo lo que necesitás saber del mundo financiero digital, en un solo lugar',
  openGraph: {
    title: 'SwaplyAr | El Blog Informativo Financiero Digital para Ahorrar',
    description:
      'Noticias, tips y análisis sobre cambio de divisas. Todo lo que necesitás saber del mundo financiero digital, en un solo lugar.',
    url: 'https://www.swaplyar.com/es/blog',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1748268895/blog-swaplyar.png',
        width: 1200,
        height: 630,
        alt: 'SwaplyAr Blog Informativo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwaplyAr | El Blog Informativo Financiero Digital para Ahorrar',
    description:
      'Noticias, tips y análisis sobre cambio de divisas. Todo lo que necesitás saber del mundo financiero digital, en un solo lugar.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1748268895/blog-swaplyar.png'],
    site: '@Swaplyar',
  },
};

const BlogPage: React.FC<BlogPageProps> = ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;
  return (
    <Suspense>
      <Blog currentPage={currentPage} />
    </Suspense>
  );
};

export default BlogPage;
