import React from 'react';
import CellComponent from '../CellComponent';
import { Stack } from '@mui/material'
import { useStyles } from './style';

import { PokemonsListResults } from 'interfaces/pokemonListType';
import { useCountCellSize } from 'helpers/adaptors/useCountCellSize';

type Props = {
  pokemons: PokemonsListResults[],
}

const ShelfComponent: React.FC<Props> = ({pokemons}) => {
  const classes = useStyles();

  let temp = useCountCellSize()


  return (
    <Stack className={classes.stack} direction="row">
      {pokemons.map((pokemon: PokemonsListResults, i: number) =>
        (
          <div key={i} style={{width: `${temp}px`, height: `${temp}px`, position: 'relative'}}>
            <CellComponent pokemon={pokemon.fullInfo}/>
          </div>
        )
      )}
    </Stack>
  )
}

export default ShelfComponent;
