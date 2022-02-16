import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBarComponent } from 'components/Common/AppBarComponent';
import { BestiaryContainer } from 'containers/BestiaryContainer';
import React from 'react';

import { theme } from '../theme';

export default function bestiary() {
  return (
    <ThemeProvider theme={theme}>
      <AppBarComponent />
      <Container sx={{ py: '2%' }}>
        <div>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
          <IconButton><SearchIcon fontSize="large" /></IconButton>
        </div>
        <BestiaryContainer />
      </Container>
    </ThemeProvider>
  );
}
