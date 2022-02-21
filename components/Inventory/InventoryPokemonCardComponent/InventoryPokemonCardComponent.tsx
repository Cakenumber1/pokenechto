import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { CollectionItemType, HandleClickCard } from 'helpers/inventoryHelpers';
import React from 'react';

import { style } from './style';

export type InventoryPokemonCardComponentProps = {
  collectionItem: Partial<CollectionItemType>;
  onClick: HandleClickCard
};

export const InventoryPokemonCardComponent = ({
  collectionItem,
  onClick: handleClick,
}: InventoryPokemonCardComponentProps) => {
  const { sprite, name } = collectionItem;

  return (
    <Card
      sx={style.inventoryPokemonCard}
      onClick={(event) => handleClick(event, collectionItem)}
    >
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          sx={style.inventoryPokemonCardImage}
          src={sprite}
          alt={name}
          title={name}
        />
      </CardActionArea>
    </Card>
  );
};
