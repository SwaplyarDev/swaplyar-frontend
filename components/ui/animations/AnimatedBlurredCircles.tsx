import React from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { useDarkTheme } from '../theme-Provider/themeProvider';

interface AnimatedBlurredCirclesProps {
  tope: string;
}

const AnimatedBlurredCircles: React.FC<AnimatedBlurredCirclesProps> = ({
  tope,
}) => {
  const { isDark } = useDarkTheme();
  return (
    <div className={`container-blur ${tope} -z-10`}>
      <Box className="box">
        <div className={clsx(isDark ? ' ball1Dark' : "ball1", "ball")}></div>
        <div className={clsx(isDark ? ' ball2Dark' : "ball2", "ball")}></div>
        <div className={clsx(isDark ? ' ball3Dark' : "ball3", "ball")}></div>
        <div className={clsx(isDark ? ' ball4Dark' : "ball4", "ball")}></div>
        <div className={clsx(isDark ? ' ball5Dark' : "ball5", "ball")}></div>
      </Box>
    </div>
  );
};

export default AnimatedBlurredCircles;
