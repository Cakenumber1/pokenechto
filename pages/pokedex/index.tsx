import { Grid } from '@mui/material';
import FrameComponent from 'components/FrameComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

const getData = async (uid: string, setWho: React.Dispatch<any>) => {
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    setWho(res.data());
  }
  return null;
};

const Home: NextPage = () => {
  const { currentUser } = useAuth()!;
  const [who, setWho] = useState<any>();
  useEffect(() => {
    getData(currentUser.uid, setWho);
    console.log(who);
  }, []);
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
          {who && <div>{JSON.stringify(who)}</div>}
        </Grid>
      </Grid>
    </FrameComponent>
  );
};

export default withAuth(Home);
