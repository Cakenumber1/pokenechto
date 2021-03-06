import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme : Theme) => ({
  item: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '13.662vh',
      height: '13.662vh',
    },
    [theme.breakpoints.down('lg')]: {
      width: '16.2vh',
      height: '16.2vh',
    },
    [theme.breakpoints.up('lg')]: {
      width: '18vh',
      height: '18vh',
    },
  },
}));
