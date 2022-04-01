import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionItemType } from 'helpers/inventory/inventoryHelpers';
import { Pokemon } from 'interfaces/pokemonType';

type GetInventoryByPageResult = {
  count: number,
  results: CollectionItemType[]
};

type IDandPrice = {
  id: number,
  price: number,
};

type PatchWallet = {
  uid: string,
  count: number,
};

type CurrencyResponseType = {
  count: number
};

export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Inventory', 'Mushrooms', 'Money', 'Shop'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getInventoryByPage: builder.query<GetInventoryByPageResult, number>({
      query: (page) => `/inventory?page=${page}`,
      providesTags: (result) => (result
        ? [
          ...result.results.map(({ collectionId: id }) => ({ type: 'Inventory', id } as const)),
          { type: 'Inventory', id: 'LIST' },
        ]
        : [{ type: 'Inventory', id: 'LIST' }]),
    }),
    getInventoryItem: builder.query<CollectionItemType, string>({
      query: (collectionId) => `/inventory/${collectionId}`,
      providesTags: (result, error, id) => [{ type: 'Inventory', id }],
    }),
    deleteInventoryItem: builder.mutation<CollectionItemType, string>({
      query: (collectionId) => ({
        url: `/inventory/${collectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Inventory', id }],
    }),
    patchInventoryItem: builder.mutation<CollectionItemType, string>({
      query: (collectionId) => ({
        url: `/inventory/${collectionId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Inventory', id }, 'Mushrooms'],
    }),
    postMushrooms: builder.query<CurrencyResponseType, void>({
      query: (uid) => ({
        url: '/wallet/mushrooms',
        method: 'POST',
        body: { uid },
      }),
      providesTags: ['Mushrooms'],
    }),
    patchMushrooms: builder.mutation<void, PatchWallet>({
      query: ({ uid, count }) => ({
        url: '/wallet/mushrooms/',
        method: 'PATCH',
        body: { uid, count },
      }),
      invalidatesTags: ['Mushrooms'],
    }),
    postMoney: builder.query<CurrencyResponseType, void>({
      query: (uid) => ({
        url: '/wallet/money',
        method: 'POST',
        body: { uid },
      }),
      providesTags: ['Money'],
    }),
    patchMoney: builder.mutation<void, PatchWallet>({
      query: ({ uid, count }) => ({
        url: '/wallet/money/',
        method: 'PATCH',
        body: { uid, count },
      }),
      invalidatesTags: ['Money'],
    }),
    getShopPokemonIDs: builder.query<number[], void>({
      query: () => '/shop/',
      providesTags: ['Shop'],
    }),
    getPokemonByID: builder.query<Exclude<Pokemon, undefined>, number>({
      query: (_id) => `/shop/${_id}`,
      providesTags: (result, error, id) => [{ type: 'Shop', id }],
    }),
    patchSellPokemon: builder.mutation<void, IDandPrice>({
      query: (data) => ({
        url: `/shop/${data.id}`,
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: ['Money', 'Shop', 'Inventory'],
    }),
  }),
});

export const {
  useGetInventoryByPageQuery,
  useDeleteInventoryItemMutation,
  usePatchInventoryItemMutation,
  useGetInventoryItemQuery,
  usePostMushroomsQuery,
  usePatchMushroomsMutation,
  usePostMoneyQuery,
  usePatchMoneyMutation,
  useGetShopPokemonIDsQuery,
  useGetPokemonByIDQuery,
  usePatchSellPokemonMutation,
} = appApi;
