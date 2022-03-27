import {
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';

type Props = {
  mail: string,
  setMail: React.Dispatch<React.SetStateAction<string>>,
  pass: string,
  setPass: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
};

const RegisterDataComponent: React.FC<Props> = ({
  mail,
  setMail,
  pass,
  setPass,
  name,
  setName,
}) => (
  <Grid container>
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
    <Grid item xs={12}>
      <TextField
        margin="normal"
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="name"
        label="Name"
        autoFocus
        value={name}
        onChange={(event) => setName(String(event.target.value))}
      />
    </Grid>
  </Grid>
);

export default RegisterDataComponent;
