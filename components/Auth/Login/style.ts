import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  box: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    zIndex: '10',
    background: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    position: 'absolute',
    top: '10%',
    left: 0,
    width: '100%',
    padding: '2vh',
    textAlign: 'center',
  },
  verify: {
    color: 'red',
    position: 'absolute',
    top: '15%',
    left: 0,
    width: '100%',
    padding: '2vh',
    textAlign: 'center',
  },
});
