import { ThemeProvider } from '@mui/styles';
import HomeComponent from 'components/Home/HomeComponent';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useEffect, useState } from 'react';
import { theme } from 'theme/index';

const getData = async (uid: string, setMails: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('mails')
    .where('unread', '==', true)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push(doc.id);
      });
    });
  if (ans && ans.length) {
    setMails(ans.length);
  } else {
    setMails(null);
  }
};

const HomeContainer = () => {
  const { logout, currentUser } = useAuth()!;
  const [newmails, setNewMails] = useState<number | null>(null);

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('mails')
      .onSnapshot(() => getData(currentUser.uid, setNewMails));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HomeComponent logout={logout} newmails={newmails} />
    </ThemeProvider>
  );
};

export default HomeContainer;
