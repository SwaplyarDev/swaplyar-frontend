import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import React from 'react';

const ProgressBar = (props: LinearProgressProps & { value: number; width?: string }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: props.width }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ maxWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
