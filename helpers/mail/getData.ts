import { db } from 'myFirebase/firebase';
import React from 'react';
import firebase from 'firebase';

export const getNewMails = async (uid: string, setMails: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('mails')
    .orderBy('date', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push({ mailId: doc.id, ...doc.data() });
      });
    });
  if (ans && ans.length) {
    setMails(ans);
  }
};

export const getUnreadMails = async (uid: string, setMails: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('mails')
    .where('unread', '==', true)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push({ mailId: doc.id, ...doc.data() });
      });
    });
  if (ans && ans.length) {
    setMails(ans);
  }
};

export const getPokes = async (uid: string, setPokes: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('inventory')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        if (!('main' in doc.data())) {
          ans.push({ ...doc.data(), invId: doc.id });
        }
      });
    });
  if (ans && ans.length) {
    setPokes(ans);
  }
};

export const setMain = async (uid: string, pid: string) => {
  await db.collection('users').doc(uid).collection('inventory').where('main', '==', true)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        doc.ref.update({ main: firebase.firestore.FieldValue.delete() });
      });
    });
  await db
    .collection('users')
    .doc(uid)
    .collection('inventory')
    .doc(pid)
    .update({ main: true });
};
