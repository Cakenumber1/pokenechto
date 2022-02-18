import {
  AppBar, Avatar, Button, ButtonGroup, Link, Menu, MenuItem,
  Toolbar, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useState } from 'react';

import { style } from './style';

export const AppBarComponent = () => {
  const matchesInscription = useMediaQuery('(min-width:470px)');
  const matchesLogo = useMediaQuery('(min-width:354px)');
  const currentStyle = style(matchesLogo, matchesInscription);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const buttons = (
    <ButtonGroup variant="contained" color="secondary">
      <Button>Set</Button>
      <Button>Bestiary</Button>
      <Button>Inventory</Button>
    </ButtonGroup>
  );

  const mobileButtons = (
    <>
      <Button
        variant="contained"
        color="secondary"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Set</MenuItem>
        <MenuItem onClick={handleClose}>Bestiary</MenuItem>
        <MenuItem onClick={handleClose}>Inventory</MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {matchesLogo ? buttons : mobileButtons}
        <Link href="https://pokeapi.co/" target="_blank" rel="noopener" sx={{ ml: 'auto' }}>
          <Avatar
            sx={currentStyle.logo}
            alt="logo"
            src="https://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-PNG-Image-File.png"
          />
        </Link>
        <Typography variant="h6" sx={currentStyle.inscription} component="div">
          PokeNechto
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
