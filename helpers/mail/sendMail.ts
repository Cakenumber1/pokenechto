import firebase from 'firebase';
import { MailType } from 'interfaces/apiTypes';
import { db } from 'myFirebase/firebase';

export const registerMail = async (
  data: MailType,
) => {
  const {
    fromMail, to, toMail,
    text, money = 0, berries = 0, poke = null,
  } = data;
  await db
    .collection('users')
    .doc(to)
    .collection('mails')
    .add({
      from: fromMail,
      to: toMail,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      text,
      money,
      berries,
      poke,
      unread: true,
    });
  return 1;
};
