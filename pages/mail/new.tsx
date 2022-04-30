import BuildingContainer from 'components/Building/BuildingContainer';
import withAuth from 'components/HOCs/withAuthHOC';
import MailNewComponent from 'components/Mailbox/MailComponent/MailNew';
import MailContainer from 'components/Mailbox/MailContainer';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <BuildingContainer>
    <MailContainer>
      <MailNewComponent />
    </MailContainer>
  </BuildingContainer>
);

export default withAuth(Home);
