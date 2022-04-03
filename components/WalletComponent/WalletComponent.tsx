import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import {
  Box, Button, Collapse, Modal, Stack, Zoom,
} from '@mui/material';
import { useAuth } from 'myFirebase/AuthContext';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import {
  usePatchMoneyMutation,
  usePatchMushroomsMutation,
  usePostMoneyQuery,
  usePostMushroomsQuery,
} from 'store/service';

import { useModalStyles, useStyles } from './style';
import TableComponent from './TableComponent';

const WalletComponent = () => {
  const { currentUser } = useAuth()!;
  const { data: mushrooms } = usePostMushroomsQuery(currentUser.uid);
  const { data: money } = usePostMoneyQuery(currentUser.uid);
  const [patchMoneyMutation] = usePatchMoneyMutation();
  const [patchMushroomsMutation] = usePatchMushroomsMutation();
  const classesM = useModalStyles();
  const classes = useStyles();
  const [isDropped, setIsDropped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleDrop = useCallback(() => {
    setIsDropped(true);
  }, []);

  const handleSqueeze = useCallback(() => {
    setIsDropped(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAddMoney = (e: SyntheticEvent) => {
    e.preventDefault();
    const temp = e.target as HTMLElement;
    patchMoneyMutation({ uid: currentUser.uid, count: Number(temp.innerText) }).unwrap();
  };
  const handleAddMushrooms = (e: SyntheticEvent) => {
    e.preventDefault();
    const temp = e.target as HTMLElement;
    patchMushroomsMutation({ uid: currentUser.uid, count: Number(temp.innerText) }).unwrap();
  };
  const getShopColour = () => {
    const t = new Date().getHours();
    if (t > 18 || t < 4) {
      return 'yellow';
    }
    return 'black';
  };

  return (
    <div className={classes.container}>
      <TableComponent money={money?.count || 0} mushrooms={mushrooms?.count || 0} />
      <Modal
        open={isOpen}
        hideBackdrop
      >
        <Zoom in={isOpen} onEntered={handleDrop}>
          <Box className={classesM.box}>
            <Collapse in={isDropped} onExited={handleClose}>
              <Stack className={classesM.boxInner} spacing={2}>
                <div>
                  <h2 style={{ textAlign: 'center' }}>Баланс</h2>
                  <TableComponent money={money?.count || 0} mushrooms={mushrooms?.count || 0} />
                </div>
                <div>
                  <div>Купить $$$</div>
                  <Button variant="contained" disabled>10</Button>
                  <Button variant="contained" disabled>100</Button>
                  <Button onClick={handleAddMoney} variant="contained">1000</Button>
                </div>
                <div>
                  <div>Купить 🍄</div>
                  <Button variant="contained" disabled>10</Button>
                  <Button variant="contained" disabled>50</Button>
                  <Button onClick={handleAddMushrooms} variant="contained">100</Button>
                </div>
                <Button onClick={handleSqueeze}>Выйти</Button>
              </Stack>
            </Collapse>
          </Box>
        </Zoom>
      </Modal>
      <Button
        startIcon={
          <ShoppingBasketRoundedIcon sx={{ color: getShopColour() }} />
      }
        onClick={handleOpen}
      />
    </div>
  );
};

export default WalletComponent;
