import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inventoryApi } from 'store/service';
import { pokemonApi } from 'store/api';
import { walletReducer } from 'store/wallet/walletSlice';

import { shopReducer } from './shop/shopSlice';

export const store = configureStore({
  reducer: {
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    shop: shopReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(inventoryApi.middleware, pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
