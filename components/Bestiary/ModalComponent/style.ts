import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataType } from 'interfaces/dataModal';

export const useStyles = makeStyles((theme : Theme) => ({
  img: (data : DataType) => ({
    objectFit: 'fill',
    position: 'relative',
    width: '100%',
    background: data.background,
    [theme.breakpoints.down('md')]: {
      maxHeight: '26.662vh',
    },
    [theme.breakpoints.down('lg')]: {
      maxHeight: '32.2vh',
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '36vh',
    },
  }),
  modal: (data: DataType) => ({
    position: 'absolute',
    width: data.width,
    height: data.height,
    top: data.top,
    left: data.left,
    transition: '1s all',
    background: 'grey',
  }),
  // data не убирать
  modalFull: (data: DataType) => ({
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  }),
  button: (data: DataType) => ({
    display: 'block',
    maxHeight: '1px',
    background: 'none',
    border: 'none',
    fontSize: '0px',
    transition: '1s all',
    cursor: 'pointer',
    // не работает
    transitionDelay: '10s all',
    margin: '.5vh',
    color: 'white',
  }),
  buttonFull: (data: DataType) => ({
    maxHeight: '3vh',
    height: '4vh',
    fontSize: '3vh',
  }),
}));
