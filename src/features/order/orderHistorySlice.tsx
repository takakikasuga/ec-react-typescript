import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'
// 型のインポート
import { firebaseOrderInfo } from '../../types/order/firebaseOrderInfo'

// 型を当てはめてもエラーが出る（一旦保留）
const initialState: any = ''

export const orderHistoryAsync = createAsyncThunk('orderHistor/orderHistoryAsync', async (userId: string) => {
  console.log('orderHistoryAsyncが発火します')
  console.log('orderHistoryAsyncの中身を確認', userId)
  let orderHistory: any = []
  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
    console.log('firebase通信手前')
    await ordersRef
      .where('status', '!=', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id)
          let object = doc.data()
          // 注文情報のIDをオブジェクトに持たせる
          object.orderUniqueId = doc.id
          console.log(object)
          orderHistory.push(object)
        });
      });
  }
  console.log(orderHistory)
  return orderHistory
});

export const cancelOrderHistoryAsync = createAsyncThunk('cancelOrderHistory/cancelOrderHistoryAsync', async (cancelStatus: any) => {
  let { userId, uniqueOrderId, copyOrderHistory } = cancelStatus
  let newObject = { uniqueOrderId, copyOrderHistory }
  console.log('cancelOrderHistoryが発火します')
  console.log('cancelOrderHistoryAsyncの中身を確認', cancelStatus)
  console.log(userId, uniqueOrderId, copyOrderHistory)

  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
    console.log('firebase通信手前')
    await ordersRef
      .doc(uniqueOrderId)
      // ステータスをキャンセルのstatus = 9に変更
      .update({
        status: 9
      })
      .then(() => {
        console.log('キャンセルへstatusを変更しました。')
      })
  }

  return newObject
});

export const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,

  reducers: {
    cancelOrderStatus: (state: any, action: any) => {
      console.log('cancelOrderStatusが発火', state, action)

      return state
    },
    // setUserName: (state) => {
    //   state.value -= 1;
    // },

    // defaultUserStatus: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(orderHistoryAsync.fulfilled, (state: any, action: any) => {
      console.log('orderHistoryAsyncのactionとstate', state, action.payload)

      return action.payload
    })
    builder.addCase(cancelOrderHistoryAsync.fulfilled, (state: any, action: any) => {
      console.log('ocancelOrderHistoryAsyncのactionとstate', state, action.payload)
      const { copyOrderHistory, uniqueOrderId } = action.payload
      let changeStatus: any = []
      copyOrderHistory.forEach((element: any) => {
        console.log(element)
        if (uniqueOrderId === element.orderUniqueId) {
          delete element.status
          element.status = 9
        }
        changeStatus.push(element)
      });
      console.log(changeStatus)
      return changeStatus
    })
  },
});

export const { cancelOrderStatus } = orderHistorySlice.actions;


export const selectOrderHistory = (state: RootState) => state.orderHistory

export default orderHistorySlice.reducer;