import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme } from 'theme/index';

import { AppBarComponent } from '../AppBarComponent';
import { style } from './style';

const FrameComponent = (props: { children: JSX.Element }) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={style.page}>
        <AppBarComponent />
        <Box sx={style.content}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FrameComponent;
