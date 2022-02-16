import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme : Theme) => ({
  stack: {
    height: '85%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  },
  // TypeError: Cannot read properties of undefined (reading 'down')
  // item: {
  //   position: 'relative',
  //   [theme.breakpoints.down('md')]: {
  //     width: '10px',
  //     height: '10px',
  //   },
  //   [theme.breakpoints.down('lg')]: {
  //     width: '100px',
  //     height: '100px',
  //   },
  //   [theme.breakpoints.up('lg')]: {
  //     width: '200px',
  //     height: '200px',
  //   },
  // },
}));
