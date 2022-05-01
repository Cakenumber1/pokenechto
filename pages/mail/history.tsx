import BuildingContainer from 'components/Building/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import MailHistoryComponent from 'components/Mailbox/MailComponent/MailHistory';
import MailContainer from 'components/Mailbox/MailContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BuildingContainer>
    <MailContainer>
      <MailHistoryComponent />
    </MailContainer>
  </BuildingContainer>
);

export default withAuth(Home);
