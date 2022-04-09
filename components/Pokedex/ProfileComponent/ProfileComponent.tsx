import {
  Avatar, Box, Container, Grid, Typography,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import FrameComponent from 'components/FrameComponent';
import { stringAvatar } from 'helpers';
import { UserType } from 'interfaces/userType';
import React from 'react';

type Props = {
  classes: ClassNameMap,
  who: UserType | undefined,
};

const ProfileComponent: React.FC<Props> = ({ classes, who }) => (
  <FrameComponent>
    {who ? (
      <Container className={classes.qwe}>
        <Box className="User">
          <Avatar {...stringAvatar(who.name)} />
          <Typography>{who.name}</Typography>
          <Typography>{who.mail}</Typography>
        </Box>
        <Box className="Values">
          123
        </Box>
        <Grid
          container
          spacing={2}
          columns={{ sm: 1, md: 1, lg: 2 }}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Grid item>
            <div>{JSON.stringify(who.name)}</div>
          </Grid>
          <Grid item>
            <div>{JSON.stringify(who.mail)}</div>
          </Grid>
        </Grid>
      </Container>
    ) : <>loading</>}
  </FrameComponent>
);

export default ProfileComponent;
