import type { NextPage } from 'next'
import { useAuth } from '../firebase/AuthContext';

const Home: NextPage = () => {
  const {login, currentUser}: any = useAuth()
  console.log(login('asd@mail.ru', 'asddsds12'))
  console.log(currentUser)
  return (
    <div>1</div>
  )
}

export default Home;
