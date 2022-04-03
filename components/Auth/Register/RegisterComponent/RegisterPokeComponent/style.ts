import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStylesSwiper = makeStyles((theme : Theme) => ({
  swiper: {
    padding: '10px',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      width: '150px',
      height: '180px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '180px',
      height: '210px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '21vh',
      height: '28vh',
    },
  },
  swiperSlide: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '18px',
    color: '#fff',
    background: 'grey',
  },
  header: {
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '20px',
    },
  },
}));