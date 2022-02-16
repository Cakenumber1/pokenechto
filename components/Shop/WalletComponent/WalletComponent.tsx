import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import {
  Box,
  Button,
  Collapse,
  Modal,
  Stack,
} from '@mui/material';
import clsx from 'clsx';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useModalStyles, useStyles } from './style';
import TableComponent from './TableComponent';

type Props = {
  money: number,
  mushrooms: number,
};

const WalletComponent: React.FC<Props> = ({ money, mushrooms }) => {
  const classesM = useModalStyles();
  const classes = useStyles();
  const modal = useRef<HTMLElement>();
  const [isTransitioned, setIsTransitioned] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const boxStyle = clsx({
    [classesM.box]: true,
    [classesM.boxExpand]: isExpand,
  });

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => {
      setIsExpand(true);
    }, 1);
  }, []);

  const handleClose = useCallback(() => {
    setIsDropped(false);
    setIsExpand(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        modal.current?.addEventListener('transitionend', () => {
          setIsTransitioned(true);
          setIsTransitioned(false);
        });
      }, 1);
    }
  }, [isOpen]);

  // Open mechanism
  useEffect(() => {
    if (isExpand && isTransitioned) {
      setIsDropped(true);
    }
  }, [isTransitioned, isExpand]);

  // Close mechanism
  // isTransitioned happens in the middle of animation

  // useEffect(() => {
  //   if (!isExpand && isTransitioned) {
  //     // isTransitioned happens in the middle of animation
  //     setTimeout(() => {
  //       setIsOpen(false);
  //     }, 500);
  //   }
  // }, [isTransitioned, isExpand]);

  return (
    <div className={classes.container}>
      <TableComponent money={money} mushrooms={mushrooms} />
      <Modal
        open={isOpen}
        onClose={handleClose}
        hideBackdrop
      >
        <Box ref={modal} className={boxStyle}>
          <Collapse in={isDropped}>
            <Stack className={classesM.boxInner} spacing={2}>
              <div>
                <h2 style={{ textAlign: 'center' }}>Баланс</h2>
                <TableComponent money={money} mushrooms={mushrooms} />
              </div>
              <div>
                <div>Купить $$$</div>
                <Button variant="contained" disabled>10</Button>
                <Button variant="contained" disabled>100</Button>
                <Button variant="contained">1000</Button>
              </div>
              <div>
                <div>Купить 🍄</div>
                <Button variant="contained" disabled>10</Button>
                <Button variant="contained" disabled>50</Button>
                <Button variant="contained">100</Button>
              </div>
              <Button onClick={handleClose}>Выйти</Button>
            </Stack>
          </Collapse>
        </Box>
      </Modal>
      <Button startIcon={<ShoppingBasketRoundedIcon sx={{ color: 'black' }} />} onClick={handleOpen} />
    </div>
  );
};

export default WalletComponent;
