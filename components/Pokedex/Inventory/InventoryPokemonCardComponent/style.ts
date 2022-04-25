export const style = {
  inventoryPokemonCard: ({ background }: { background: string }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background,
  }),
  inventoryPokemonCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '5px',
  },
};
