import { CollectionItemType } from 'helpers/inventoryHelpers';

function generateInventory(length: number): Partial<CollectionItemType>[] {
  return Array.from({ length }).map((_, index) => ({
    collectionId: index,
    id: index,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
    name: `Name of Pokemon #${index + 1}`,
  }));
}

const fakeDB = {
  inventory: {
    data: generateInventory(14),
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
    getCollectionItemById(collectionId: number) {
      return this.data.find((element) => element.collectionId === collectionId);
    },
    getByPage(page: number) {
      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
    deleteCollectionItem(collectionId: number) {
      const itemIndex = this.data.findIndex(
        (element) => element.collectionId === collectionId,
      );
      this.data.splice(itemIndex, 1);
    },
  },
};

export default fakeDB;
