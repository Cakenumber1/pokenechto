import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionItemType } from 'helpers/inventoryHelpers';

type GetInventoryByPageResult = {
  count: number,
  results: Partial<CollectionItemType>[]
};

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  tagTypes: ['Inventory'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getInventoryByPage: builder.query<GetInventoryByPageResult, number>({
      query: (page) => `/inventory?page=${page}`,
      providesTags: (result) => (result
        ? [
          ...result.results.map(({ collectionId }) => ({ type: 'Inventory' as const, collectionId })),
          { type: 'Inventory', id: 'LIST' },
        ]
        : [{ type: 'Inventory', id: 'LIST' }]),
    }),
    deleteInventoryItem: builder.mutation<CollectionItemType, Partial<CollectionItemType>>({
      query: (body) => {
        return {
          url: '/inventory',
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: [{ type: 'Inventory', id: 'LIST' }],
    }),
  }),
});

export const { useGetInventoryByPageQuery, useDeleteInventoryItemMutation } = inventoryApi;
