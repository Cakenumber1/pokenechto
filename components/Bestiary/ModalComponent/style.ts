import { makeStyles } from '@mui/styles';
import { DataType } from 'interfaces/dataModal';

export const useStyles = makeStyles(() => ({
  img: () => ({
    objectFit: 'fill',
    position: 'relative',
    width: '100%',
    background: 'white',
    maxHeight: '100%',
    transition: '1s all',
    paddingTop: '1.5vh',
  }),
  imgFull: () => ({
    background: 'white',
    maxHeight: '30%',
    paddingTop: '1.5vh',
  }),
  modal: (data: DataType) => ({
    position: 'absolute',
    width: data.width,
    height: data.height,
    top: data.top,
    left: data.left,
    transition: '1s all',
    background: 'black',
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
    height: '5vh',
    width: '9vh',
    fontSize: '2.7vh',
    background: '#4fc3f7',
    border: 'none',
    cursor: 'pointer',
    transition: '.3s all',
    transitionDelay: '.2s all',
    margin: '1.5vh',
    color: 'black',
    opacity: '0',
    zIndex: '100',
    borderRadius: '4px',
  }),
  buttonFull: () => ({
    opacity: '1',
  }),
  buttonFull2: () => ({
    opacity: '1',
  }),
}));
