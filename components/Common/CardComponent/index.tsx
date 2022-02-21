import {
  Card, CardActionArea, CardContent, CardHeader, CardMedia,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataType } from 'interfaces';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useGetPokemonByNameQuery } from 'store/api';

import PokeModal from '../../Bestiary/ModalComponent';
import { style } from './style';

export const CardComponent = ({ pokemon }: { pokemon: PokemonsListResults }) => {
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
          />
        </CardActionArea>
      </Card>
      <PokeModal open={open} onClose={handleClose} pokemon={data} data={pos} />
    </>
  );
};
