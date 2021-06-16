import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: number = 0

export const itemCount = createSlice({
  name: 'itemCount',
  initialState,

  reducers: {
    setItemCount: (state, action: PayloadAction<number>) => {
      console.log('setItemCountが発火', state, action)
      return state = action.payload
    },
  },
});

export const { setItemCount } = itemCount.actions;

export const selectItemCount = (state: RootState) => state.itemCount

export default itemCount.reducer;
