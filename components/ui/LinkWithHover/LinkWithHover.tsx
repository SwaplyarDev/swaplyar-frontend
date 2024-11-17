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
      className="relative inline-flex items-center gap-2 transition-transform duration-300 ease-in-out hover:text-blue-700 dark:text-white dark:hover:text-sky-600"
    >
      {children}
    </Link>
  );
};

export default LinkWithHover;
