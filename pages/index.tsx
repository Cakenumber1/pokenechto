import { useAuth } from 'firebase/AuthContext';
import type { NextPage } from 'next';
import OnloadOverlayComponent from 'components/HOCs/OnloadOverlayComponent';
import HomeComponent from 'components/Home/HomeComponent';

const Home: NextPage = () => {
  const { login, currentUser }: any = useAuth();
  console.log(login('asd@mail.ru', 'asddsds12'));
  console.log(currentUser);
  return (
    <OnloadOverlayComponent component={HomeComponent} />
  );
};

export default Home;
