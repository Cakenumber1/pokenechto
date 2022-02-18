import React from 'react';
import { InventoryPokemonCardComponent } from 'components/Inventory/InventoryPokemonCardComponent';
import { PokemonCollectionItemProp } from 'helpers/inventoryHelpers';
import { Box } from '@mui/material';
import { useStyles } from './styles';

export type InventoryComponentProps = {
  pokemonCollection: PokemonCollectionItemProp[];
  onClickCard: any;
  //(
  //   event: React.MouseEvent<HTMLElement>,
  //   pokemonId: number,
  // ) => void;
};

export const InventoryComponent = ({
  pokemonCollection,
  onClickCard: handleClickCard,
}: InventoryComponentProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.inventory}>
      {pokemonCollection.map((collectionItem) => (
        <InventoryPokemonCardComponent
          key={collectionItem.collectionId}
          collectionItem={collectionItem}
          onClick={handleClickCard}
        />
      ))}
    </Box>
  );
};
