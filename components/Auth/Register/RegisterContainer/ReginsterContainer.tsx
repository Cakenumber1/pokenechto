import RegisterComponent from 'components/Auth/Register/RegisterComponent';
import firebase from 'firebase';
import initialPokes from 'mocks/initial.json';
import pokemonsTemp from 'mocks/starter.json';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';

import { useStyles } from '../style';

type Props = {
  handlePage: () => void,
};

function create(user: any, name: string) {
  const db = firebase.firestore();
  db.collection('users').doc(user.uid).set({
    name,
    photoUrl: 'https://lh3.googleusercontent.com/a/AATXAJwaJPpAFh4sWy_OSDtSHthSsHWNcV2FbkGL-ALm=s96-c',
  });
  pokemonsTemp.forEach((poke) => {
    db.collection('users').doc(user.uid).collection('inventory').add(poke);
  });
}

const RegisterContainer: React.FC<Props> = ({ handlePage }) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const { signup, logout } = useAuth()!;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout();
    await signup(mail, pass)
      .then(() => {
        create(firebase.auth().currentUser, `${name}`);
      })
      .catch((e: any) => {
        setError(e);
        setTimeout(() => {
          setError(null);
        }, 12000);
      });
  };
  return (
    <RegisterComponent
      initialPokes={initialPokes}
      handlePage={handlePage}
      classes={classes}
      mail={mail}
      setMail={setMail}
      pass={pass}
      setPass={setPass}
      name={name}
      setName={setName}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
