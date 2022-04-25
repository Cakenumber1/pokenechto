import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    background: 'white',
  },
  mainInner: {
    maxWidth: '200px',
    width: '100%',
    height: '100%',
  },
});
