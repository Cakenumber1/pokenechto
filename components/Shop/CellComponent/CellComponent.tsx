import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Pokemon } from 'interfaces';
import soledOut from 'public/soled_out.png';
import React, { useEffect, useState } from 'react';

import { useStyles } from './style';

type Props = {
  pokemon: Pokemon,
};

const CellComponent: React.FC<Props> = ({ pokemon }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { amount } = pokemon!;
  const { limit } = pokemon!;

  // IDK
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  if (!loading) {
    return (
      <Card className={classes.card}>
        <CardMedia
          className={amount > 0
            ? `${classes.pokeImg}`
            : `${classes.pokeImg} ${classes.unavailable}`}
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
    );
  }
  return <div/>
};

export default CellComponent;
