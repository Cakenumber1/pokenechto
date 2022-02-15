import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    zIndex: '10',
    display: 'flex',
    right: 0,
    top: 0,
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    margin: 0,
    padding: 0,
  },
})

export const useModalStyles = makeStyles({
  box: {
    transition: '1s all',
    position: 'absolute',
    width: 0,
    height: 0,
    top: '50%',
    left: '50%',
    opacity: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'white',

  },
  boxExpand: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  boxInner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',

  }
})

export const useTableStyles = makeStyles({
  container: {
    zIndex: '10',
    display: 'flex',
    right: 0,
    top: 0,
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    margin: 0,
    padding: 0,
  },
  tableContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  tableRow: {
    '& td': {
      padding: 0,
    },
    '& th': {
      padding: 0
    }
  },
  tableCell: {
    padding: 0,
    textAlign: 'center'
  },
})
