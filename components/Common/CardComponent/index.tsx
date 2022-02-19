import { Card, CardHeader, CardMedia } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, {useCallback, useEffect, useState} from 'react';
import {useGetPokemonByNameQuery, useGetPokemonListQuery} from 'store/api'


import { PokemonsListResults } from 'interfaces/pokemonListType';
import { PokeModal } from '../PokeModalComponent';
import { style } from './style';

type CardData = {
  pokemon: PokemonsListResults
};

export const CardComponent = (props: CardData) => {

  const { data, error, isLoading, isUninitialized } = useGetPokemonByNameQuery(props.pokemon.name)


  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const matchesSize = useMediaQuery('(min-width:400px)');
  if (error || isLoading || isUninitialized) return <h1>ABOBA</h1>
  return (
    <>
      {error ? (
          <>Oh no, there was an error</>
      ) : isUninitialized ? (
          <div>
            - Currently skipped -
          </div>
      ) : isLoading ? (
          <>loading...</>
      ) : data ? ( <>
      <Card sx={style.card} onClick={handleOpen}>
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
      </Card>
      <PokeModal fullInfo={data} isOpen={open} onClose={handleClose} />
      </>) : null}
    </>
  );
};
