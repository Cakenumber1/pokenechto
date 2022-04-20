import BuildingContainer from 'components/Buildings/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import ShopContainer from 'components/Shop/Main/ShopContainer';
import type { NextPage } from 'next';

const Shop: NextPage = () => (
  <BuildingContainer>
    <ShopContainer />
  </BuildingContainer>
);

export default withAuth(Shop);
