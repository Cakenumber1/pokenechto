import React from 'react';
import { PokemonCollectionItemProp } from 'helpers/inventoryHelpers';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { useStyles } from './styles';

type InventoryPokemonCardComponentProps = {
  collectionItem: PokemonCollectionItemProp;
  onClick: any; //(event: React.MouseEvent<HTMLElement>, pokemonId: number) => void;
};

export const InventoryPokemonCardComponent = ({
  collectionItem,
  onClick: handleClick,
}: InventoryPokemonCardComponentProps) => {
  const classes = useStyles();
  const { id, sprite, name } = collectionItem;

  return (
    <Card
      className={classes.inventoryPokemonCard}
      onClick={(event) => handleClick(event, id, sprite)}
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
