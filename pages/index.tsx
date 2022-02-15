import WalletComponent from 'components/Shop/WalletComponent';
import { useAuth } from 'firebase/AuthContext';
import { ActiveLink } from 'helpers';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { login, currentUser }: any = useAuth();
  console.log(login('asd@mail.ru', 'asddsds12'));
  console.log(currentUser);
  return (
    <div style={{ height: '100%' }}>
      <ActiveLink href="/somepage">Go Shopping</ActiveLink>
      <WalletComponent money={1000} mushrooms={100} />
    </div>
  );
};

export default Home;
