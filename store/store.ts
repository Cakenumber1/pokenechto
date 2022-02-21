import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { pokemonApi } from 'store/api';
import { walletReducer } from 'store/wallet/walletSlice';

import { shopReducer } from './shop/shopSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    shop: shopReducer,
    wallet: walletReducer,
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
