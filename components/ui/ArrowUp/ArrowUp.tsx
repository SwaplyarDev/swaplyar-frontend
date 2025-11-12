import React, { FC } from 'react';

type ArrowDownProps = {
  copy?: boolean;
  color?: string;
  className?: string;
};

const ArrowDown: FC<ArrowDownProps> = ({ copy = false, color, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 48 48"
      style={{ color }}
    >
      <path
        fill="none"
        stroke={copy ? '#12C971' : 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="m13 30l12-12l12 12"
      />
    </svg>
  );
};

export default ArrowDown;