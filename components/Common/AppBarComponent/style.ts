export const style = (isInscription: boolean) => (
  {
    logo: {
      width: '50px',
      height: '50px',
    },
    inscription: {
      display: isInscription ? 'visible' : 'none',
    },
  }
);
