import { Badge, Box, Button } from '@mui/material';
// import axios from 'axios';
import HomePokedexLinkComponent from 'components/Home/HomePokedexLinkComponent';
import { useStyles } from 'components/Home/style';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
// import firebase from 'firebase';
// import { parseResponsePokemon } from 'helpers';
// import { Pokemon } from 'interfaces/';
// import { db } from 'myFirebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import arenaImg from 'public/arena.png';
import mailImg from 'public/mail.png';
import shopImg from 'public/shop.png';
import React, { useEffect, useState } from 'react';

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

// const getInventory = async () => {
//   const arr: any[] = [];
//   await db.collection('users').doc(firebase.auth().currentUser!.uid).collection('inventory')
//     .orderBy('name')
//     .get()
//     .then((querySnapshot: any) => {
//       querySnapshot.forEach((doc: any) => {
//         arr.push({ collectionId: doc.id, ...doc.data() });
//       });
//     });
//   return arr;
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

const getData = async (uid: string, setMails: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('mails')
    .where('unread', '==', true)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push(doc.id);
      });
    });
  if (ans && ans.length) {
    setMails(ans.length);
  }
};

type Props = {
  logout: any,
};

const HomeComponent: React.FC<Props> = ({ logout }) => {
  const { currentUser } = useAuth()!;
  const [newmails, setNewMails] = useState<number>();
  const classes = useStyles();

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('mails')
      .onSnapshot(() => getData(currentUser.uid, setNewMails));
  }, []);

  return (
    <Box style={{ height: '100%' }}>
      <Box
        className={classes.buildings}
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Box className={classes.link}>
            <Box className={classes.mailbox}>
              <Link href="/mail">
                <Badge sx={{ right: 13, top: 20 }} badgeContent={newmails} overlap="circular" color="error">
                  <Image
                    src={mailImg}
                    alt="mail"
                  />
                </Badge>
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
            >Logout
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
      <HomePokedexLinkComponent />
    </Box>
  );
};

export default HomeComponent;
