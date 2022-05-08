import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';

import { useStyles } from './style';

type Props = {
  handlePage: () => void,
};

const LoginComponent: React.FC<Props> = ({ handlePage }) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { login, currentUser } = useAuth()!;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(mail, pass)
      .catch((e: any) => {
        console.log(e);
        setError(e);
        setTimeout(() => {
          setError(null);
        }, 12000);
      });
  };
  return (
    <Box className={classes.box}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={mail}
          onChange={(event) => setMail(String(event.target.value))}
        />
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
          disabled={!mail.length || !pass.length}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Button type="button" onClick={handlePage}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default LoginComponent;
