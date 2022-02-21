import {
  Modal, Button
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
  pokemon: Pokemon,
  data: DataType
};

const PokeModal = ({
  open, onClose, pokemon, data,
}: Props) => {
  const classes = useStyles(data);

  const modal = useRef<HTMLDivElement>(null);
  // const [isAnimated, setIsAnimated] = useState(false);
  const [full, setFull] = useState(false);

  const modalStyle = clsx({
    [classes.modal]: true,
    [classes.modalFull]: full,
  });
  const buttonStyle = clsx({
    [classes.button]: true,
    [classes.buttonFull]: full,
  });

  const handleClose = () => {
    setFull(false);
    setTimeout(() => {
      onClose();
    }, 1100);
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
        <button type="button"  className={buttonStyle} onClick={handleClose}>Back</button>
        <div style={{
          background: 'grey',
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
            className={classes.img}
            style={{
              background: data.background,
            }}
            src={pokemon!.img}
            alt={pokemon!.name}
          />
          <div style={{ width: '100%', padding: '2vh' }}>
            <div style={{ textAlign: 'center', fontSize: 'large' }}>{pokemon!.name.toUpperCase()}</div>
            <div style={{ textAlign: 'center' }}>
              Types
              {pokemon!.types.map((type) => (
                <div key={type}>{type}</div>
              ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
              <div style={{
                background: 'lightgrey', borderRadius: '50vh', height: '8vh', width: '16vh', textAlign: 'center',
              }}
              >
                <div>
                  Weight
                </div>
                <div style={{ paddingTop: '2vh' }}>
                  {pokemon!.weight / 10}KG
                </div>
              </div>
              <div style={{
                background: 'lightgrey', borderRadius: '50vh', height: '8vh', width: '16vh', textAlign: 'center',
              }}
              >
                <div>Height</div>
                <div style={{ paddingTop: '2vh' }}>
                  {pokemon!.height / 10} M
                </div>
              </div>
            </div>
            <div style={{ padding: '2vh' }}>
              <div style={{ textAlign: 'center' }}>Abilities</div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {pokemon!.abilities.map((ab) => (
                  <div key={ab}>{ab}</div>
                ))}
              </div>
            </div>
            <div className="stats" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>Stats</div>
              {pokemon!.stats.map((stat) => (
                <div key={stat.statName} style={{ display: 'flex', padding: '.5vh 10%' }}>
                  <div style={{ width: '20%' }}>{namesMap.get(stat.statName)}</div>
                  <div style={{
                    width: '100%', height: '3vh', background: 'dimgrey', borderRadius: '50vmax',
                  }}
                  >
                    <div style={{
                      height: '100%', background: colorMap.get(stat.statName), width: `${stat.statVal / 3}%`, borderRadius: '50vmax', textAlign: 'center',
                    }}
                    >
                      {stat.statVal}/300
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <div>EXP {pokemon!.exp}/?</div>
            </div>
          </div>
          <Button variant="contained">Buy</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PokeModal;