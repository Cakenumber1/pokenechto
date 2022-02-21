import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

export const SearchComponent = () => (
  <Box sx={{ pt: 1, px: 2 }}>
    <TextField id="outlined-basic" label="Search" variant="outlined" />
    <IconButton><SearchIcon fontSize="large" /></IconButton>
  </Box>
);
