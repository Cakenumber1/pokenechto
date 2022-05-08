import {
  Box, Button, Grid,
  Typography,
} from '@mui/material';
import { ClassNameMap, ThemeProvider } from '@mui/styles';
import RegisterDataComponent from 'components/Auth/Register/RegisterComponent/RegisterDataComponent';
import RegisterPokeComponent from 'components/Auth/Register/RegisterComponent/RegisterPokeComponent';
import { PokemonIni } from 'interfaces/pokemonType';
import React from 'react';
import { theme } from 'theme/index';

type Props = {
  initialPokes: PokemonIni[]
  handlePage: () => void,
  classes: ClassNameMap,
  mail: string,
  setMail: React.Dispatch<React.SetStateAction<string>>,
  pass: string,
  setPass: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  slide: any,
  setSlide: React.Dispatch<React.SetStateAction<any>>,
  error: any,
  handleSubmit: (e :React.FormEvent<HTMLFormElement>) => Promise<void>
};

const RegisterComponent: React.FC<Props> = ({
  initialPokes,
  handlePage,
  classes,
  mail,
  setMail,
  pass,
  setPass,
  name,
  setName,
  slide,
  setSlide,
  error,
  handleSubmit,
}) => (
  <Box className={classes.box}>
    <Typography component="h1" variant="h5" sx={{ pt: '5%' }}>
      Sign up
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <RegisterDataComponent
        mail={mail}
        setMail={setMail}
        pass={pass}
        name={name}
        setName={setName}
        setPass={setPass}
      />
      <ThemeProvider theme={theme}>
        <RegisterPokeComponent
          initialPokes={initialPokes}
          slide={slide}
          setSlide={setSlide}
        />
      </ThemeProvider>
      <Box
        sx={{
          display: error,
        }}
        className={classes.error}
      >{error?.message}
      </Box>
      <Button
        disabled={!mail.length || !pass.length || !name.length}
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

export default RegisterComponent;
