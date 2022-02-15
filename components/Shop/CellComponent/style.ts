import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    '& .MuiCardMedia-root': {
      objectFit: 'fill',
    },
  },
  card: {
    width: '100%',
    height: '100%',
  },
  pokeImg: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    '& .MuiCardMedia-root': {
      objectFit: 'fill',
    },
  },
  cardAmount: {
    position: 'absolute',
    color: 'red',
    zIndex: 1,
    bottom: 0,
    right: 0,
    margin: 0,
  },
  unavailable: {
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
    '& .MuiCardMedia-root': {
      objectFit: 'fill',
    },
  },
});
