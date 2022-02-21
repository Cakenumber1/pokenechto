import {
    Card, CardActionArea, CardContent, CardHeader, CardMedia,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React, { useCallback, useState } from 'react';
import { useGetPokemonByNameQuery } from 'store/api';

import { PokeModal } from '../PokeModalComponent';
import { style } from './style';

export const CardComponent = ({ pokemon }: { pokemon: PokemonsListResults }) => {
  const {
    data, error, isUninitialized,
  } = useGetPokemonByNameQuery(pokemon.name);

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const matchesSize = useMediaQuery('(min-width:400px)');

  if (!data) {
    return (
      <Card sx={style.card}>
        <CardHeader
          titleTypographyProps={style.pokeName(matchesSize)}
          title={error ? 'error' : isUninitialized ? 'uninitialized' : 'Loading...'}
        />
        <CardContent />
      </Card>
    );
  }
  return (
    <>
      <Card sx={style.card} onClick={handleOpen}>
          <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardHeader
          titleTypographyProps={style.pokeName(matchesSize)}
          title={data.name}
        />

        <CardMedia
          sx={style.pokeImg}
          component="img"
          image={data.img}
          alt={data.name}
        /></CardActionArea>
      </Card>
      <PokeModal fullInfo={data} isOpen={open} onClose={handleClose} />
    </>
  );
};
