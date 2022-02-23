import { Button, Grid } from '@mui/material';
import { FrameComponent } from 'components/Common/FrameComponent';
import { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => (
  <FrameComponent>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="success"
        >Logout
        </Button>
      </Grid>
    </Grid>
  </FrameComponent>
);

export default Home;
