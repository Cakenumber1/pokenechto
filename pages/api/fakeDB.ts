import { CollectionItemType } from 'helpers/inventory/inventoryHelpers';
import { Pokemon, PokemonIni } from 'interfaces/pokemonType';
import inventoryData from 'mocks/inventory.json';
import shopInitialData from 'mocks/shop.json';
import { auth, db } from 'myFirebase/firebase';

const getData = async (uid: string) => {
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    return res.data();
  }
  return 0;
};

const patchData = async (uid: string, count: number, _key: string) => {
  const key = _key;
  const obj:any = { [key]: count };
  db.collection('users').doc(uid).update(obj);
};

const loginAdmin = async () => {
  await auth.signInWithEmailAndPassword('admin@ss.ss', 'admin@ss.ss');
};

loginAdmin();

const fakeDB = {
  buyPoke(_id : string, price: number) {
    const slave = this.shop.data.find((poke) => String(poke!.id) === _id);
    if (slave!.amount > 0) {
      slave!.amount -= 1;
      // this.money -= price;
      console.log(price);
      this.inventory.data.push(
        {
          ...slave as PokemonIni,
          collectionId: Date.now().toString(16),
        } as CollectionItemType,
      );
    }
  },
  inventory: {
    data: inventoryData as CollectionItemType[],
    itemsPerPage: 12,
    getLength() {
      return this.data.length;
    },
    getPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    getData() {
      return this.data;
    },
    getCollectionItemById(collectionId: string) {
      return this.data.find((element) => element.collectionId === collectionId);
    },
    getByPage(page: number) {
      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
    deleteCollectionItem(collectionId: string) {
      const itemIndex = this.data.findIndex(
        (element) => element.collectionId === collectionId,
      );
      this.data.splice(itemIndex, 1);
    },
  },
  getData,
  patchData,
  shop: {
    data: shopInitialData as Pokemon[],
    getIDs() {
      return this.data.map((poke) => poke!.id);
    },
    getPokeByID(_id: string) {
      return this.data.find((poke) => String(poke!.id) === _id);
    },
  },
};

export default fakeDB;
