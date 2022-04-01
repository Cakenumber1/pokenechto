import { Box } from '@mui/material';
import { InventoryPokemonCardComponent } from 'components/Inventory/InventoryPokemonCardComponent';
import { CollectionItemType } from 'helpers/inventory/inventoryHelpers';
import React from 'react';

import { style } from './style';

export type InventoryComponentProps = {
  pokemonCollection: CollectionItemType[];
  onClickCard: (
    event: React.MouseEvent<HTMLDivElement>,
    collectionItem: CollectionItemType
  ) => void;
};

export const InventoryComponent = ({
  pokemonCollection,
  onClickCard: handleClickCard,
}: InventoryComponentProps) => (
  <Box sx={style.inventory}>
    {pokemonCollection.map((collectionItem) => (
      <InventoryPokemonCardComponent
        key={collectionItem.collectionId}
        collectionItem={collectionItem}
        onClick={handleClickCard}
      />
    ))}
  </Box>
);
