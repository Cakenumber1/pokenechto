import firebase from 'firebase';
import { generatePokemonForShop } from 'helpers/adaptors/buyPokeFromShop';
import { updateShop } from 'helpers/shop/updateShop';
import {
  FromToPoke, PokemonIni, PokemonShop,
} from 'interfaces/';
import { auth, db } from 'myFirebase/firebase';

const loginAdmin = async () => {
  try {
    await auth.signInWithEmailAndPassword('admin@ss.ss', 'admin@ss.ss');
  } catch (e) {
    console.log(e);
  }
};

const patchUserInfo = async (uid: string, val: any, _key: string) => {
  const obj:any = { [_key]: val };
  db.collection('users').doc(uid).update(obj);
};

const getByPage2 = async (page: number, uid: string) => {
  const arr: any[] = [];
  await db.collection('users').doc(uid).collection('inventory')
    .orderBy('name')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        arr.push({ collectionId: doc.id, ...doc.data() });
      });
    });
  const start = (page - 1) * 12;
  const end = start + 12;
  return [arr.length, arr.slice(start, end)];
};

const getCollectionItemById2 = async (collectionId: string, uid: string) => {
  const res = await db.collection('users')
    .doc(uid)
    .collection('inventory')
    .doc(collectionId)
    .get();
  if (res.exists) {
    return res.data();
  }
  return 0;
};

const deleteCollectionItem2 = async (collectionId: string, uid: string) => {
  await db.collection('users')
    .doc(uid)
    .collection('inventory')
    .doc(collectionId)
    .delete();
};
const feedPoke = (poke: PokemonIni) => {
  const { stats } = poke;
  const grow = Math.floor(Math.random() * 10);
  stats.forEach((stat) => {
    if (stat.statVal + grow > 300) {
      // eslint-disable-next-line no-param-reassign
      stat.statVal = 300;
    } else {
      // eslint-disable-next-line no-param-reassign
      stat.statVal += grow;
    }
  });
  return stats;
};
const patchCollectionItem2 = async (collectionId: string, uid: string, diff: number) => {
  const poke = await db.collection('users')
    .doc(uid)
    .collection('inventory')
    .doc(collectionId)
    .get();
  if (poke.exists) {
    await patchUserInfo(uid, diff, 'berries');
    const newStats = feedPoke(poke.data());
    await db.collection('users')
      .doc(uid)
      .collection('inventory')
      .doc(collectionId)
      .update({ stats: newStats });
  }
};

const getUserInfo = async (uid: string) => {
  const res = await db.collection('users')
    .doc(uid)
    .get();
  if (res.exists) {
    return res.data();
  }
  return 0;
};

const getUserIDsShop = async (uid: string) => {
  const ans: string[] = [];
  await db.collection('users')
    .doc(uid)
    .collection('personalShop')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push(doc.id);
      });
    });
  if (ans && ans.length) {
    return ans;
  }
  return 0;
};

const getIDsShop = async (target: string) => {
  const ans: string[] = [];
  await db.collection('shop')
    .doc('shelves')
    .collection(target)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push(doc.id);
      });
    });
  if (ans && ans.length) {
    return ans;
  }
  return 0;
};

const getShopUpdTime = async () => {
  const res = await db.collection('shop').doc('shelves').get();
  if (res.exists) {
    return res.data().update.toDate();
  }
  return 0;
};

const getPokeByID = async (target: string, id: string) => {
  const res = await db.collection(target)
    .doc(id)
    .get();
  if (res.exists) {
    return res.data();
  }
  return 0;
};

const buyPoke = async (poke: PokemonShop, uid: string, diff: number, bestiary: Set<number>) => {
  const results: any[] = [];
  const shopShelvesPath = 'shop/shelves/';
  const salePath = `${shopShelvesPath}sale`;
  const shelfPath = `${shopShelvesPath}shelf`;
  const shelfPersonalPath = `users/${uid}/personalShop`;
  const paths = [salePath, shelfPath, shelfPersonalPath];
  for (let i = 0; i < paths.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await db.collection(paths[i])
      .doc(poke!.pid)
      .get());
  }
  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < paths.length; i++) {
    if (results[i].exists) {
      if (results[i].data().amount > 0) {
        db.collection(paths[i]).doc(poke!.pid).update({ amount: results[i].data().amount - 1 });
        // eslint-disable-next-line no-await-in-loop
        await patchUserInfo(uid, diff, 'money');
        const temp = generatePokemonForShop(poke);
        db.collection('users').doc(uid).collection('inventory').add(temp);
        bestiary.add(poke!.id);
        // eslint-disable-next-line no-await-in-loop
        await patchUserInfo(uid, Array.from(bestiary), 'bestiary');
        return 200;
      }
      return 204;
    }
  }
  return 204;
};

const sendMail = async (
  data: FromToPoke,
) => {
  const {
    from, fromMail, to, toMail,
    text, money = 0, berries = 0, poke,
  } = data;
  const info = await getUserInfo(from);
  const tax = poke ? Math.ceil(money / 10) + 1100 : Math.ceil(money / 10) + 100;
  await db
    .collection('users')
    .doc(from)
    .update({
      money: info.money - tax,
      berries: info.berries - berries,
    });
  if (poke) {
    await db.collection('users')
      .doc(from)
      .collection('inventory')
      .doc(poke.invId)
      .delete();
  }
  await db
    .collection('users')
    .doc(from)
    .collection('mails')
    .add({
      from: fromMail,
      to: toMail,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      text,
      money,
      berries,
      poke,
    });
  await db
    .collection('users')
    .doc(to)
    .collection('mails')
    .add({
      from: fromMail,
      to: toMail,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      text,
      money,
      berries,
      poke,
      unread: true,
    });
  return 1;
};

loginAdmin();
setInterval(() => {
  updateShop();
}, 60000000);

const server = {
  inventory: {
    getCollectionItemById2,
    getByPage2,
    deleteCollectionItem2,
    patchCollectionItem2,
  },
  getUserInfo,
  patchUserInfo,
  shop: {
    getIDsShop,
    getShopUpdTime,
    getUserIDsShop,
    getPokeByID,
    buyPoke,
  },
  mail: {
    sendMail,
  },
};

export default server;
