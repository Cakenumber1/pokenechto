import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionItemType } from 'helpers/inventoryHelpers';

type GetInventoryByPageResult = {
  count: number,
  results: CollectionItemType[]
};

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  tagTypes: ['Inventory', 'Mushrooms'],
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
    getMushrooms: builder.query<any, any>({
      query: () => '/wallet/mushrooms',
      providesTags: ['Mushrooms'],
    }),
    decreaseMushrooms: builder.mutation<any, any>({
      query: ({ count }) => ({
        url: '/wallet/mushrooms',
        method: 'DELETE',
        body: { count },
      }),
      invalidatesTags: ['Mushrooms'],
    }),
  }),
});

export const {
  useGetInventoryByPageQuery,
  useDeleteInventoryItemMutation,
  usePatchInventoryItemMutation,
  useGetInventoryItemQuery,
  useGetMushroomsQuery,
} = inventoryApi;
