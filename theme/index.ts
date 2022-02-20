import { createTheme } from '@mui/material/styles';

export const theme = createTheme({

  palette: {
    primary: {
      main: '#4fc3f7',
    },
    secondary: {
      main: '#ffa733',
    },
    success: {
      main: '#f44336',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 568,
      lg: 1024,
      xl: 1280,
    },
  },
});
