import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';



const initialState: number = 0

export const itemPrice = createSlice({
  name: 'itemPrice',
  initialState,

  reducers: {
    setItemPrice: (state, action: PayloadAction<number>) => {
      return state = action.payload
    },
  },
});

export const { setItemPrice } = itemPrice.actions;

export const selectItemPrice = (state: RootState) => state.itemPrice

export default itemPrice.reducer;
