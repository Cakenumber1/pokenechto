import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from './slices/counterSlice';

import { pokemonApi} from "store/api";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
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
