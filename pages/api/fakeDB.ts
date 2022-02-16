import { PokemonCollectionItemProp } from '../../helpers/inventoryHelpers';

function generateInventory(length: number): PokemonCollectionItemProp[] {
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
    data: generateInventory(99),
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
    getById(id: number) {
      return this.data.find((element) => element.id === id);
    },
    getByPage(page: number) {
      if (page < 1 || page > this.getPages()) return undefined;
      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
  },
};

export default fakeDB;
