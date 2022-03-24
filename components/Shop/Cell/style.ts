import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  pokeImg: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  cardAmount: {
    fontSize: '2vh',
    position: 'absolute',
    fontWeight: 'bold',
    color: 'black',
    background: 'yellow',
    borderRadius: '2vh',
    zIndex: 1,
    bottom: 0,
    right: 0,
    padding: '.2vh',
    pointerEvents: 'none',
  },
  unavailable: {
    cursor: 'auto',
    filter: 'grayscale(100%)',
    objectFit: 'fill',
  },
  soled: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
});
