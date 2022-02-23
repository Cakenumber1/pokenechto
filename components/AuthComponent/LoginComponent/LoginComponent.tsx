import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'firebase/AuthContext';
import React, { useState } from 'react';

type Props = {
  handlePage: () => void,
};

const LoginComponent: React.FC<Props> = ({ handlePage }) => {
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth()!;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    login(mail, pass)
      .catch((e : any) => {
        console.log(e);
        setError(e);
        setTimeout(() => { setError(null); }, 12000);
      });
  };
  return (
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
        <div style={{
          display: error,
          color: 'red',
          position: 'absolute',
          top: '10%',
          left: 0,
          width: '100%',
          padding: '2vh',
          textAlign: 'center',
        }}
        >{error?.message}
        </div>
        <Button
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
