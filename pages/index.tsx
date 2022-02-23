import withOverlay from 'components/HOCs/OnloadOverlayComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import HomeComponent from 'components/Home';
import type { NextPage } from 'next';

const OnloadOverlayComponent = withOverlay(HomeComponent);

const Home: NextPage = () => (
  <OnloadOverlayComponent />
);

export default withAuth(Home);
