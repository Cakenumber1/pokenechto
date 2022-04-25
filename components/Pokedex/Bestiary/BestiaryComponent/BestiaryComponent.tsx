import { Grid } from '@mui/material';
import CardComponent from 'components/Pokedex/Bestiary/CardComponent';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';

const BestiaryComponent = (props: any) => {
  const { pokemons } = props;
  const data = pokemons.results.map((pokemon: PokemonsListResults) => (
    <Grid key={pokemon.name} item xs={3}>
      <CardComponent pokemon={pokemon} />
    </Grid>
  ));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{data}</>;
};

export default BestiaryComponent;
