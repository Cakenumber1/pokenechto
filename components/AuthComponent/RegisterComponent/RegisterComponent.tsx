import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'firebase/AuthContext';
import React, { useState } from 'react';

type Props = {
  handlePage: () => void,
};

const SignUp: React.FC<Props> = ({ handlePage }) => {
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const { currentUser, signup } = useAuth()!;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    signup(mail, pass)
      .then(() => {
        // @ts-ignore
        currentUser!.updateProfile({ displayName: `${name} ${name2}` });
      })
      .catch((e: any) => {
        console.log(e);
        setError(e);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100%' }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
                autoFocus
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
          <div style={{ display: error, color: 'red' }}>{error?.message}</div>
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
    </Container>
  );
};

export default SignUp;
