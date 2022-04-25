import ArenaContainer from 'components/Arena/ArenaContainer';
import BuildingContainer from 'components/Building/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import type { NextPage } from 'next';

const Arena: NextPage = () => (
  <BuildingContainer>
    <ArenaContainer />
  </BuildingContainer>
);

export default withAuth(Arena);
