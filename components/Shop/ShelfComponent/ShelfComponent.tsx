import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { myTheme } from 'helpers/ThemeProvider';
import { PokemonsListResults } from 'interfaces/';
import React from 'react';

import CellComponent from '../CellComponent';
import { useStylesItem, useStylesStack } from './style';

type Props = {
  pokemons: PokemonsListResults[],
};
type ItemType = {
  _key : number,
  pokemon : PokemonsListResults
};
const ItemComp = ({ _key, pokemon } : ItemType) => {
  const classes = useStylesItem();
  return (
    <div key={_key} className={classes.item}>
      <CellComponent pokemon={pokemon!.fullInfo} />
    </div>
  );
};

const ShelfComponent: React.FC<Props> = ({ pokemons }) => {
  const classes = useStylesStack();
  return (
    <ThemeProvider theme={myTheme}>
      <Stack className={classes.stack} direction="row">
        {pokemons.map((pokemon: PokemonsListResults, i: number) => (
          <ItemComp _key={i} pokemon={pokemon} />
        ))}
      </Stack>
    </ThemeProvider>
  );
};

export default ShelfComponent;
