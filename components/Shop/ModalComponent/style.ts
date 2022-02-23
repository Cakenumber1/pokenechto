import { makeStyles } from '@mui/styles';
import { DataType } from 'interfaces/dataModal';

export const useStyles = makeStyles(() => ({
  img: (data : DataType) => ({
    objectFit: 'fill',
    position: 'relative',
    width: '100%',
    background: data.background,
    maxHeight: '100%',
    transition: '1s all',
  }),
  imgFull: (data : DataType) => ({
    background: data.background,
    maxHeight: '30%',
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
  modalFull: () => ({
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  }),
  button: () => ({
    display: 'block',
    position: 'absolute',
    left: '0',
    top: '0',
    height: '4vh',
    fontSize: '3vh',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: '.3s all',
    transitionDelay: '.2s all',
    margin: '.5vh',
    color: 'white',
    opacity: '0',
    zIndex: '100',
  }),
  buttonFull: () => ({
    opacity: '1',
  }),
}));
