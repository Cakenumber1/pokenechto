import withAuth from 'components/HOCs/withAuthHOC';
import HomeComponent from 'components/Home';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <HomeComponent />
);

export default withAuth(Home);
