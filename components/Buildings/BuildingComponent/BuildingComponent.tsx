import {
  Box, Button, Container,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import WalletComponent from 'components/WalletComponent';
import Link from 'next/link';
import React from 'react';

type Props = {
  classes: ClassNameMap,
  children: JSX.Element
};

const BuildingComponent: React.FC<Props> = ({ classes, children }) => (
  <Container>
    <Link href="/">
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </Link>
    <WalletComponent />
    <Box className={classes.buildingBody}>
      <Box className={classes.buildingBodyInner} sx={{ border: 2, borderRadius: 1 }}>
        {children}
      </Box>
    </Box>
  </Container>
);

export default BuildingComponent;
