import React from 'react';
import { Box } from '@mui/material';

interface AnimatedBlurredCirclesProps {
  topOffset: number;
}

const AnimatedBlurredCircles: React.FC<AnimatedBlurredCirclesProps> = ({ topOffset }) => {
  return (
    <div 
      className="container-blur"
      style={{ top: `${topOffset}px`, zIndex: -1 }} /* Asegúrate de que el zIndex esté por detrás */
    >
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
