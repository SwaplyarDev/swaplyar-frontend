import React from 'react';

const LayoutSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <section className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</section>;
};

export default LayoutSection;
