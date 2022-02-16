import { Grid } from '@mui/material';
import { CardComponent } from 'components/Common/CardComponent';
import { PokemonsList, PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';

type BestiaryData = {
  pokemons: PokemonsList
};

export const BestiaryComponent = ({ pokemons }: BestiaryData) => {
  const data = pokemons.results.map((pokemon: PokemonsListResults, i: number) => (
    <Grid key={i} item xs={3}>
      <CardComponent pokemon={pokemon} />
    </Grid>
  ));

  return <>{data}</>;
};
