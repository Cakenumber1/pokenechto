import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import PokedexLinkComponent from 'components/Home/PokedexLinkComponent';
import WalletComponent from 'components/WalletComponent';
import firebase from 'firebase';
import { parseResponsePokemon } from 'helpers';
import { Pokemon } from 'interfaces/';
import { db } from 'myFirebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import pokedexImg from 'public/pokedex.png';
import shopImg from 'public/shop.png';

function clearCollection(path: string) {
  db.collection(path)
    .get()
    .then((res: any) => {
      res.forEach((element: any) => {
        element.ref.delete();
      });
    });
}

export async function getFromPokeApi(path: string) {
  return axios.get(path)
    .then((res) => res.data)
    .catch(console.error);
}

export async function getListFromPokeApi(links: string[]) {
  const pokemons = await Promise.all(
    links.map((link: any) => getFromPokeApi(link)),
  );
  const temp = [];
  for (let i = 0; i < links.length; i++) {
    temp.push(parseResponsePokemon(pokemons[i]));
  }
  return temp;
}

async function getSize(path: string) {
  return db.collection(path).get().then((snap: any) => snap.size);
}

function updateShelf(path: string, pokemons: Pokemon[]) {
  let check = !!getSize(path);
  const a = setInterval(async () => {
    check = await getSize(path);
    if (!check) {
      pokemons.forEach((poke) => db.collection(path).add(poke));
      clearInterval(a);
    }
  }, 1000);
}

async function updateShop() {
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
}

const getInventory = async () => {
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

const getShopSale = async () => {
  const arr: any[] = [];
  await db.collection('shop/shelves/sale')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        arr.push({ ...doc.data() });
      });
    });
};

const HomeComponent = () => (
  <Container style={{ height: '100%' }}>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Grid item xs={1}>
        <Button
          onClick={getInventory}
          variant="contained"
          color="primary"
        >Get full invent
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          onClick={updateShop}
          variant="contained"
          color="primary"
        >Update shop
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          onClick={getShopSale}
          variant="contained"
          color="primary"
        >Get shop
        </Button>
      </Grid>
      <Grid item xs={1} sx={{ cursor: 'pointer' }}>
        <Link href="/shop">
          <Image
            src={shopImg}
            alt="as"
            width={200}
            height={200}
          />
        </Link>
      </Grid>
      <Grid item xs={1} sx={{ cursor: 'pointer' }}>
        <Button
          onClick={getShopSale}
          variant="contained"
          color="primary"
          disabled
        >Arena
        </Button>
      </Grid>
    </Grid>

    <PokedexLinkComponent />
    <WalletComponent />
  </Container>
);

export default HomeComponent;
