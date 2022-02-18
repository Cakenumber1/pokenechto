import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';

export const InventoryLoader = ({ open }: any) => {
  return (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  );
};
