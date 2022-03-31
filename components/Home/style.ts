import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme : Theme) => ({
  buildings: {
    height: '100%',
    display: 'flex',
    alignItems: 'self-end',
    '&>*': {
      width: '33%',
    },
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
  },
  mailbox: {
    cursor: 'pointer',
    paddingBottom: '15vh',
    width: '22.385vh',
    height: '22.385vh',
  },
  image: {
    cursor: 'pointer',
  },
  imagebox: {
    [theme.breakpoints.down('md')]: {
      width: '22.385vh',
      height: '22.385vh',
    },
    [theme.breakpoints.down('lg')]: {
      width: '22.385vh',
      height: '22.385vh',
    },
    [theme.breakpoints.up('lg')]: {
      width: '40.385vh',
      height: '40.385vh',
    },
  },
}));
