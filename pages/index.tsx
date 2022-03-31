import BackgroundComponent from 'components/BackgroundComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import HomeContainer from 'components/Home/HomeContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BackgroundComponent><HomeContainer /></BackgroundComponent>
);

export default withAuth(Home);
