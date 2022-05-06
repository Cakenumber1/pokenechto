import ProfileComponent from 'components/Pokedex/Profile/ProfileComponent';
import { UserType } from 'interfaces/userType';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useEffect, useState } from 'react';

import { useStyles } from '../style';

const getData = async (uid: string, setWho: React.Dispatch<any>) => {
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    await db.collection('users').doc(uid).collection('inventory').where('main', '==', true)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          setWho({ ...res.data(), mainPoke: doc.data() });
        });
      });
  }
};

const ProfileContainer = () => {
  const { currentUser } = useAuth()!;
  const [who, setWho] = useState<UserType>();
  const classes = useStyles();

  useEffect(() => {
    getData(currentUser.uid, setWho);
  }, [currentUser.uid]);

  return (
    <ProfileComponent classes={classes} who={who} />
  );
};

export default ProfileContainer;
