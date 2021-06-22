import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { OrderInfo, AddOrder, FetchOrder } from '../../types/order/order'
import { firebaseOrderInfo } from '../../types/order/firebaseOrderInfo'


const initialState: any = []

export const addOrderAsync = createAsyncThunk('addOrder/addOrderAsync', async (addOrder: firebaseOrderInfo) => {
  // addOrderを展開してコピー
  const newAddOreder = { ...addOrder }
  // userIdの型をstring保証する
  if (addOrder.userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(addOrder.userId)
        .collection('orders');
    const ref = ordersRef.doc();
    // 商品情報の配列0番目にユニークなIDを付与
    newAddOreder.orderInfo.orderItems[0].uniqueItemId = ref.id;
    // 未購入状態であるstatus = 0を追加
    // newAddOreder.orderInfo.status = 0
    // 実際に注文情報を追加（新規注文）
    await firebase
      .firestore()
      .collection(`users/${addOrder.userId}/orders`)
      .add(addOrder.orderInfo)
      .then((doc) => {
        console.log(doc.id)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return newAddOreder.orderInfo.orderItems
});

export const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(addOrderAsync.fulfilled, (state, action: PayloadAction<Array<object>>) => {
      return action.payload
    })
  },
});

export const selectAddOrder = (state: RootState) => state.addOrder

export default addOrderSlice.reducer;