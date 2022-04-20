import BuildingContainer from 'components/Buildings/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import MailHomeComponent from 'components/Mailbox/MailComponent/MailHome/MailHomeComponent';
import MailContainer from 'components/Mailbox/MailContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BuildingContainer>
    <MailContainer>
      <MailHomeComponent />
    </MailContainer>
  </BuildingContainer>
);

export default withAuth(Home);
