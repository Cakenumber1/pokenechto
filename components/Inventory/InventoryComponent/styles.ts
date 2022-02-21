import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  inventory: {
    height: '100%',
    display: 'grid',
    '@media (min-width: 0px)': {
      gridTemplateColumns: 'repeat(2, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(6, minmax(0%, 1fr))',
      gap: '10px',
      padding: '10px',
    },
    '@media (min-width: 568px)': {
      gridTemplateColumns: 'repeat(3, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(4, minmax(0%, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    '@media (orientation: landscape) and (min-width: 568px)': {
      gridTemplateColumns: 'repeat(4, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(3, minmax(0%, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(3, minmax(0%, 1fr))',
      gap: '50px',
      padding: '50px',
    },
  },
});
