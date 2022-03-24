import {
  Box,
  Button,
  Modal,
} from '@mui/material';
import clsx from 'clsx';
import { colorMap, namesMap } from 'helpers/maps';
import { DataType, Pokemon } from 'interfaces/';
import React, {
  useEffect, useRef,
  useState,
} from 'react';

import { useStyles } from './style';

type Props = {
  open: boolean
  onClose: () => void
  pokemon: Partial<Pokemon>,
  data: DataType
};

// todo: переделать
const PokeModal = ({
  open, onClose, pokemon, data,
}: Props) => {
  const classes = useStyles(data);

  const modal = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  const modalStyle = clsx({
    [classes.modal]: true,
    [classes.modalFull]: full,
  });
  const buttonStyle = clsx({
    [classes.button]: true,
    [classes.buttonFull]: full,
  });
  const imgStyle = clsx({
    [classes.img]: true,
    [classes.imgFull]: full,
  });

  const handleClose = () => {
    setFull(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setFull(open);
    }, 1);
  }, [open]);

  return (
    <Modal open={open} hideBackdrop>
      <Box
        className={modalStyle}
        ref={modal}
      >
        <Button type="button" className={buttonStyle} onClick={handleClose}>Back</Button>
        <Box style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          top: 0,
          left: 0,
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        >
          <img
            className={imgStyle}
            src={pokemon!.img}
            alt={pokemon!.name}
          />
          <Box style={{ width: '100%', padding: '2vh' }}>
            <Box style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
            >{pokemon!.name!.toUpperCase()}
            </Box>
            <Box style={{ textAlign: 'center' }}>
              Types
              {pokemon!.types!.map((type) => (
                <Box key={type}>{type}</Box>
              ))}
            </Box>
            <Box style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
            >
              <Box style={{
                background: '#98b2f5',
                borderRadius: '50vh',
                height: '7vh',
                minWidth: '16vh',
                textAlign: 'center',
                paddingTop: '0.2vh',
              }}
              >
                Weight
                <br />
                {pokemon!.weight! / 10}KG
              </Box>
              <Box style={{
                background: '#f5989e',
                borderRadius: '50vh',
                height: '7vh',
                minHeight: '5vh',
                minWidth: '16vh',
                textAlign: 'center',
                paddingTop: '0.2vh',
              }}
              >
                Height
                <br />
                {pokemon!.height! / 10} M
              </Box>
            </Box>
            <Box style={{ padding: '2vh' }}>
              <Box style={{ textAlign: 'center' }}>Abilities</Box>
              <Box style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
              >
                {pokemon!.abilities!.map((ab) => (
                  <Box key={ab}>{ab}</Box>
                ))}
              </Box>
            </Box>
            <Box
              className="stats"
              style={{
                width: '100%',
                background: '#abd9b0',
                borderRadius: '4px',
                padding: '1vh',
              }}
            >
              <Box style={{ textAlign: 'center' }}>Stats</Box>
              {pokemon!.stats!.map((stat) => (
                <Box key={stat.statName} style={{ display: 'flex', padding: '.5vh 10%' }}>
                  <Box style={{ width: '20%' }}>{namesMap.get(stat.statName)}</Box>
                  <Box style={{
                    width: '100%',
                    marginLeft: '1%',
                    height: '3vh',
                    background: 'grey',
                    borderRadius: '50vmax',
                  }}
                  >
                    <Box style={{
                      height: '100%',
                      background: colorMap.get(stat.statName),
                      width: `${stat.statVal / 3}%`,
                      borderRadius: '50vmax',
                      textAlign: 'center',
                    }}
                    >
                      {stat.statVal}/300
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                paddingTop: '2vh',
              }}
              >
                <Box>EXP {pokemon!.exp}/?</Box>
              </Box>
            </Box>
          </Box>
          <Button style={{ display: 'none' }} variant="contained">Buy</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PokeModal;
