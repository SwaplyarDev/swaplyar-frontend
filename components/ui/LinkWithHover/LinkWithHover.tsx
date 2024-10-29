// components/ui/LinkWithHover.tsx
'use client';

import React, { FC, MouseEvent } from 'react';

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
    <a
      href={href}
      target="_blank"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="relative m-1 inline-flex h-[48px] items-center gap-2 transition-transform duration-300 ease-in-out hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600"
    >
      {children}
    </a>
  );
};

export default LinkWithHover;
