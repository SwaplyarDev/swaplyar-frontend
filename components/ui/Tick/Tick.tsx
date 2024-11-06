import React, { FC } from 'react';
import { useDarkTheme } from '../theme-Provider/themeProvider';

type TickProps = {
  copy?: boolean;
  color: string;
  size?: string;
}

const Tick: FC<TickProps> = ({
  copy = false,
  color,
  size = "22px",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
    >
      <path
        fill="none"
        stroke={copy ? "#12C971" : color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m2.75 8.75l3.5 3.5l7-7.5"
      />
    </svg>
  );
};

export default Tick;
