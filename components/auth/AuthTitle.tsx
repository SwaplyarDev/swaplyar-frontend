import React from 'react';

interface AuthTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AuthTitle: React.FC<AuthTitleProps> = ({ children, className }) => (
  <h1 className={`font-textFont text-center text-[28px] leading-normal md:text-[30px] lg:text-3.5xl font-medium text-lightText dark:text-darkText ${className}`}>
    {children}
  </h1>
);

export default AuthTitle;
