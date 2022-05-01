import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionItemType } from 'helpers/inventory/inventoryHelpers';
import { PokemonMail, PokemonShop } from 'interfaces/pokemonType';

type GetInventoryByPageResult = {
  count: number,
  results: CollectionItemType[]
};

type IdPokePrice = {
  uid: string,
  poke: PokemonShop,
  price: number,
};

type MailType = {
  from: string,
  fromMail: string,
  to: string,
  toMail: string,
  text: string,
  money?: number,
  berries?: number,
  poke?: PokemonMail,
};

type MailExtType = {
  mailId: string,
  uid: string,
  from: string,
  to: string,
  text: string,
  money?: number,
  berries?: number,
  poke?: PokemonMail,
};

type PatchWallet = {
  uid: string,
  count: number,
};

type CurrencyResponseType = {
  count: number
};

type ShopIDs = {
  pids: string[]
};
type PokeIdAndUid = {
  uid: string,
  pid: string,
};

type Tuple = {
  target: string,
  pid: string
};

type PageAndUid = {
  page: number,
  uid: string
};

export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Inventory', 'Mushrooms', 'Money', 'Shop'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    postInventoryByPage: builder.query<GetInventoryByPageResult, PageAndUid>({
      query: (data) => ({
        url: `/inventory?page=${data!.page}`,
        method: 'POST',
        body: { data },
      }),
      providesTags: (result) => (result
        ? [
          ...result.results.map(({ collectionId: pid }) => ({ type: 'Inventory', pid } as const)),
          { type: 'Inventory', pid: 'LIST' },
        ]
        : [{ type: 'Inventory', pid: 'LIST' }]),
    }),
    postInventoryItem: builder.query<CollectionItemType, PokeIdAndUid>({
      query: ({ uid, pid }) => ({
        url: `/inventory/${pid}`,
        method: 'POST',
        body: { uid, pid },
      }),
      providesTags: (result, error, pid) => [{ type: 'Inventory', pid }],
    }),
    deleteInventoryItem: builder.mutation<CollectionItemType, PokeIdAndUid>({
      query: ({ uid, pid }) => ({
        url: `/inventory/${pid}`,
        method: 'DELETE',
        body: { uid, pid },
      }),
      invalidatesTags: (result, error, pid) => [{ type: 'Inventory', pid }],
    }),
    patchInventoryItem: builder.mutation<CollectionItemType, PokeIdAndUid>({
      query: ({ uid, pid }) => ({
        url: `/inventory/${pid}`,
        method: 'PATCH',
        body: { uid, pid },
      }),
      invalidatesTags: (result, error, pid) => [{ type: 'Inventory', pid }, 'Mushrooms'],
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
    postShopPokemonIDs: builder.query<ShopIDs, string>({
      query: (target) => ({
        url: '/shop/',
        method: 'POST',
        body: { target },
      }),
      providesTags: ['Shop'],
    }),
    postUserShopPokemonIDs: builder.query<ShopIDs, string>({
      query: (uid) => ({
        url: '/shop/personal/',
        method: 'POST',
        body: { uid },
      }),
      providesTags: ['Shop'],
    }),
    postPokemonByID: builder.query<Exclude<PokemonShop, undefined>, Tuple>({
      query: ({ target, pid }) => ({
        url: `/shop/${pid}`,
        method: 'POST',
        body: { target, pid },
      }),
      providesTags: (result, error, pid) => [{ type: 'Shop', pid }],
    }),
    patchSellPokemon: builder.mutation<void, IdPokePrice>({
      query: (data) => ({
        url: `/shop/${data.poke!.pid}`,
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: ['Money', 'Shop', 'Inventory'],
    }),
    patchSendMail: builder.mutation<void, MailType>({
      query: (data) => ({
        url: '/mail/',
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: ['Money', 'Mushrooms', 'Inventory'],
    }),
    patchReceiveMail: builder.mutation<void, MailExtType>({
      query: (data) => ({
        url: `/mail/${data.mailId}`,
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: ['Money', 'Mushrooms', 'Inventory'],
    }),
  }),
});

export const {
  usePostInventoryByPageQuery,
  useDeleteInventoryItemMutation,
  usePatchInventoryItemMutation,
  usePostInventoryItemQuery,
  usePostMushroomsQuery,
  usePatchMushroomsMutation,
  usePostMoneyQuery,
  usePatchMoneyMutation,
  usePostShopPokemonIDsQuery,
  usePostUserShopPokemonIDsQuery,
  usePostPokemonByIDQuery,
  usePatchSellPokemonMutation,
  usePatchSendMailMutation,
  usePatchReceiveMailMutation,
} = appApi;
