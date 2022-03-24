import BackgroundComponent from 'components/BackgroundComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import ShopContainer from 'components/Shop/Main/ShopContainer';
import type { NextPage } from 'next';

const Shop: NextPage = () => (<BackgroundComponent><ShopContainer /></BackgroundComponent>);

export default withAuth(Shop);
