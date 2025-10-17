import React from 'react';

interface AuthTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AuthTitle: React.FC<AuthTitleProps> = ({ children, className }) => (
  <h1 className={`font-textFont mb-7 text-center text-3.5xl font-medium text-lightText dark:text-darkText ${className}`}>
    {children}
  </h1>
);

export default AuthTitle;
