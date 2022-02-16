import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  inventoryPokemonCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inventoryPokemonCard__Image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '10%',
    transition: '0.5s',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
});
