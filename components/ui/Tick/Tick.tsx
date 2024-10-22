import React from 'react';
import { useDarkTheme } from '../theme-Provider/themeProvider';

const Tick = () => {
  const { isDark } = useDarkTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22px"
      height="22px"
      viewBox="0 0 16 16"
    >
      <path
        fill="none"
        stroke={isDark ? "#414244" : "#FCFBFA"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m2.75 8.75l3.5 3.5l7-7.5"
      />
    </svg>
  );
};

export default Tick;