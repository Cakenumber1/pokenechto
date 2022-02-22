import {
  Button,
  Modal,
} from '@mui/material';
import clsx from 'clsx';
import { colorMap, namesMap } from 'helpers/types';
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

  // не видит
  // useEffect(() => {
  //   modal.current?.addEventListener('transitionstart', () => {
  //     setIsAnimated(true);
  //     console.log(isAnimated);
  //   });
  // }, [isAnimated]);

  return (
    <Modal open={open} hideBackdrop>
      <div
        className={modalStyle}
        ref={modal}
      >
        <button type="button" className={buttonStyle} onClick={handleClose}>Back</button>
        <div style={{
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
          <div style={{ width: '100%', padding: '2vh' }}>
            <div style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
            >{pokemon!.name.toUpperCase()}
            </div>
            <div style={{ textAlign: 'center' }}>
              Types
              {pokemon!.types.map((type) => (
                <div key={type}>{type}</div>
              ))}
            </div>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
            >
              <div style={{
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
                {pokemon!.weight / 10}KG
              </div>
              <div style={{
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
                  {pokemon!.height / 10} M
              </div>
            </div>
            <div style={{ padding: '2vh' }}>
              <div style={{ textAlign: 'center' }}>Abilities</div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
              >
                {pokemon!.abilities.map((ab) => (
                  <div key={ab}>{ab}</div>
                ))}
              </div>
            </div>
            <div
              className="stats"
              style={{
                width: '100%',
                background: '#abd9b0',
                borderRadius: '4px',
                padding: '1vh',
              }}
            >
              <div style={{ textAlign: 'center' }}>Stats</div>
              {pokemon!.stats.map((stat) => (
                <div key={stat.statName} style={{ display: 'flex', padding: '.5vh 10%' }}>
                  <div style={{ width: '20%' }}>{namesMap.get(stat.statName)}</div>
                  <div style={{
                    width: '100%',
                    marginLeft: '1%',
                    height: '3vh',
                    background: 'grey',
                    borderRadius: '50vmax',
                  }}
                  >
                    <div style={{
                      height: '100%',
                      background: colorMap.get(stat.statName),
                      width: `${stat.statVal / 3}%`,
                      borderRadius: '50vmax',
                      textAlign: 'center',
                    }}
                    >
                      {stat.statVal}/300
                    </div>
                  </div>
                </div>
              ))}
              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                paddingTop: '2vh',
              }}
              >
                <div>EXP {pokemon!.exp}/?</div>
              </div>
            </div>
          </div>
          <Button style={{ display: 'none' }} variant="contained">Buy</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PokeModal;
