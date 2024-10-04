import React from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

interface AnimatedBlurredCirclesProps {
  topOffset: number;
  tope: string;
}

const AnimatedBlurredCircles: React.FC<AnimatedBlurredCirclesProps> = ({
  topOffset,
  tope,
}) => {
  return (
    <div className={`container-blur ${tope}`}>
      <Box className="box">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
      </Box>
    </div>
  );
};

export default AnimatedBlurredCircles;
