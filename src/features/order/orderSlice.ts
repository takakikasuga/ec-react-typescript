import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { OrderInfo, AddOrder, FetchOrder } from '../../types/order/order'


const initialState: any = [
  // {
  //   itemCount: 0,
  //   itemId: 0,
  //   itemPrice: 0,
  //   uniqueItemId: ''
  // }
]

export const addOrderAsync = createAsyncThunk('addOrder/addOrderAsync', async (addOrder: any) => {
  console.log('addOrderAsyncが発火します')
  // 注文情報の商品に一意のIDを作成
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(addOrder.userId)
      .collection('orders');
  const ref = ordersRef.doc();
  // addOrderを展開してコピー
  const newAddOreder = { ...addOrder }
  // 商品情報の配列0番目にユニークなIDを付与
  newAddOreder.orderInfo.orderItems[0].uniqueItemId = ref.id;
  // 未購入状態であるstatus = 0を追加
  newAddOreder.orderInfo.status = 0
  console.log('newAddOrederの中身を確認', newAddOreder)
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
  console.log('newAddOreder.orderInfo.orderItemsの中身を確認', newAddOreder.orderInfo.orderItems)
  return newAddOreder.orderInfo.orderItems
});

export const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState,

  reducers: {
    // setUserId: (state) => {

    //   state.value += 1;
    // },
    // setUserName: (state) => {
    //   state.value -= 1;
    // },

    // defaultUserStatus: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(addOrderAsync.fulfilled, (state, action: PayloadAction<Array<FetchOrder>>) => {
      return action.payload
    })
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectAddOrder = (state: RootState) => state.addOrder

export default addOrderSlice.reducer;