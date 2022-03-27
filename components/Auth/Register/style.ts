import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  main: {
    height: '100%',
  },
  box: {
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
  swiper: {
    width: '180px',
    height: '240px',
    padding: '10px',
    margin: 0,
  },
  swiperSlide: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '18px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    background: 'grey',
  },
});
