import withOverlay from 'components/HOCs/OnloadOverlayComponent';
import HomeComponent from 'components/Home';
import { useAuth } from 'firebase/AuthContext';
import type { NextPage } from 'next';

const OnloadOverlayComponent = withOverlay(HomeComponent);

const Home: NextPage = () => {
  const { login, currentUser }: any = useAuth();
  console.log(login('asd@mail.ru', 'asddsds12'));
  console.log(currentUser);
  return (
    <OnloadOverlayComponent />
  );
};

export default Home;
