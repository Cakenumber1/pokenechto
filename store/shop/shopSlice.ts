import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'interfaces/pokemonType';
import { fetchPokemonsThunk } from 'store/shop/shopThunk';
import type { RootState } from 'store/store';

export const articlesEntityAdapter = createEntityAdapter({
  selectId: (pokemon: Pokemon) => pokemon!.name,
});

export const shopSlice = createSlice({
  name: 'shop',
  initialState: articlesEntityAdapter.getInitialState(),
  reducers: {
    decrement: (state) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsThunk.fulfilled, (state, action) => {
      articlesEntityAdapter.setAll(state, action.payload);
    });
  },
});
export const { decrement } = shopSlice.actions;

export const selectPokemons = (state: RootState) => state.shop;
export const {
  selectIds: pokemonsIDsSelector,
  selectById: pokemonByIDSelector,
} = articlesEntityAdapter.getSelectors((state : RootState) => state.shop);

export const { reducer: shopReducer } = shopSlice;
