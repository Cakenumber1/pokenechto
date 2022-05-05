import firebase from 'firebase';
import { getFromPokeApi, parseResponsePokemon } from 'helpers';
import { generatePokemonForShop } from 'helpers/adaptors/generatePokemonForShop';
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

export const getListFromPokeApi = async (links: string[]) => {
  const pokemons = await Promise.all(
    links.map((link: any) => getFromPokeApi(link)),
  );
  const temp = [];
  for (let i = 0; i < links.length; i++) {
    temp.push(generatePokemonForShop(parseResponsePokemon(pokemons[i])));
  }
  return temp;
};

export const getPureListFromPokeApi = async (links: string[]) => {
  const pokemons = await Promise.all(
    links.map((link: any) => getFromPokeApi(link)),
  );
  const temp = [];
  for (let i = 0; i < links.length; i++) {
    temp.push(parseResponsePokemon(pokemons[i]));
  }
  return temp;
};

export const getSize = async (path: string) => db.collection(path)
  .get()
  .then((snap: any) => snap.size);

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
  const users: string[] = [];
  await db.collection('users')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        users.push(doc.id);
      });
    });
  const shelfPersonalPaths: string[] = [];
  users.forEach((u) => { shelfPersonalPaths.push(`users/${u}/personalShop`); });
  const paths: string[] = [salePath, shelfPath, ...shelfPersonalPaths];
  const links: string[] = [];
  for (let i = 0; i < paths.length * 3; i++) {
    links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
  }
  const pokes = await getListFromPokeApi(links);
  for (let i = 0; i < paths.length; i++) {
    clearCollection(paths[i]);
    updateShelf(paths[i], pokes.slice(i * 3, (i + 1) * 3));
  }
  const t = new Date();
  t.setHours(t.getHours() + 12);
  db.collection('shop').doc('shelves').set({ update: firebase.firestore.Timestamp.fromDate(t) });
};
export const generatePersonalShop = async (uid: string) => {
  const path = `users/${uid}/personalShop`;
  const links: string[] = [];
  for (let i = 0; i < 3; i++) {
    links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
  }
  let pokes: Pokemon[] = [];
  try {
    pokes = await getPureListFromPokeApi(links);
  } catch (e) {
    pokes = await getPureListFromPokeApi(links);
  }
  const a = setInterval(async () => {
    pokes.forEach((poke) => db.collection(path).add(poke));
    clearInterval(a);
  }, 1000);
  try {
    pokes.forEach((poke) => db.collection(path).add(poke));
  } catch (e) {
    console.log(e);
  }
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
        arr.push({ collectionId: doc.id, ...doc.data() });
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
