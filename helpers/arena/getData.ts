import { countStats, getFromPokeApi, parseResponseOpponent } from 'helpers/';
import { Opponent } from 'interfaces/pokemonType';
import { db } from 'myFirebase/firebase';
import React from 'react';

const addBots = async (links: string[], power: number, arr: Opponent[]) => {
  const pokemons = await Promise.all(
    links.map((link: any) => getFromPokeApi(link)),
  );
  for (let i = 0; i < links.length; i++) {
    const t = parseResponseOpponent(pokemons[i]);
    const p = (countStats(t.poke).power);
    if (power / p > 1.2) {
      // eslint-disable-next-line operator-assignment
      t.poke.exp = Math.ceil((Math.random() * 10 * (power / p)) * t.poke.exp);
    }
    arr.push(t);
  }
  return arr;
};

export const getData = async (
  uid: string,
  setData: React.Dispatch<any>,
  setMe: React.Dispatch<any>,
  opponents?: Opponent[],
) => {
  let ans: Opponent[] = [];
  let rating = 0;
  let poke = {};
  let power = 0;
  let mail = '';
  await db.collection('users').doc(uid).collection('inventory').where('main', '==', true)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        poke = doc.data();
      });
    });
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    rating = res.data().rating;
    power = countStats(poke).power;
    setMe({ ...res.data(), mainPoke: poke });
    mail = res.data().mail;
  }
  await db
    .collection('users')
    .where('rating', '>=', -1.1 * rating)
    .where('rating', '<=', 1.1 * rating)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        if (doc.data().mail !== mail) {
          if (!opponents
            || (opponents[0].mail !== doc.data().mail
              && opponents[1].mail !== doc.data().mail
              && opponents[2].mail !== doc.data().mail)
          ) {
            db.collection('users').doc(doc.id).collection('inventory').where('main', '==', true)
              .get()
              .then((querySnapshot2: any) => {
                querySnapshot2.forEach((doc2: any) => {
                  ans.push({ mail: doc.data().mail, poke: doc2, name: doc.data().name });
                });
              });
          }
        }
      });
    });
  const links: string[] = [];
  for (let i = 0; i < 3 - ans.length; i++) {
    links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
  }
  if (links.length) ans = await addBots(links, power, ans);
  if (ans && ans.length) {
    setData(ans);
  }
};
