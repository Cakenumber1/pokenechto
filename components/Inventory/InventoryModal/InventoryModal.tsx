import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import { linearProgressClasses } from '@mui/material';

//TODO: временное для показать
const borderLinearProgress = (color: string) => {
  return {
    width: '100%',
    height: 15,
    marginBottom: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: 'white',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
    },
  };
};

export const InventoryModal = ({
  open,
  pokemon,
  onClose: handleClose,
}: any) => {
  const [zoomEntered, setZoomEntered] = useState(false);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Zoom timeout={500} in={open} onEntered={() => setZoomEntered(true)}>
        <Box>
          <Slide direction="down" in={zoomEntered} timeout={1500}>
            <img src={pokemon.sprite} alt="" />
          </Slide>
          <div>
            <h3>Info of Pokemon #{pokemon.id}</h3>
          </div>
          <Grow timeout={1000} in={zoomEntered}>
            <LinearProgress
              variant="determinate"
              sx={borderLinearProgress('green')}
              value={Math.ceil(Math.random() * 99)}
            />
          </Grow>
          <Grow timeout={1500} in={zoomEntered}>
            <LinearProgress
              variant="determinate"
              sx={borderLinearProgress('red')}
              value={Math.ceil(Math.random() * 99)}
            />
          </Grow>
          <Grow timeout={2000} in={zoomEntered}>
            <LinearProgress
              variant="determinate"
              sx={borderLinearProgress('blue')}
              value={Math.ceil(Math.random() * 99)}
            />
          </Grow>
          <Grow timeout={2500} in={zoomEntered}>
            <LinearProgress
              variant="determinate"
              sx={borderLinearProgress('black')}
              value={Math.ceil(Math.random() * 99)}
            />
          </Grow>
          <Button variant="contained" size="large" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Zoom>
    </Modal>
  );
};
