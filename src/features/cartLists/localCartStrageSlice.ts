import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const initialState: any = {
  orderItems: [],
  status: 0
}

export const localCartStrageSlice = createSlice({
  name: 'cartLists',
  initialState,

  reducers: {
    setLocalCartStrage: (state, action) => {
      // 既存のstateにオブジェクトをpushする形で追加していく
      state.orderItems.push(action.payload.orderInfo.orderItems[0])
      // 更新後のstateの情報をローカルストレージに保存する
      localStorage.setItem("LOCAL_CART_LISTS", JSON.stringify(state))
      return state
    },
    deleteLocalCartStrage: (state, action) => {
      // インデックス番号を削除する。
      state.orderItems.splice(action.payload, 1)
      // 削除を確認したの後に、ローカルストレージの値を更新する
      if (state.orderItems.length) {
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
