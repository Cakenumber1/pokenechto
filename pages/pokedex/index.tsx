import withAuth from 'components/HOCs/withAuthHOC';
import ProfileContainer from 'components/Pokedex/ProfileContainer';
import { NextPage } from 'next';

const Home: NextPage = () => (<ProfileContainer />
);

export default withAuth(Home);
