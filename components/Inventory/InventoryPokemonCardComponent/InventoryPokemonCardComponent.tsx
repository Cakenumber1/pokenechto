import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { CollectionItemType, HandleClickCard } from 'helpers/inventoryHelpers';
import React from 'react';

import { useStyles } from './styles';

export type InventoryPokemonCardComponentProps = {
  collectionItem: Partial<CollectionItemType>;
  onClick: HandleClickCard
};

export const InventoryPokemonCardComponent = ({
  collectionItem,
  onClick: handleClick,
}: InventoryPokemonCardComponentProps) => {
  const classes = useStyles();
  const { sprite, name } = collectionItem;

  return (
    <Card
      className={classes.inventoryPokemonCard}
      onClick={(event) => handleClick(event, collectionItem)}
    >
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          className={classes.inventoryPokemonCard__Image}
          component="img"
          src={sprite}
          alt={name}
          title={name}
        />
      </CardActionArea>
    </Card>
  );
};
