import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

export const InventoryLoader = ({ open }: any) => (
  <Backdrop open={open}>
    <CircularProgress />
  </Backdrop>
);
