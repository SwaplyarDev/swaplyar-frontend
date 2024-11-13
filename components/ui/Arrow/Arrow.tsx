import React from 'react';

const Arrow = ({ color }: { color: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256">
      <path
        fill={color}
        d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
      />
    </svg>
  );
};

export default Arrow;
