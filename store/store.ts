import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { walletReducer } from 'store/wallet/walletSlice';

import { shopReducer } from './shop/shopSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    wallet: walletReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
