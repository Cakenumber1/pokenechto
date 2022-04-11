import { CircularProgress, Container } from '@mui/material';

const LoaderComponent = () => (
  <Container sx={{
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <CircularProgress />
  </Container>
);

export default LoaderComponent;
