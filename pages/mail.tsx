import BackgroundComponent from 'components/BackgroundComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import MailContainer from 'components/Mailbox/MailContainer';
import type { NextPage } from 'next';

const Shop: NextPage = () => (<BackgroundComponent><MailContainer /></BackgroundComponent>);

export default withAuth(Shop);
