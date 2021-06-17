import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'
// 型のインポート
import { OrderUpdate } from '../../types/order/order'


const initialState: any = ''

export const orderUpdateAsync = createAsyncThunk('orderUpdate/orderUpdateAsync', async (addOrder: any) => {
  console.log(addOrder)
  // 注文情報の商品に一意のIDを作成
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(addOrder.userId)
      .collection('orders');
  const ref = ordersRef.doc();
  // 商品情報の配列0番目にユニークなIDを付与
  let newAddOrder = { ...addOrder }
  newAddOrder.orderInfo.orderItems[0].uniqueItemId = ref.id;
  console.log(newAddOrder)
  // 実際に注文情報を追加（追加注文）
  let status0Id: Array<string> = [];
  await ordersRef
    .where('status', '==', 0)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        status0Id.push(doc.id)
        console.log(doc.id)
      });
      console.log(status0Id[0])
      const status0Ref = ordersRef.doc(status0Id[0]);
      status0Ref.update({
        orderItems: firebase.firestore.FieldValue.arrayUnion(
          addOrder.orderInfo.orderItems[0]
        ),
      });
    });
  console.log(addOrder)
  return addOrder.orderInfo.orderItems
});

export const orderUpdateSlice = createSlice({
  name: 'orderUpdate',
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
    console.log('orderUpdate')
    console.log(builder)
    // addOrderAsyncの非同期通信だった時
    builder.addCase(orderUpdateAsync.fulfilled, (state, action: any) => {
      console.log(state)
      console.log(action)
      return action.payload
    })
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectOrderUpdate = (state: RootState) => state.orderUpdate

export default orderUpdateSlice.reducer;