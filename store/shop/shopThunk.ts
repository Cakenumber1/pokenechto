import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListFromPokeApi } from 'api/';

export const fetchPokemonsThunk = createAsyncThunk(
  'shop/fetchPokemonsThunk',
  async () => {
    const data = await getListFromPokeApi();
    return data;
  },
);
