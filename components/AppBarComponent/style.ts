export const style = (isInscription: boolean) => (
  {
    exit: {
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px',
      cursor: 'pointer',
    },
    inscription: {
      display: isInscription ? 'visible' : 'none',
    },
  }
);
