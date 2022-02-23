import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStylesItem = makeStyles((theme : Theme) => ({
  item: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '10.385vh',
      height: '10.385vh',
    },
    [theme.breakpoints.down('lg')]: {
      width: '10vh',
      height: '10vh',
    },
    [theme.breakpoints.up('lg')]: {
      width: '15vh',
      height: '15vh',
    },
  },
}));

export const useStylesStack = makeStyles({
  stack: {
    height: '85%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  },
});
