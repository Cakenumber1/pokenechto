import withAuth from 'components/HOCs/withAuthHOC';
import ProfileContainer from 'components/Pokedex/Profile/ProfileContainer';
import { NextPage } from 'next';

const Home: NextPage = () => (<ProfileContainer />
);

export default withAuth(Home);
