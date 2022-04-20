import withAuth from 'components/HOCs/withAuthHOC';
import HomeContainer from 'components/Home/HomeContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <HomeContainer />
);

export default withAuth(Home);
