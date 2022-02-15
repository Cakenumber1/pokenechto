import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { Pokemon } from 'interfaces';
import React, { useRef, useState } from 'react';

const RESERVED_GLOBAL_CLASS = 'closeMuiModal';

// перекинуть в функцию, передать данные и поменять top left тут

const getAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0
  }
  100% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
`;

const styleOpen = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transformStyle: '',
  animation: `${getAnimation} 2s forwards`,
  bgcolor: 'background.paper',
  border: '2px solid #000',
};

type ModalProps = {
  pokemon: Pokemon
};

const ModalComponent = ({ pokemon }: ModalProps) => {
  const modal = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    modal!.current!.classList.add(RESERVED_GLOBAL_CLASS);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        hideBackdrop
      >
        <Fade in={open}>
          <Box ref={modal} sx={styleOpen}>
            {pokemon
              ? <div>{pokemon.id}</div>
              : <div>ошибка загрузки</div>}
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
