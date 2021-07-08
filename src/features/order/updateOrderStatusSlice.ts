import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase';
// 型のインポート
import { firebaseOrderInfo } from '../../types/order/firebaseOrderInfo';

// 型を当てはめてもエラーが出る（一旦保留）
const initialState: any = '';

// interface Update {}

interface UpdateStatus {
  statusZeroId: string;
  userId: string;
  update: any;
}

export const updateOrderStatusAsync = createAsyncThunk(
  'updateOrderStatus/updateOrderStatusAsync',
  async (purchase: any) => {
    const { statusZeroId, userId, update } = purchase;

    // 注文情報のstatusの更新
    await firebase
      .firestore()
      .collection(`users/${userId}/orders/`)
      .doc(statusZeroId)
      .update(update)
      .then((res) => {
        console.log(res);
      });
    return purchase;
  }
);

export const updateOrderStatusSlice = createSlice({
  name: 'orderUpdate',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(
      updateOrderStatusAsync.fulfilled,
      (state: any, action: any) => {
        return state;
      }
    );
  },
});

export const selectUpdateOrderStatus = (state: RootState) =>
  state.updateOrderStatus;

export default updateOrderStatusSlice.reducer;
