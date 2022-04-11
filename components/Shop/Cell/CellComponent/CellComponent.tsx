import {
  Box,
  Grow,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import ModalContainer from 'components/Shop/Modal/ModalContainer';
import { DataType, PokemonShop } from 'interfaces';
import soledOut from 'public/soled_out.png';
import React, { SyntheticEvent } from 'react';

type Props = {
  pokemon: PokemonShop,
  handleOpen: (e: SyntheticEvent) => void,
  handleClose: () => void,
  classes: ClassNameMap,
  limit: number,
  amount: number,
  open: boolean,
  data: DataType,
  color: string,
  imgStyle: string
};

const CellComponent: React.FC<Props> = ({
  pokemon,
  handleOpen,
  handleClose,
  classes,
  limit,
  amount,
  open,
  data,
  color,
  imgStyle,
}) => {
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
              <Box>
                <Box className={classes.cardAmount}>
                  {amount}
                  /
                  {limit}
                </Box>
              </Box>
            )}
          </Box>
        </Grow>
        <ModalContainer open={open} onClose={handleClose} pokemon={pokemon} data={data} />
      </>
    );
  }
  return <div />;
};

export default CellComponent;
