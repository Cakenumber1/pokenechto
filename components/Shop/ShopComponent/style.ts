import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  shopBody: {
    position: 'absolute',
    bottom: 0,
    left: '5%',
    height: '90%',
    padding: '2.5% 2.5% 0 2.5%',
    width: '85%',
    background: 'saddlebrown',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    overflowY: 'auto',
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
  shopShelvesText: {
    height: '20%',
    width: '100%',
    background: 'lightblue',
  }
})
