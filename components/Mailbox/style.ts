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
    width: '26%',
    height: '100%',
    border: 'none',
    display: 'block',
    fontSize: '1.25rem',
    color: 'white',
    background: 'dimgrey',
  },
  active: {
    background: 'darkgray',
  },
});
