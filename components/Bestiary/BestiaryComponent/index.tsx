import { Grid } from '@mui/material';
import { PokemonsList, PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';

import { CardComponent } from '../../Common/CardComponent';

type BestiaryData = {
  pokemons: PokemonsList
};

export const BestiaryComponent = (props: BestiaryData) => {
  const { pokemons } = props;
  const data = pokemons.results.map((pokemon: PokemonsListResults) => (
    <Grid key={pokemon.name} item xs={3}>
      <CardComponent pokemon={pokemon} />
    </Grid>
  ));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{data}</>;
};
