import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = []

export const localCartStrageSlice = createSlice({
  name: 'cartLists',
  initialState,

  reducers: {
    setLocalCartStrage: (state, action) => {
      console.log('setLocalCartStrageが発火', state, action)
      state.push(action.payload.orderInfo)
      console.log(current(state))
      return state
    },
  },
});

export const { setLocalCartStrage } = localCartStrageSlice.actions;

export const selectLocalCartStrage = (state: RootState) => state.localCartStrage

export default localCartStrageSlice.reducer;
