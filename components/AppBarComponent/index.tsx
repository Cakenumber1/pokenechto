import {
  AppBar, Box, Button, ButtonGroup, Menu, MenuItem,
  Toolbar, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import offButton from 'public/toff.png';
import React, { useCallback, useState } from 'react';

import { style } from './style';

export const AppBarComponent = () => {
  const matchesInscription = useMediaQuery('(min-width:500px)');
  const matchesDashboard = useMediaQuery('(min-width:360px)');
  const currentStyle = style(matchesInscription);

  const { pathname: path } = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const buttons = (
    <ButtonGroup variant="contained" color="secondary" sx={{ mr: 'auto' }}>
      <Link href="/pokedex" passHref>
        <Button color={path === '/pokedex' ? 'success' : 'secondary'}>Home</Button>
      </Link>
      <Link href="/pokedex/bestiary" passHref>
        <Button color={path === '/pokedex/bestiary' ? 'success' : 'secondary'}>Bestiary</Button>
      </Link>
      <Link href="/pokedex/inventory" passHref>
        <Button color={path === '/pokedex/inventory' ? 'success' : 'secondary'}>Inventory</Button>
      </Link>
    </ButtonGroup>
  );

  const mobileButtons = (
    <>
      <Button
        variant="contained"
        color="success"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {path === '/pokedex' ? 'Home' : path.substring(9)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ p: 0 }}
      >
        <Link href="/pokedex" passHref>
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link href="/pokedex/bestiary" passHref>
          <MenuItem onClick={handleClose}>Bestiary</MenuItem>
        </Link>
        <Link href="/pokedex/inventory" passHref>
          <MenuItem onClick={handleClose}>Inventory</MenuItem>
        </Link>
      </Menu>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ p: 0 }}>
        {matchesDashboard ? buttons : mobileButtons}
        <Box sx={currentStyle.exit}>
          <Link href="/">
            <Image
              width={40}
              height={40}
              alt="logo"
              src={offButton}
            />
          </Link>
        </Box>
        <Typography variant="h6" sx={currentStyle.inscription} component="div">
          PokeNechto
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
