import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = []

export const cartLists = createSlice({
  name: 'cartLists',
  initialState,

  reducers: {
    setCartList: (state, action: PayloadAction<number>) => {
      console.log('cartListsが発火', state, action)
      return state = action.payload
    },
  },
});

export const { setCartList } = cartLists.actions;

export const selectCartLists = (state: RootState) => state.cartLists

export default cartLists.reducer;
