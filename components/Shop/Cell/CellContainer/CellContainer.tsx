import clsx from 'clsx';
import LoaderComponent from 'components/LoaderComponent';
import CellComponent from 'components/Shop/Cell/CellComponent';
import { getBackgdoundColor } from 'helpers/maps/colorMap';
import { DataType } from 'interfaces';
import React, { SyntheticEvent, useCallback } from 'react';
import { usePostPokemonByIDQuery } from 'store/service';

import { useStyles } from '../style';

type Props = {
  pokeid: string,
  path: string
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

const CellContainer: React.FC<Props> = ({ pokeid, path }) => {
  const { data: pokemon } = usePostPokemonByIDQuery({ target: path, pid: pokeid });
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
      <CellComponent
        pokemon={pokemon}
        handleOpen={handleOpen}
        handleClose={handleClose}
        classes={classes}
        limit={limit}
        amount={amount}
        open={open}
        data={data}
        color={color}
        imgStyle={imgStyle}
      />
    );
  }
  return <LoaderComponent />;
};

export default CellContainer;
