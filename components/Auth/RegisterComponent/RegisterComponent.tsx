import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import firebase from 'firebase';
import pokemonsTemp from 'mocks/starter.json';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';

import { useStyles } from './style';

type Props = {
  handlePage: () => void,
};

function create(user: any, name: string) {
  const db = firebase.firestore();
  db.collection('users').doc(user.uid).set({
    name,
    photoUrl: 'https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c',
  });
  pokemonsTemp.forEach((poke) => {
    db.collection('users').doc(user.uid).collection('inventory').add(poke);
  });
}

const SignUp: React.FC<Props> = ({ handlePage }) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const { currentUser, signup, logout } = useAuth()!;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout();
    await signup(mail, pass)
      .then(() => {
        create(firebase.auth().currentUser, `${name} ${name2}`);
      })
      .catch((e: any) => {
        setError(e);
        setTimeout(() => {
          setError(null);
        }, 12000);
      });
  };

  return (
    <Box className={classes.box}>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={name}
              onChange={(event) => setName(String(event.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={name2}
              onChange={(event) => setName2(String(event.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={mail}
              onChange={(event) => setMail(String(event.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              onChange={(event) => setPass(String(event.target.value))}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: error,
          }}
          className={classes.error}
        >{error?.message}
        </Box>
        {currentUser && !currentUser?.emailVerified && (
          <Box className={classes.verify}>Verify your email {currentUser?.email}
          </Box>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button type="button" onClick={handlePage}>
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
