import type { NextPage } from 'next';

import { useAuth } from '../firebase/AuthContext';

const Home: NextPage = () => {
  const { login, currentUser }: any = useAuth();
  // eslint-disable-next-line no-console
  console.log(login('asd@mail.ru', 'asddsds12'));
  // eslint-disable-next-line no-console
  console.log(currentUser);
  return (
    <div>1</div>
  );
};

export default Home;
