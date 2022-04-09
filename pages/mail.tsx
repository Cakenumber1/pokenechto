import BackgroundComponent from 'components/BackgroundComponent';
import BuildingContainer from 'components/Buildings/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import MailContainer from 'components/Mailbox/MailContainer';
import type { NextPage } from 'next';

const Mail: NextPage = () => (
  <BackgroundComponent>
    <BuildingContainer>
      <MailContainer />
    </BuildingContainer>
  </BackgroundComponent>
);

export default withAuth(Mail);
