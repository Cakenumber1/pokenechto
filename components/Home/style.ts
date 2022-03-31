import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme : Theme) => ({
  buildings: {
    height: '100%',
    display: 'flex',
    alignItems: 'self-end',
  },
  link: {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '10.385vh',
      height: '10.385vh',
    },
    [theme.breakpoints.down('lg')]: {
      width: '10.385vh',
      height: '10.385vh',
    },
    [theme.breakpoints.up('lg')]: {
      width: '15vh',
      height: '15vh',
    },
  },
}));
