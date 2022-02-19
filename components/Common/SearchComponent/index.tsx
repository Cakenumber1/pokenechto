import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';
import React from 'react';

export const SearchComponent = () => (
  <div>
    <TextField id="outlined-basic" label="Search" variant="outlined" />
    <IconButton><SearchIcon fontSize="large" /></IconButton>
  </div>
);