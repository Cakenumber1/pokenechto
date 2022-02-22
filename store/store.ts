import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from 'store/api';
import { appApi } from 'store/service';
import { walletReducer } from 'store/wallet/walletSlice';

import { shopReducer } from './shop/shopSlice';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    shop: shopReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    appApi.middleware,
    pokemonApi.middleware,
  ),
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
