import {
  AppBar, Avatar, Button, ButtonGroup, Link, Toolbar, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import { style } from './style';

export const AppBarComponent = () => {
  const matchesInscription = useMediaQuery('(min-width:470px)');
  const matchesLogo = useMediaQuery('(min-width:354px)');
  const currentStyle = style(matchesLogo, matchesInscription);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <ButtonGroup variant="contained" color="secondary">
          <Button>Set</Button>
          <Button>Bestiary</Button>
          <Button>Inventory</Button>
        </ButtonGroup>
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
