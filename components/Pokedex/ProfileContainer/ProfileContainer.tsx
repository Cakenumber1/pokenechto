import ProfileComponent from 'components/Pokedex/ProfileComponent';
import { UserType } from 'interfaces/userType';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useEffect, useState } from 'react';

import { useStyles } from '../style';

const getData = async (uid: string, setWho: React.Dispatch<any>) => {
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    setWho(res.data());
  }
  return null;
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
