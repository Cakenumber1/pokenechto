import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  box: {
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
