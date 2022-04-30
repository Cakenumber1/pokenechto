import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  fullMail: {
    width: '100%',
    height: '100%',
    padding: '2% 4%',
  },
  button: {
    outlineOffset: '4px',
    padding: 0,
    cursor: 'pointer',
    width: '20%',
    minWidth: '75px',
    height: '100%',
    border: 'none',
    display: 'block',
    fontSize: '1.1rem',
    color: 'white',
    background: 'dimgrey',
    borderRadius: '500px 500px 0 0',
  },
  active: {
    background: 'darkgray',
  },
});
