import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import React from 'react';

type Props = {
  handlePage: () => void,
  error: any,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  classes: ClassNameMap,
  mail: string,
  setMail: React.Dispatch<React.SetStateAction<string>>,
  pass: string,
  setPass: React.Dispatch<React.SetStateAction<string>>,
};

const LoginComponent: React.FC<Props> = ({
  handlePage,
  error,
  handleSubmit,
  classes,
  mail,
  setMail,
  pass,
  setPass,
}) => (
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
export default LoginComponent;
