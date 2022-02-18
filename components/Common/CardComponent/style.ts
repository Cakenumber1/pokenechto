export const style = {
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    aspectRatio: '2 / 3',
  },
  pokeImg: {
    width: '85%',
    margin: 'auto',
    height: '100%',
    paddingBottom: '3%',
    objectFit: 'contain',
  },
  pokeName: (isSize: boolean): any => (isSize ? {
    textAlign: 'center',
    variant: 'h6',
  } : {
    textAlign: 'left',
    variant: 'body2',
  })
  ,
};
