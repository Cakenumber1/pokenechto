import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { theme } from '../../../theme';
import { AppBarComponent } from '../AppBarComponent';
import { SearchComponent } from '../SearchComponent';

export const FrameComponent = (props: { children: JSX.Element }) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <AppBarComponent />
      <Container sx={{ py: '2%' }}>
        <SearchComponent />
        {children}
      </Container>
    </ThemeProvider>
  );
};
