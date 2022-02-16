import {
  Card,
  CardContent,
  CardMedia, Grow,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { Pokemon } from 'interfaces';
import soledOut from 'public/soled_out.png';
import React from 'react';

import { useStyles } from './style';

type Props = {
  pokemon: Pokemon,
};

const CellComponent: React.FC<Props> = ({ pokemon }) => {
  const classes = useStyles();
  const { limit } = pokemon!;
  const { amount } = pokemon!;
  const imgStyle = clsx({
    [classes.pokeImg]: true,
    [classes.unavailable]: amount <= 0,
  });

  return (
    <Grow in timeout={3000}>
      <Card className={classes.card}>
        <CardMedia
          className={imgStyle}
          component="img"
          image={pokemon!.img}
          alt={pokemon!.name}
        />
        {amount! === 0 && (
        <CardMedia
          className={classes.soled}
          component="img"
          image={soledOut.src}
          alt="soled"
        />
        )}
        {amount && limit && (
        <CardContent>
          <Typography className={classes.cardAmount} variant="h5" component="div">
            {amount}
            /
            {limit}
          </Typography>
        </CardContent>
        )}
      </Card>
    </Grow>
  );
};

export default CellComponent;
