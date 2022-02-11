import type { NextPage } from 'next'
import { useAuth } from '../firebase/AuthContext';
import { ActiveLink } from '../helpers';
import ModalComponent from '../components/Modal/';

const Home: NextPage = () => {
  const {login, currentUser}: any = useAuth()
  console.log(login('asd@mail.ru', 'asddsds12'))
  console.log(currentUser)
  return (
    <div>
      <ActiveLink href={'/somepage'}>Go Shopping</ActiveLink>
      <ModalComponent pokemon={undefined}/>
    </div>
  )
}

export default Home
