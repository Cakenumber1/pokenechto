import { ThemeProvider } from '@mui/styles';
import HomeComponent from 'components/Home/HomeComponent';
import { useAuth } from 'myFirebase/AuthContext';
import { theme } from 'theme/index';

const HomeContainer = () => {
  const { logout } = useAuth()!;
  return (
    <ThemeProvider theme={theme}>
      <HomeComponent logout={logout} />
    </ThemeProvider>
  );
};

export default HomeContainer;
