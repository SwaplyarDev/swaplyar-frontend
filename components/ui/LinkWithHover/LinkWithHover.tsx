// components/ui/LinkWithHover.tsx
'use client';

import React, { FC, MouseEvent } from 'react';
import Link from 'next/link';

interface LinkWithHoverProps {
  href: string;
  children: React.ReactNode;
}
const LinkWithHover: FC<LinkWithHoverProps> = ({ href, children }) => {
  const handleMouseOver = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.textDecoration = 'underline';
  };

  const handleMouseOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.textDecoration = 'none';
  };

  return (
    <Link
      href={href}
      target="_blank"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="relative items-center gap-2 text-custom-grayD transition-transform duration-300 ease-in-out hover:text-blue-700 dark:text-darkText dark:hover:text-sky-600"
    >
      {children}
    </Link>
  );
};

export default LinkWithHover;
