import React from 'react';
import { InventoryPokemonCardComponent } from '../InventoryPokemonCardComponent';
import { PokemonCollectionType } from '../../../helpers/inventoryHelpers';
import { Box } from '@mui/material';
import { useStyles } from './styles';

export type InventoryComponentProps = {
  pokemonCollection: PokemonCollectionType[];
};

export const InventoryComponent = ({
  pokemonCollection,
}: InventoryComponentProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.inventory}>
      {pokemonCollection.map(({ collectionId, pokemonId, pokemonImage }) => (
        <InventoryPokemonCardComponent
          key={collectionId}
          collectionId={collectionId}
          pokemonId={pokemonId}
          pokemonImage={pokemonImage}
        />
      ))}
    </Box>
  );
};
