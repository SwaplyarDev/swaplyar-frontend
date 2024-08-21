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
      style={{ color: '#012a8d', textDecoration: 'none' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </a>
  );
};

export default LinkWithHover;
