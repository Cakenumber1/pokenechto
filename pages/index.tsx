import BackgroundComponent from 'components/BackgroundComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import HomeComponent from 'components/Home';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BackgroundComponent><HomeComponent /></BackgroundComponent>
);

export default withAuth(Home);
