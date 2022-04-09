import ArenaContainer from 'components/Arena/ArenaContainer';
import BackgroundComponent from 'components/BackgroundComponent';
import BuildingContainer from 'components/Buildings/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import type { NextPage } from 'next';

const Arena: NextPage = () => (
  <BackgroundComponent>
    <BuildingContainer>
      <ArenaContainer />
    </BuildingContainer>
  </BackgroundComponent>
);

export default withAuth(Arena);
