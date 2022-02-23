import { Button, Grid } from '@mui/material';
import { FrameComponent } from 'components/Common/FrameComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import { useAuth } from 'firebase/AuthContext';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  const { logout } = useAuth()!;
  return (
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
            onClick={logout}
            variant="contained"
            color="success"
          >Logout
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Link href="/" passHref>
            <Button
              variant="contained"
              color="primary"
            >Выход на начальный экран
            </Button>
          </Link>
        </Grid>
      </Grid>
    </FrameComponent>
  );
};

export default withAuth(Home);
