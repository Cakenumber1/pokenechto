import { Card, CardContent, CardMedia } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PokeModal } from 'components/Common/PokeModalComponent';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React, { useCallback, useState } from 'react';

import { style } from './style';

type CardData = {
  pokemon: PokemonsListResults
};

export const CardComponent = ({ pokemon } : CardData) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const matchesSize = useMediaQuery('(min-width:470px)');

  const { fullInfo } = pokemon;
  return (
    <>
      <Card sx={style.card} onClick={handleOpen}>
        <CardContent sx={style.pokeName(matchesSize)}>{fullInfo!.name}</CardContent>
        <CardMedia
          sx={style.pokeImg}
          component="img"
          image={fullInfo!.img}
          alt={fullInfo!.name}
        />
      </Card>
      <PokeModal fullInfo={fullInfo} isOpen={open} onClose={handleClose} />
    </>
  );
};
