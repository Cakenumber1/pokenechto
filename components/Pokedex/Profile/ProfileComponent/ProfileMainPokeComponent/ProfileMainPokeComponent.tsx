import {
  Box,
  Typography,
} from '@mui/material';
import { PokemonIni } from 'interfaces/';
import React from 'react';

import { useStylesSwiper } from './style';

type Props = {
  poke: PokemonIni
};

const ProfileMainPokeComponent: React.FC<Props> = ({ poke }) => {
  const classes = useStylesSwiper();
  return (
    <Box className={classes.main}>
      <Box className={classes.mainInner}>
        <Typography>{poke.name.toUpperCase()}</Typography>
        <img
          src={poke.img}
          width="95%"
          height="50%"
          style={{ aspectRatio: '1/1' }}
          alt={poke.name}
        />
        <Box style={{ display: 'flex' }}>
          <Typography>Level:</Typography>
          <Typography>&nbsp;</Typography>
          <Typography>Idk</Typography>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography>Power:</Typography>
          <Typography>&nbsp;</Typography>
          <Typography>Idk</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileMainPokeComponent;
