import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import {
  Box, Button, Collapse, Modal, Stack, Zoom,
} from '@mui/material';
import PaymentContainerOuter from 'components/Wallet/Payment/PaymentContainerOuter';
import TableComponent from 'components/Wallet/TableComponent';
import { useAuth } from 'myFirebase/AuthContext';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import {
  usePostMoneyQuery,
  usePostMushroomsQuery,
} from 'store/service';

import { useModalStyles, useStyles } from './style';

const WalletComponent = () => {
  const { currentUser } = useAuth()!;
  const { data: mushrooms } = usePostMushroomsQuery(currentUser.uid);
  const { data: money } = usePostMoneyQuery(currentUser.uid);
  const classesM = useModalStyles();
  const classes = useStyles();
  const [isDropped, setIsDropped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [amount, setAmount] = useState(100);
  const [type, setType] = useState<string>('none');
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
    setIsOpenPay(true);
    setAmount(100000);
    setType('money');
  };
  const handleAddMushrooms = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpenPay(true);
    setAmount(100000);
    setType('berries');
  };
  const getShopColour = () => {
    const t = new Date().getHours();
    if (t > 18 || t < 4) {
      return 'yellow';
    }
    return 'black';
  };

  return (
    <Box className={classes.container}>
      <TableComponent money={money?.count || 0} mushrooms={mushrooms?.count || 0} />
      <Modal
        open={isOpen}
        hideBackdrop
      >
        <Zoom in={isOpen} onEntered={handleDrop}>
          <Box className={classesM.box}>
            <Collapse in={isDropped} onExited={handleClose}>
              <Stack className={classesM.boxInner} spacing={2}>
                <Box>
                  <h2 style={{ textAlign: 'center' }}>Balance</h2>
                  <TableComponent money={money?.count || 0} mushrooms={mushrooms?.count || 0} />
                </Box>
                <Box>
                  <Box>Buy Money</Box>
                  <Button variant="contained" disabled>100</Button>
                  <Button variant="contained" disabled>200</Button>
                  <Button onClick={handleAddMoney} variant="contained">1000</Button>
                </Box>
                <Box>
                  <Box>Buy Berries</Box>
                  <Button variant="contained" disabled>1</Button>
                  <Button variant="contained" disabled>5</Button>
                  <Button onClick={handleAddMushrooms} variant="contained">10</Button>
                </Box>
                <PaymentContainerOuter
                  amount={amount}
                  type={type}
                  isOpenPay={isOpenPay}
                  setIsOpenPay={setIsOpenPay}
                />
                <Button onClick={handleSqueeze}>Exit</Button>
              </Stack>
            </Collapse>
          </Box>
        </Zoom>
      </Modal>
      <Button
        startIcon={
          <ShoppingBasketRoundedIcon sx={{ color: getShopColour(), width: 40, height: 40 }} />
      }
        onClick={handleOpen}
      />
    </Box>
  );
};

export default WalletComponent;