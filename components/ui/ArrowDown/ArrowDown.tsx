import React from 'react';
import { useDarkTheme } from '../theme-Provider/themeProvider';

const ArrowDown = () => {
  const { isDark } = useDarkTheme();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 48 48">
      <path
        fill="none"
        stroke={isDark ? '#ebe7e0' : '#252526'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M36 18L24 30L12 18"
      />
    </svg>
  );
};

export default ArrowDown;
