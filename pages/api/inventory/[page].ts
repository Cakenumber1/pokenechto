// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {PokemonCollectionItemType} from '../../../components/Inventory/types';

const getSlicesCount = (array: any[], itemsPerSlice: number): number => {
  return Math.ceil(array.length / itemsPerSlice);
};

type FetchInventoryMockApiResult = {
  data: PokemonCollectionItemType[];
  page: number;
  pagesCount: number;
};

export const fetchInventoryMockApi = (page: number): Promise<FetchInventoryMockApiResult> => {
  const pokCollect = Array.from(Array(52)).map((_, index) => {
    return {
      id: index,
      pokemonId: index,
      pokemonImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  const pokemonsPerPage = 12;
  const pagesCount = getSlicesCount(pokCollect, pokemonsPerPage);
  const start = (page - 1) * pokemonsPerPage;
  const end = start + pokemonsPerPage;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: pokCollect.slice(start, end),
        page,
        pagesCount,
      });
    }, 500);
  });
};

type NextApiRequestWithQuery = NextApiRequest & {
  query: {page: string};
};

export default async function handler(
  req: NextApiRequestWithQuery,
  res: NextApiResponse<FetchInventoryMockApiResult>
) {
  const result = await fetchInventoryMockApi(Number(req.query.page));
  res.status(200).json(result);
}
