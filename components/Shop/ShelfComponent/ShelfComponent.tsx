import { Stack } from '@mui/material';
import { useCountCellSize } from 'helpers/adaptors/useCountCellSize';
import { theme } from 'helpers/ThemeProvider';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';

import CellComponent from '../CellComponent';
import { useStyles } from './style';

type Props = {
  pokemons: PokemonsListResults[],
};

const ShelfComponent: React.FC<Props> = ({ pokemons }) => {
  const classes = useStyles(theme);
  const temp = useCountCellSize();
  return (
    <Stack className={classes.stack} direction="row">
      {pokemons.map((pokemon: PokemonsListResults, i: number) => (
        // className={classes.item}
        <div key={i} style={{ width: `${temp}px`, height: `${temp}px`, position: 'relative' }}>
          <CellComponent pokemon={pokemon.fullInfo} />
        </div>
      ))}
    </Stack>
  );
};

export default ShelfComponent;
