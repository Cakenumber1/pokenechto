import React from 'react';
import { PokemonCollectionType } from '../../../helpers/inventoryHelpers';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { useStyles } from './styles';

export const InventoryPokemonCardComponent = ({
  pokemonImage,
  pokemonId,
}: PokemonCollectionType) => {
  const classes = useStyles();

  return (
    <Card className={classes.inventoryPokemonCard}>
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          className={classes.inventoryPokemonCard__Image}
          component="img"
          src={pokemonImage}
          alt={`Name of Pokemon#${pokemonId}`}
        />
      </CardActionArea>
    </Card>
  );
};
