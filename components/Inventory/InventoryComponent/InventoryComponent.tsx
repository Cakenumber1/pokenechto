import { Box } from '@mui/material';
import { InventoryPokemonCardComponent } from 'components/Inventory/InventoryPokemonCardComponent';
import { CollectionItemType } from 'helpers/inventoryHelpers';
import React from 'react';

import { useStyles } from './styles';

export type InventoryComponentProps = {
  pokemonCollection: Partial<CollectionItemType>[];
  onClickCard: (
    event: React.MouseEvent<HTMLDivElement>,
    collectionItem: Partial<CollectionItemType>
  ) => void;
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
