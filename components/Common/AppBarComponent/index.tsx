import {
  AppBar, Avatar, Button, ButtonGroup, Link as MuiLink, Menu, MenuItem,
  Toolbar, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { style } from './style';

export const AppBarComponent = () => {
  const matchesInscription = useMediaQuery('(min-width:500px)');
  const matchesDashboard = useMediaQuery('(min-width:375px)');
  const currentStyle = style(matchesInscription);

  const { pathname: path } = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const buttons = (
    <ButtonGroup variant="contained" color="secondary" sx={{ mr: 'auto' }}>
      <Link href="/shop" passHref>
        <Button color={path === '/shop' ? 'success' : 'secondary'}>Set</Button>
      </Link>
      <Link href="/bestiary" passHref>
        <Button color={path === '/bestiary' ? 'success' : 'secondary'}>Bestiary</Button>
      </Link>
      <Link href="/inventory" passHref>
        <Button color={path === '/inventory' ? 'success' : 'secondary'}>Inventory</Button>
      </Link>
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
        sx={{ mr: 'auto' }}
      >
        {path.substring(1)}
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
        <Link href="/shop" passHref>
          <MenuItem onClick={handleClose}>Set</MenuItem>
        </Link>
        <Link href="/bestiary" passHref>
          <MenuItem onClick={handleClose}>Bestiary</MenuItem>
        </Link>
        <Link href="/inventory" passHref>
          <MenuItem onClick={handleClose}>Inventory</MenuItem>
        </Link>
      </Menu>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {matchesDashboard ? buttons : mobileButtons}
        <MuiLink href="https://pokeapi.co/" target="_blank" rel="noopener">
          <Avatar
            sx={currentStyle.logo}
            alt="logo"
            src="https://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-PNG-Image-File.png"
          />
        </MuiLink>
        <Typography variant="h6" sx={currentStyle.inscription} component="div">
          PokeNechto
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
