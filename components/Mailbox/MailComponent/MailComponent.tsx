import {
  Box, Button, Container, Rating,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import Link from 'next/link';
import React from 'react';

type Props = {
  classes: ClassNameMap,
};

const MailComponent: React.FC<Props> = ({ classes }) => (
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
    <Box className={classes.shopBody}>
      <Container className={classes.shopBodyInner} sx={{ border: 2, borderRadius: 1 }}>
        <Box className={classes.shopTop}>
          <Box className={classes.shopTopText}>
            <Box className={classes.shopText}>Лучшее предложение</Box>
            <Rating name="read-only" value={5} style={{ fontSize: '2vmax' }} readOnly />
          </Box>
        </Box>
        <Box className={classes.shopShelves}>
          <Box className={classes.shopShelvesText}>Заявление1</Box>
        </Box>
        <Box className={classes.shopShelves}>
          <Box className={classes.shopShelvesText}>Заявление2</Box>
        </Box>
      </Container>
    </Box>
  </Container>
);

export default MailComponent;
