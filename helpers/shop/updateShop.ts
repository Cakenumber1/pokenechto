import axios from 'axios';
import firebase from 'firebase';
import { parseResponsePokemon } from 'helpers';
import { Pokemon } from 'interfaces/pokemonType';
import { db } from 'myFirebase/firebase';

export const clearCollection = (path: string) => {
  db.collection(path)
    .get()
    .then((res: any) => {
      res.forEach((element: any) => {
        element.ref.delete();
      });
    });
};

export const getFromPokeApi = async (path: string) => {
  return axios.get(path)
    .then((res) => res.data)
    .catch(console.error);
};

export const getListFromPokeApi = async (links: string[]) => {
  const pokemons = await Promise.all(
    links.map((link: any) => getFromPokeApi(link)),
  );
  const temp = [];
  for (let i = 0; i < links.length; i++) {
    temp.push(parseResponsePokemon(pokemons[i]));
  }
  return temp;
};

export const getSize = async (path: string) => {
  return db.collection(path).get().then((snap: any) => snap.size);
};

export const updateShelf = (path: string, pokemons: Pokemon[]) => {
  let check = !!getSize(path);
  const a = setInterval(async () => {
    check = await getSize(path);
    if (!check) {
      pokemons.forEach((poke) => db.collection(path).add(poke));
      clearInterval(a);
    }
  }, 1000);
};

export const updateShop = async () => {
  const shopShelvesPath = 'shop/shelves/';
  const salePath = `${shopShelvesPath}sale`;
  const shelfPath = `${shopShelvesPath}shelf`;
  const shelfPersonalPath = `users/${firebase.auth().currentUser!.uid}/personalShop`;
  const path: string[] = [salePath, shelfPath, shelfPersonalPath];
  const links: string[] = [];
  for (let i = 0; i < 9; i++) {
    links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
  }
  const pokes = await getListFromPokeApi(links);
  for (let i = 0; i < 3; i++) {
    clearCollection(path[i]);
    updateShelf(path[i], pokes.slice(i * 3, (i + 1) * 3));
  }
};
export const generatePersonalShop = async (uid: string) => {
  const path = `users/${uid}/personalShop`;
  const links: string[] = [];
  for (let i = 0; i < 3; i++) {
    links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
  }
  const pokes = await getListFromPokeApi(links);
  console.log(path);
  pokes.forEach((poke) => db.collection(path).add(poke));
};

export const getInventory = async () => {
  const arr: any[] = [];
  const map = new Map();
  await db.collection('users').doc(firebase.auth().currentUser!.uid).collection('inventory')
    .orderBy('name')
    .limit(12)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        arr.push({ colletctionID: doc.id, ...doc.data() });
        map.set(doc.id, doc.data());
      });
    });
};

export const getShopSale = async () => {
  const arr: any[] = [];
  await db.collection('shop/shelves/sale')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        arr.push({ ...doc.data() });
      });
    });
};

