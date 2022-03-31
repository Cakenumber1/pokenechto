import RegisterComponent from 'components/Auth/Register/RegisterComponent';
import firebase from 'firebase';
import { generatePersonalShop } from 'helpers/shop/updateShop';
import initialPokes from 'mocks/initial.json';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';

import { useStyles } from '../style';

type Props = {
  handlePage: () => void,
};

function create(user: any, name: string, slide: number) {
  const db = firebase.firestore();
  db.collection('users').doc(user.uid).set({
    name,
    registered: firebase.firestore.Timestamp.fromDate(new Date()),
    money: 1000,
    berries: 10,
    rating: 0,
    pvpTotal: 0,
    pvpWin: 0,
    mainPoke: initialPokes[slide],
    bestiary: [initialPokes[slide].id],
  });
  db.collection('users').doc(user.uid).collection('inventory').add(initialPokes[slide]);
  generatePersonalShop(user.uid);
}

const RegisterContainer: React.FC<Props> = ({ handlePage }) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [slide, setSlide] = useState<any>(null);
  const { signup, logout } = useAuth()!;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout();
    await signup(mail, pass)
      .then(() => {
        create(firebase.auth().currentUser, name, slide.activeIndex);
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
      slide={slide}
      setSlide={setSlide}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
