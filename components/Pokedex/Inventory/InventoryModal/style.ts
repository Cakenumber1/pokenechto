import { linearProgressClasses } from '@mui/material';

export const style = {
  modalBox: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '20px',
    border: '5px solid #4fc3f7',
    backgroundColor: 'rgba(22,22,22,0.8)',
    color: 'white',
    textAlign: 'center',
    overflow: 'auto',
  },
  modalImg: ({ background }: { background: string }) => ({
    background,
    height: '30%',
    borderRadius: '10px',
    padding: '10px',
  }),
  modalStatProgress: ({ backgroundColor }: { backgroundColor:string }) => ({
    width: '100%',
    height: 15,
    marginBottom: 0.5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: 'black',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor,
    },
  }),
};
