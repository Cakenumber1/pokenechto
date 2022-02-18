import axios from 'axios';

export const naturalNumberPattern = /^[1-9]{1}[0-9]{0,}$/;
export const adjacentSlide = (
  pageQuery: number,
  slideIndex: number,
  pagesCount: number,
) => {
  const slideIndexLikePage = slideIndex + 1;
  return (
    (pageQuery === 1 && slideIndexLikePage <= 2)
    || (pageQuery > 1
      && (pageQuery === slideIndexLikePage - 1
        || pageQuery === slideIndexLikePage
        || pageQuery === slideIndexLikePage + 1))
    || (pageQuery === pagesCount && slideIndexLikePage >= pagesCount - 1)
  );
};
// swr
export const getInventoryPagesLengthKey = '/api/inventory';
export const fetchInventoryPagesLength = (url: string) => axios
  .head<number>(url)
  .then((response) => Number(response.headers['x-inventory-pages-length']));

export const getInventoryByPageKey = (page: number) => `/api/inventory/${page}`;
export const fetchInventoryByPage = (url: string) => axios.get<PokemonCollectionItemType[]>(url).then((response) => response.data);

// types
export type PokemonType = {
  id: number;
  name: string;
  cp: number;
  exp: number;
  type: string[];
  abilities: string[];
  sprite: string;
  // stats: stat[]
  weight: number;
  height: number;
  // expType: enum;
};

export type PokemonCollectionItemType = PokemonType & { collectionId: number };

export type PokemonCollectionItemProp = Pick<
PokemonCollectionItemType,
'collectionId' | 'name' | 'id' | 'sprite'
>;
