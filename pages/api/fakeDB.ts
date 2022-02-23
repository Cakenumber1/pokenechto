import { CollectionItemType } from 'helpers/inventoryHelpers';
import { Pokemon } from 'interfaces/pokemonType';
import inventoryData from 'mocks/inventory.json';
import shopInitialData from 'mocks/shop.json';

const fakeDB = {
  buyPoke(_id : string, price: number) {
    const slave = this.shop.data.find((poke) => String(poke!.id) === _id);
    if (slave!.amount > 0) {
      slave!.amount -= 1;
      this.money -= price;
      this.inventory.data.push(
        {
          ...slave as Pokemon,
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
  mushrooms: 133,
  money: 1000,
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
