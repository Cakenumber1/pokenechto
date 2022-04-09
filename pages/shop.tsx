import BackgroundComponent from 'components/BackgroundComponent';
import BuildingContainer from 'components/Buildings/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import ShopContainer from 'components/Shop/Main/ShopContainer';
import type { NextPage } from 'next';

const Shop: NextPage = () => (
  <BackgroundComponent>
    <BuildingContainer>
      <ShopContainer />
    </BuildingContainer>
  </BackgroundComponent>
);

export default withAuth(Shop);
