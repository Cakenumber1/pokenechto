import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inventoryApi } from 'store/service';

import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inventoryApi.middleware),
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
