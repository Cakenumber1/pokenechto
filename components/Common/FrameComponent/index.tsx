import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { style } from './style'
import { Box } from '@mui/material'

import { theme } from '../../../theme';
import { AppBarComponent } from '../AppBarComponent';
import { SearchComponent } from '../SearchComponent';

export const FrameComponent = (props: { children: JSX.Element }) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={ style.page }>
        <AppBarComponent />
        <Container sx={ style.content }>
          <SearchComponent />
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};
