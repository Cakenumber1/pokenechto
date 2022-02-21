import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

const InitialState = {
  money: 100,
  mushrooms: 100,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: InitialState,
  reducers: {
    addMoney: (state, action) => {
      state.money = Number(state.money) + Number(action.payload);
      return state;
    },
    addMushrooms: (state, action) => {
      state.mushrooms = Number(state.mushrooms) + Number(action.payload);
      return state;
    },
  },
});

export const { addMoney, addMushrooms } = walletSlice.actions;
const selectSelf = (state : any) => state;
export const selectWallet = createDraftSafeSelector(
  selectSelf,
  (state) => state.wallet,
);
export const { reducer: walletReducer } = walletSlice;
