import ArenaContainer from 'components/Arena/ArenaContainer';
import BackgroundComponent from 'components/BackgroundComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import type { NextPage } from 'next';

const Shop: NextPage = () => (<BackgroundComponent><ArenaContainer /></BackgroundComponent>);

export default withAuth(Shop);