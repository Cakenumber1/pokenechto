import {
  Box,
  Grow,
} from '@mui/material';
import clsx from 'clsx';
import PokeModal from 'components/Common/ModalComponent';
import { getBackgdoundColor } from 'helpers/types/colorMap';
import { DataType } from 'interfaces';
import soledOut from 'public/soled_out.png';
import React, { SyntheticEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { pokemonByIDSelector } from 'store/shop/shopSlice';

import { useStyles } from './style';

type Props = {
  pokeid: any,
  limit?: number,
  amount?: number
};

const shake = [
  { transform: 'translate(1px, 1px) rotate(0deg)' },
  { transform: 'translate(-1px, -2px) rotate(-1deg)' },
  { transform: 'translate(-3px, 0px) rotate(1deg)' },
  { transform: 'translate(3px, 2px) rotate(0deg)' },
  { transform: 'translate(1px, -1px) rotate(1deg)' },
  { transform: 'translate(-1px, 2px) rotate(-1deg)' },
  { transform: 'translate(-3px, 1px) rotate(0deg)' },
  { transform: 'translate(3px, 1px) rotate(-1deg)' },
  { transform: 'translate(-1px, -1px) rotate(1deg)' },
  { transform: 'translate(1px, 2px) rotate(0deg)' },
  { transform: 'translate(1px, -2px) rotate(-1deg)' },
];

const CellComponent: React.FC<Props> = ({ pokeid, limit, amount }) => {
  const classes = useStyles();
  const pokemon = useSelector((state) => pokemonByIDSelector(state, pokeid));
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<DataType>({
    left: 0, top: 0, height: 0, width: 0, background: 'none',
  });

  if (amount === undefined) {
    limit = pokemon.limit;
    amount = pokemon.amount;
  }

  const handleOpen = useCallback((e : SyntheticEvent) => {
    const elem = e.target as HTMLElement;
    if (amount) {
      const d = elem.getBoundingClientRect();
      setData({
        left: d.left,
        top: d.top,
        height: d.height,
        width: d.width,
        background: elem.style.background,
      });
      setOpen(true);
    } else {
      elem.parentElement!.animate(shake, {
        duration: 500,
      });
    }
  }, [amount]);
  const handleClose = useCallback(() => setOpen(false), []);

  const imgStyle = clsx({
    [classes.pokeImg]: true,
    [classes.unavailable]: amount! <= 0,
  });

  const color = getBackgdoundColor(pokemon!.types);

  return (
    <>
      <Grow in timeout={3000}>
        <Box className={classes.card} onClick={handleOpen}>
          <img
            className={imgStyle}
            src={pokemon!.img}
            alt={pokemon!.name}
            style={amount > 0 ? { background: color } : { background: 'white' }}
          />
          {amount! === 0 ? (
            <img
              className={classes.soled}
              src={soledOut.src}
              alt="soled"
            />
          ) : amount && limit && (
            <div>
              <div className={classes.cardAmount}>
                {amount}
                /
                {limit}
              </div>
            </div>
          )}
        </Box>
      </Grow>
      <PokeModal open={open} onClose={handleClose} pokemon={pokemon} data={data} />
    </>
  );
};

export default CellComponent;
