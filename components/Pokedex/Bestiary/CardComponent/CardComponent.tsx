import {
  Box, Card, CardContent, CardHeader, CardMedia,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataType } from 'interfaces';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useGetPokemonByNameQuery } from 'store/api';

import PokeModal from '../ModalComponent';
import { style } from './style';
// todo: firebase
const unlocked = new Set([1, 2, 3, 4, 5, 6]);

const CardComponent = ({ pokemon }: { pokemon: PokemonsListResults }) => {
  const {
    data, error, isUninitialized,
  } = useGetPokemonByNameQuery(pokemon.name);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<DataType>({
    left: 0, top: 0, height: 0, width: 0, background: 'none',
  });

  const handleOpen = useCallback((e : SyntheticEvent) => {
    const elem = e.target as HTMLElement;
    const d = elem.getBoundingClientRect();
    setPos({
      left: d.left,
      top: d.top,
      height: d.height,
      width: d.width,
      background: elem.style.background,
    });
    setOpen(true);
  }, []);
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
  const matchesName = unlocked.has(data!.id as number);
  return (
    <Card sx={style.card}>
      <CardHeader
        titleTypographyProps={style.pokeName(matchesSize)}
        title={data.name}
      />
      <CardMedia
        onClick={handleOpen}
        sx={style.pokeImg(matchesName)}
        component="img"
        image={data.img}
        alt={data.name}
      />
      {matchesName ? <PokeModal open={open} onClose={handleClose} pokemon={data} data={pos} />
        : <Box sx={{ display: 'none' }} />}
    </Card>
  );
};

export default CardComponent;
