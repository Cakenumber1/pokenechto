import {
  Box,
  Grow,
} from '@mui/material';
import clsx from 'clsx';
import PokeModal from 'components/Shop/ModalComponent';
import { getBackgdoundColor } from 'helpers/types/colorMap';
import { DataType } from 'interfaces';
import soledOut from 'public/soled_out.png';
import React, { SyntheticEvent, useCallback } from 'react';
import { useGetPokemonByIDQuery } from 'store/service';

import { useStyles } from './style';

type Props = {
  pokeid: any,
  // eslint-disable-next-line react/require-default-props
  limit?: number,
  // eslint-disable-next-line react/require-default-props
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

const CellComponent: React.FC<Props> = ({ pokeid }) => {
  const { data: pokemon } = useGetPokemonByIDQuery(pokeid);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<DataType>({
    left: 0, top: 0, height: 0, width: 0, background: 'none',
  });
  let limit = 0;
  let amount = 0;
  if (pokemon) {
    // eslint-disable-next-line no-param-reassign
    limit = pokemon!.limit;
    // eslint-disable-next-line no-param-reassign
    amount = pokemon!.amount;
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
  let color = 'white';
  if (pokemon) color = getBackgdoundColor(pokemon.types);
  if (pokemon) {
    return (
      <>
        <Grow in timeout={3000}>
          <Box className={classes.card} onClick={handleOpen}>
            <img
              className={imgStyle}
              src={pokemon!.img}
              alt={pokemon!.name}
              style={amount! > 0 ? { background: color } : { background: 'white' }}
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
  }
  return <div />;
};

export default CellComponent;
