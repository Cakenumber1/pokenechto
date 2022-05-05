import BuildingContainer from 'components/Building/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import MailContainer from 'components/Mailbox/MailContainer';
import MailHomeComponent from 'components/Mailbox/MailHome/';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BuildingContainer>
    <MailContainer>
      <MailHomeComponent />
    </MailContainer>
  </BuildingContainer>
);

export default withAuth(Home);
