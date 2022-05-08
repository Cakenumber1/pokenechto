import {
  Box,
  Typography,
} from '@mui/material';
import { countStats } from 'helpers/adaptors/countPower';
import { PokemonIni } from 'interfaces/';
import React from 'react';

import { useStylesSwiper } from './style';

type Props = {
  poke: PokemonIni | null
};

const ProfileMainPokeComponent: React.FC<Props> = ({ poke }) => {
  const classes = useStylesSwiper();
  let lvl: number;
  let power: number;
  if (poke) {
    lvl = countStats(poke).lvl;
    power = countStats(poke).power;
  }
  if (!poke) {
    return (
      <Box>
        <Typography>Choose main poke in Inventory</Typography>
      </Box>
    );
  }
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
          <Typography>{lvl!}</Typography>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography>Power:</Typography>
          <Typography>&nbsp;</Typography>
          <Typography>{power!}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileMainPokeComponent;
