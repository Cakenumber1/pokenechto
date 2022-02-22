import { CollectionItemType } from 'helpers/inventoryHelpers';
import inventoryData from 'mocks/inventory.json';

const fakeDB = {
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
};

export default fakeDB;
