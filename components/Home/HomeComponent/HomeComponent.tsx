import { Box, Button } from '@mui/material';
// import axios from 'axios';
import PokedexLinkComponent from 'components/Home/PokedexLinkComponent';
import { useStyles } from 'components/Home/style';
import WalletComponent from 'components/WalletComponent';
// import firebase from 'firebase';
// import { parseResponsePokemon } from 'helpers';
// import { Pokemon } from 'interfaces/';
// import { db } from 'myFirebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import arenaImg from 'public/arena.png';
import mailImg from 'public/mail.png';
import shopImg from 'public/shop.png';
import React from 'react';

// function clearCollection(path: string) {
//   db.collection(path)
//     .get()
//     .then((res: any) => {
//       res.forEach((element: any) => {
//         element.ref.delete();
//       });
//     });
// }

// export async function getFromPokeApi(path: string) {
//   return axios.get(path)
//     .then((res) => res.data)
//     .catch(console.error);
// }

// export async function getListFromPokeApi(links: string[]) {
//   const pokemons = await Promise.all(
//     links.map((link: any) => getFromPokeApi(link)),
//   );
//   const temp = [];
//   for (let i = 0; i < links.length; i++) {
//     temp.push(parseResponsePokemon(pokemons[i]));
//   }
//   return temp;
// }
//
// async function getSize(path: string) {
//   return db.collection(path).get().then((snap: any) => snap.size);
// }

// function updateShelf(path: string, pokemons: Pokemon[]) {
//   let check = !!getSize(path);
//   const a = setInterval(async () => {
//     check = await getSize(path);
//     if (!check) {
//       pokemons.forEach((poke) => db.collection(path).add(poke));
//       clearInterval(a);
//     }
//   }, 1000);
// }

// async function updateShop() {
//   const shopShelvesPath = 'shop/shelves/';
//   const salePath = `${shopShelvesPath}sale`;
//   const shelfPath = `${shopShelvesPath}shelf`;
//   const shelfPersonalPath = `users/${firebase.auth().currentUser!.uid}/personalShop`;
//   const path: string[] = [salePath, shelfPath, shelfPersonalPath];
//   const links: string[] = [];
//   for (let i = 0; i < 9; i++) {
//     links.push(`https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * 300)}`);
//   }
//   const pokes = await getListFromPokeApi(links);
//   for (let i = 0; i < 3; i++) {
//     clearCollection(path[i]);
//     updateShelf(path[i], pokes.slice(i * 3, (i + 1) * 3));
//   }
// }

// const getInventory = async (setArr: React.Dispatch<any>, uid: string) => {
//   const res = await db.collection('users').doc(uid).collection('inventory')
//     .orderBy('name')
//     .limit(12)
//     .get();
//   if (res.exists) {
//     const data = res.data();
//     setArr(data);
//   }
// };

// const getShopSale = async () => {
//   const arr: any[] = [];
//   await db.collection('shop/shelves/sale')
//     .get()
//     .then((querySnapshot: any) => {
//       querySnapshot.forEach((doc: any) => {
//         arr.push({ ...doc.data() });
//       });
//     });
// };
// updateShop();
// getShopSale();

type Props = {
  logout: any,
};

const HomeComponent: React.FC<Props> = ({ logout }) => {
  const classes = useStyles();
  return (
    <Box style={{ height: '100%' }}>
      <Box
        className={classes.buildings}
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Box className={classes.link}>
            <Box className={classes.mailbox}>
              <Link href="/mail">
                <Image
                  src={mailImg}
                  alt="mail"
                />
              </Link>
            </Box>
          </Box>
          <Box
            className={classes.link}
            style={{ paddingBottom: '3%', paddingTop: '15vh' }}
          >
            <Button
              onClick={logout}
              variant="contained"
              color="primary"
            >Exit
            </Button>
          </Box>
        </Box>
        <Box className={classes.link} style={{ paddingBottom: '33vh' }}>
          <Box
            className={classes.imagebox}
          >
            <Link href="/arena">
              <Image
                src={arenaImg}
                alt="arena"
                className={classes.image}
              />
            </Link>
          </Box>
        </Box>
        <Box className={classes.link} style={{ paddingBottom: '15vh' }}>
          <Box
            className={classes.imagebox}
          >
            <Link href="/shop">
              <Image
                src={shopImg}
                alt="shop"
                className={classes.image}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <PokedexLinkComponent />
      <WalletComponent />
    </Box>
  );
};

export default HomeComponent;