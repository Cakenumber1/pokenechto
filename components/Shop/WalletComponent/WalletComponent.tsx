import React, { useCallback, useRef, useState } from 'react';
import { useStyles, useModalStyles } from './style';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import {
  Button,
  Collapse,
  Modal,
  Box, Stack,
} from '@mui/material';
import TableComponent from './TableComponent/';

type Props = {
  money: number,
  mushrooms: number,
};

const WalletComponent: React.FC<Props> = ({money, mushrooms}) => {
  const classesM = useModalStyles();
  const classes = useStyles();
  const modal = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setTimeout(() => {
      modal!.current!.classList.add(`${classesM.boxExpand}`);
    }, 1);
    setTimeout(() => {
      setExpand(true)
    }, 1000)
  }, [classesM.boxExpand]);

  const handleClose = useCallback(() => {
    setExpand(false)
    setTimeout(() => {
      setOpen(false)
    }, 1100);
    setTimeout(() => {
      modal!.current!.classList.remove(`${classesM.boxExpand}`);
    }, 300)
  }, [classesM.boxExpand]);


  return (
    <div className={classes.container}>
      <TableComponent money={money} mushrooms={mushrooms}/>
      <Modal open={open}
             onClose={handleClose}
             hideBackdrop={true}
      >
        <Box ref={modal} className={classesM.box}>
          <Collapse in={expand}>
            <Stack className={classesM.boxInner} spacing={2}>
              <div>
                <h2 style={{textAlign: 'center'}}>Баланс</h2>
                <TableComponent money={money} mushrooms={mushrooms}/>
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
      <Button startIcon={<ShoppingBasketRoundedIcon sx={{color: 'black'}}/>} onClick={handleOpen}/>
    </div>
  )
}

export default WalletComponent
