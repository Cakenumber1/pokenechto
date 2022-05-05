import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  shopBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  shopTop: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  shopTopText: {
    margin: 0,
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2.5vmax',
  },
  shopShelves: {
    height: '30%',
  },
  shopText: {
    fontSize: '2vmax',
    color: '#ffcb05',
    textAlign: 'center',
  },
  shopShelvesText: {
    fontSize: '2vmax',
    color: '#ffcb05',
    height: '20%',
    width: '100%',
    background: '#3d7dca',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto',
  },
});
