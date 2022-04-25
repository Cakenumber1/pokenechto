export const style = {
  inventory: {
    height: '100%',
    display: 'grid',
    '@media (min-width: 0px)': {
      gridTemplateColumns: 'repeat(2, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(6, minmax(0%, 1fr))',
      gap: '10px',
      padding: '10px',
      paddingBottom: '50px',
    },
    '@media (min-width: 568px)': {
      gridTemplateColumns: 'repeat(3, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(4, minmax(0%, 1fr))',
      gap: '20px',
      padding: '20px',
      paddingBottom: '50px',
    },
    '@media (orientation: landscape) and (min-width: 568px)': {
      gridTemplateColumns: 'repeat(4, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(3, minmax(0%, 1fr))',
      gap: '20px',
      padding: '20px',
      paddingBottom: '50px',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, minmax(0%, 1fr))',
      gridTemplateRows: 'repeat(3, minmax(0%, 1fr))',
      gap: '50px',
      padding: '50px',
    },
  },
};
