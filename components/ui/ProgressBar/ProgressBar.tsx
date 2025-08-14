import { Box, LinearProgress, LinearProgressProps, Typography, styled } from '@mui/material';
import React from 'react';

const ColorfulLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'transparent',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background:
      'linear-gradient(90deg, #00D4FF 0%, #00B8E6 15%, #00A0CC 30%, #0088B3 45%, #7B68EE 60%, #9370DB 75%, #BA55D3 90%, #DA70D6 100%)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const ProgressBar = (props: LinearProgressProps & { value: number; width?: string }) => {
  return (
    <Box sx={{ width: props.width || '100%' }}>
      <ColorfulLinearProgress
        variant="determinate"
        {...props}
        sx={{
          ...props.sx,
        }}
      />
    </Box>
  );
};

export default ProgressBar;
