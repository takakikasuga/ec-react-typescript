import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = []

export const localCartStrageSlice = createSlice({
  name: 'cartLists',
  initialState,

  reducers: {
    setLocalCartStrage: (state, action) => {
      console.log('setLocalCartStrageが発火', state, action)
      // 既存のstateにpushする形で追加していく
      state.push(action.payload.orderInfo.orderItems)
      console.log(current(state))
      return state
    },
    deleteLocalCartStrage: (state, action) => {
      // インデックス番号を削除する。
      console.log("deleteLocalCartStrageの発火")
      state.splice(action.payload, 1)
      console.log("中身の確認", current(state))
      // 削除を確認したの後に、ローカルストレージの値を更新する
      if (state.length) {
        // stateの配列の中身が存在する場合は上書き
        localStorage.setItem("LOCAL_CART_LISTS", JSON.stringify(state))
        // 全てなくなった場合は、ローカルストレージの中身を全てを削除
      } else {
        localStorage.removeItem("LOCAL_CART_LISTS")
      }

      return state
    },
  },
});

export const { setLocalCartStrage, deleteLocalCartStrage } = localCartStrageSlice.actions;

export const selectLocalCartStrage = (state: RootState) => state.localCartStrage

export default localCartStrageSlice.reducer;
